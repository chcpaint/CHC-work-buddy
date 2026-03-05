// services/autotag.js — AI-powered auto-tagging for documents and media
//
// When a document or media item is uploaded, this service analyzes the content
// and generates relevant tags, a suggested tab/category, and a description
// if one wasn't provided.

import { anthropic } from '../index.js';
import { logger } from '../utils/logger.js';

const VALID_TABS = [
  'admin-intake', 'disassemble', 'prep',
  'body-work', 'primer-paint', 'detailing', 'hand-back',
];

const VALID_DOC_TYPES = ['sds', 'tech_sheet', 'manual', 'procedure', 'checklist', 'other'];

/**
 * Auto-tag a document based on its extracted text content.
 * Returns { tags, suggestedTab, suggestedDocType, description }
 */
export async function autoTagDocument(text, existingMetadata = {}) {
  if (!anthropic) {
    logger.warn('Anthropic client not available — skipping auto-tag');
    return null;
  }

  try {
    // Use first ~3000 chars for analysis (enough for context, not too expensive)
    const sample = text.slice(0, 3000);

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 300,
      system: `You are a tagging assistant for an automotive body shop knowledge base. Analyze the document text and return a JSON object with:
- "tags": array of 5-10 lowercase keyword tags relevant to body shop work (e.g., "paint mixing", "sds", "ppe", "bondo", "clear coat", "sanding", "primer")
- "suggestedTab": one of: admin-intake, disassemble, prep, body-work, primer-paint, detailing, hand-back (pick the most relevant workflow stage)
- "suggestedDocType": one of: sds, tech_sheet, manual, procedure, checklist, other
- "description": a 1-2 sentence description of the document if not already provided

Return ONLY valid JSON, no markdown or explanation.`,
      messages: [
        {
          role: 'user',
          content: `Analyze this body shop document and generate tags:\n\nTitle: ${existingMetadata.title || 'Unknown'}\nExisting type: ${existingMetadata.docType || 'not specified'}\n\nContent:\n${sample}`,
        },
      ],
    });

    const raw = response.content[0]?.text || '';
    // Extract JSON from response (handle potential markdown wrapping)
    const jsonStr = raw.replace(/```json?\n?/g, '').replace(/```/g, '').trim();
    const result = JSON.parse(jsonStr);

    // Validate and sanitize
    return {
      tags: Array.isArray(result.tags)
        ? result.tags.map(t => String(t).toLowerCase().trim()).filter(Boolean).slice(0, 15)
        : [],
      suggestedTab: VALID_TABS.includes(result.suggestedTab) ? result.suggestedTab : null,
      suggestedDocType: VALID_DOC_TYPES.includes(result.suggestedDocType) ? result.suggestedDocType : null,
      description: typeof result.description === 'string' ? result.description.slice(0, 500) : null,
    };
  } catch (err) {
    logger.error('Auto-tag failed', { error: err.message });
    return null;
  }
}

/**
 * Auto-tag media (video/slideshow) based on title, description, and transcript.
 * Returns { tags, keywords, suggestedTab }
 */
export async function autoTagMedia(metadata = {}) {
  if (!anthropic) {
    logger.warn('Anthropic client not available — skipping media auto-tag');
    return null;
  }

  try {
    const context = [
      metadata.title && `Title: ${metadata.title}`,
      metadata.description && `Description: ${metadata.description}`,
      metadata.transcript && `Transcript excerpt: ${metadata.transcript.slice(0, 2000)}`,
    ].filter(Boolean).join('\n');

    if (!context) return null;

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 200,
      system: `You are a tagging assistant for an automotive body shop video/media library. Analyze the media metadata and return a JSON object with:
- "tags": array of 5-8 lowercase tags for browsing/filtering (e.g., "spray technique", "clear coat", "ppe")
- "keywords": array of 3-5 specific technical keywords for search (e.g., "2k clear", "hvlp gun", "wet sanding")
- "suggestedTab": one of: admin-intake, disassemble, prep, body-work, primer-paint, detailing, hand-back

Return ONLY valid JSON.`,
      messages: [
        {
          role: 'user',
          content: `Analyze this body shop media item:\n\n${context}`,
        },
      ],
    });

    const raw = response.content[0]?.text || '';
    const jsonStr = raw.replace(/```json?\n?/g, '').replace(/```/g, '').trim();
    const result = JSON.parse(jsonStr);

    return {
      tags: Array.isArray(result.tags)
        ? result.tags.map(t => String(t).toLowerCase().trim()).filter(Boolean).slice(0, 10)
        : [],
      keywords: Array.isArray(result.keywords)
        ? result.keywords.map(k => String(k).toLowerCase().trim()).filter(Boolean).slice(0, 8)
        : [],
      suggestedTab: VALID_TABS.includes(result.suggestedTab) ? result.suggestedTab : null,
    };
  } catch (err) {
    logger.error('Media auto-tag failed', { error: err.message });
    return null;
  }
}
