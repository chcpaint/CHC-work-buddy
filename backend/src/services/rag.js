// services/rag.js — RAG pipeline: chunking, embedding, retrieval

import { openai, supabase } from '../index.js';
import { logger } from '../utils/logger.js';

const EMBEDDING_MODEL = 'text-embedding-3-small';
const CHUNK_SIZE = 800;     // tokens approx
const CHUNK_OVERLAP = 100;

// ─── Embedding Generation ─────────────────────────────────────

export async function generateEmbedding(text) {
  if (!openai) {
    logger.warn('OpenAI client not initialized — skipping embedding generation');
    return null;
  }
  try {
    const response = await openai.embeddings.create({
      model: EMBEDDING_MODEL,
      input: text.replace(/\n/g, ' ').trim().slice(0, 8000), // Max input
    });
    return response.data[0].embedding;
  } catch (error) {
    logger.error('Embedding generation failed', { error: error.message });
    return null;
  }
}

// ─── Document Chunking ────────────────────────────────────────

export function chunkText(text, chunkSize = CHUNK_SIZE, overlap = CHUNK_OVERLAP) {
  // Split by paragraphs first for semantic coherence
  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
  const chunks = [];
  let currentChunk = '';
  let currentSize = 0;

  for (const paragraph of paragraphs) {
    const words = paragraph.split(/\s+/);
    const paraSize = words.length;

    if (currentSize + paraSize > chunkSize && currentChunk.length > 0) {
      chunks.push(currentChunk.trim());
      // Keep overlap from end of previous chunk
      const overlapWords = currentChunk.split(/\s+/).slice(-overlap);
      currentChunk = overlapWords.join(' ') + ' ' + paragraph;
      currentSize = overlapWords.length + paraSize;
    } else {
      currentChunk += (currentChunk ? '\n\n' : '') + paragraph;
      currentSize += paraSize;
    }
  }

  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }

  return chunks.filter(c => c.length > 50); // Filter tiny chunks
}

// ─── Document Ingestion Pipeline ─────────────────────────────

export async function ingestDocument(documentId, rawText) {
  logger.info('Starting document ingestion', { documentId });

  try {
    // 1. Chunk the document
    const chunks = chunkText(rawText);
    logger.info(`Document chunked: ${chunks.length} chunks`, { documentId });

    // 2. Generate embeddings in batches (avoid rate limits)
    const BATCH_SIZE = 10;
    const chunkRecords = [];

    for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
      const batch = chunks.slice(i, i + BATCH_SIZE);
      
      const embeddings = await Promise.all(
        batch.map(chunk => generateEmbedding(chunk))
      );

      batch.forEach((content, j) => {
        chunkRecords.push({
          document_id: documentId,
          chunk_index: i + j,
          content,
          token_count: content.split(/\s+/).length,
          embedding: embeddings[j],
        });
      });

      // Small delay between batches to respect rate limits
      if (i + BATCH_SIZE < chunks.length) {
        await new Promise(r => setTimeout(r, 200));
      }
    }

    // 3. Insert all chunks
    const { error } = await supabase
      .from('document_chunks')
      .insert(chunkRecords);

    if (error) throw error;

    logger.info('Document ingestion complete', { documentId, chunks: chunks.length });
    return { success: true, chunkCount: chunks.length };

  } catch (error) {
    logger.error('Document ingestion failed', { documentId, error: error.message });
    throw error;
  }
}

// ─── Vector Similarity Search ─────────────────────────────────

export async function matchDocuments(queryEmbedding, options = {}) {
  const {
    tabFilter = null,
    matchCount = 8,
    threshold = 0.40,
  } = options;

  try {
    const { data, error } = await supabase.rpc('match_documents', {
      query_embedding: queryEmbedding,
      match_threshold: threshold,
      match_count: matchCount,
      tab_filter: tabFilter,
    });

    if (error) throw error;
    return data || [];

  } catch (error) {
    logger.error('Vector search failed', { error: error.message });
    return [];
  }
}

// ─── Hybrid Search (vector + keyword) ────────────────────────

export async function hybridSearch(query, options = {}) {
  const { tabFilter, limit = 10 } = options;

  // Run both searches in parallel
  const [embedding, keywordData] = await Promise.all([
    generateEmbedding(query),
    supabase.rpc('search_documents', {
      search_query: query,
      tab_filter: tabFilter || null,
      result_limit: limit,
    }),
  ]);

  const vectorResults = await matchDocuments(embedding, { tabFilter, matchCount: limit });

  // Merge and deduplicate, preferring vector results
  const seen = new Set();
  const combined = [];

  for (const r of vectorResults) {
    if (!seen.has(r.document_id)) {
      seen.add(r.document_id);
      combined.push({ ...r, source: 'vector' });
    }
  }

  for (const r of (keywordData.data || [])) {
    if (!seen.has(r.id)) {
      seen.add(r.id);
      combined.push({ ...r, document_id: r.id, source: 'keyword' });
    }
  }

  return combined.slice(0, limit);
}
