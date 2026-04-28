# Database — CHC Work Buddy

This folder contains the Supabase schema, migrations, and seed data for Body Shop Wiz. All files are plain SQL and run via the Supabase SQL Editor (or `psql` against the Supabase connection string).

## Run order

Run these in order, one file at a time, against your CHC Supabase project. Skip the optional content seeds if you only want the empty app shell.

### 1. Mandatory schema

| Step | File | What it does |
|------|------|--------------|
| 1 | `schema.sql` | Tables, RLS, vector index, search functions. **Idempotent? No** — run on a fresh project only. |
| 2 | `migrations/002_media_search.sql` | Adds full-text + tag search to `media_items` |
| 3 | `migrations/003_learning_schema.sql` | Adds Learning tab tables (guides, quizzes) |
| 4 | `migrations/004_query_logs.sql` | Adds knowledge-gap reporting table |
| 5 | `migrations/004_update_su4902_to_su470lv.sql` | One-off product code rename **(see naming note below)** |

### 2. Optional content seeds — pick what you want

These all `INSERT` rows; safe to run multiple times only if you've cleared the relevant tables first.

| File | What it adds |
|------|--------------|
| `seed-knowledge-base.sql` | Generic shop SOPs |
| `seed-content.sql` | Documents and media row records (no actual files) |
| `seed-content.js` | Same as above, runnable from Node — **needs `SUPABASE_URL` + `SUPABASE_SERVICE_KEY` env vars** |
| `seed-ppg-brands.sql` | PPG product brand catalog |
| `seed-ppg-painting-sop.sql` | PPG painting SOPs |
| `seed-ppg-sops.sql` | PPG general SOPs |
| `seed-ppg-tricoat-process.sql` | Tricoat application process |
| `seed-ppg-reducer-guide.sql` | Reducer selection guide |
| `seed-ppg-magicmix.sql` | MagicMix mixing system |
| `seed-ppg-moonwalk.sql` | Moonwalk colour matching |
| `seed-ppg-linq-color.sql` | LINQ colour system |
| `seed-ppg-digimatch.sql` | DigiMatch tools |
| `seed-ppg-ehp-key-features.sql` | EHP product features |
| `seed-ppg-ec5515-5517.sql` | EC5515 / EC5517 clearcoat data |
| `seed-ppg-visualizid.sql` | VisualizID system |
| `seed-ppg-docs-batch2.sql` | Second batch of PPG docs |
| `seed-sem-products.sql` | SEM (PPG-owned) product line |
| `seed-ppg-quizzes.sql` | PPG-specific quizzes |
| `seed-quizzes-round2.sql` | Additional quizzes |
| `seed-learning.sql` | Troubleshooting guides for Learning tab |

### 3. Storage buckets

After SQL is loaded, in the Supabase dashboard create two storage buckets:

| Bucket | Visibility | Purpose |
|--------|-----------|---------|
| `bodyshop-docs` | **Private** (recommended) — see security note | PDFs, DOCX, SDS sheets |
| `bodyshop-media` | **Private** (recommended) | Videos, slideshows, training images |

> **Security note:** the original README said "public" — for the CHC intranet rollout we recommend **private** buckets so storage URLs aren't permanently leakable. The code already auth-gates the listing endpoints; we just haven't wired signed-URL generation yet. Public buckets work today; flip to private as a follow-up. (See review doc, item H1.)

### 4. Embeddings backfill

After loading documents, you need to generate vector embeddings for RAG to work. Two options:

**Option A — admin route (recommended once the maintenance auth fix is deployed):**
```bash
curl -X POST https://chc-work-buddy-production.up.railway.app/api/maintenance/generate-embeddings \
  -H "Authorization: Bearer <admin_jwt>"
```
Repeat until the response says `processed: 0` (it processes 500 chunks per call).

**Option B — admin panel:**
The admin panel has a "Generate embeddings" action (or will after this rollout).

## Naming gotcha

Two files share the prefix `004_`:

- `004_query_logs.sql`
- `004_update_su4902_to_su470lv.sql`

Tools that sort migrations alphabetically may run them in either order. The first **must** run before the second is logically meaningful. Consider renaming to `005_` after a successful deploy to lock the order in.

## Common operations

**Reset query logs** (for testing the knowledge-gap report):
```sql
TRUNCATE public.query_logs;
```

**See document distribution by tab:**
```sql
SELECT tab_slug, COUNT(*) FROM public.documents WHERE is_active = true GROUP BY tab_slug ORDER BY 2 DESC;
```

**Find chunks missing embeddings:**
```sql
SELECT COUNT(*) FROM public.document_chunks WHERE embedding IS NULL;
```

**Deactivate a user without deleting their data:**
```sql
UPDATE public.profiles SET is_active = false WHERE email = 'someone@chcpaint.ca';
```
