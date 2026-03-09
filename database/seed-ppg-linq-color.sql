-- ═══════════════════════════════════════════════════════════════
-- PPG LINQ Color — Cloud-Based Digital Color Software
-- Run in Supabase SQL Editor
-- ═══════════════════════════════════════════════════════════════

INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata) VALUES (
  'PPG Linq Color — Cloud-Based Digital Color Software',
  'PPG Linq Color cloud-based digital color software for identifying the right color for repairs. Enables mixing through connected and wireless dispensing solutions including PPG MagicBox. Compatible with existing PCs, spectrophotometers, and scales. No installation or training required.',
  'tech_sheet',
  'painting',
  ARRAY['ppg', 'Linq', 'Linq Color', 'cloud', 'color software', 'MagicBox', 'spectrophotometer', 'scales', 'wireless', 'color matching', 'digital', 'formula', 'mobile', 'tablet', 'mixing room'],
  '{"full_content": "PPG Linq Color — Confidence in Color Selection\n\nColor search anytime, anywhere.\n\nThe cloud-based digital color software delivers unprecedented improvements during the entire process of identifying the right color for a repair. It enables mixing through a variety of connected and wireless dispensing solutions, including PPG MagicBox — a small but powerful device that connects to scales, communicates environmental conditions in mixing rooms, and receives formulas direct from PPG Linq Color.\n\nFEATURES:\n• Existing PCs and PPG spectrophotometers and scales are compatible\n• No installation required\n• Rapid search response with cloud computing and PPG''s proprietary algorithm\n• No training required with PPG''s new user interface\n• Communicate with spectrophotometers wirelessly and send formulas to scales via PPG MagicBox without a PC\n• Accessible from any connected device and optimized for mobile and tablet\n• Technical issues resolved by experienced remote helpdesk\n\nBENEFITS:\n• Immediate results — Find your color match anytime, anywhere from any internet-capable device as an optimized cloud-based solution\n• Time savings — Rapid search response powered by cloud computing and PPG''s proprietary algorithm\n• Direct wireless connectivity — Clear up space in mixing room. Communicate with spectrophotometers wirelessly and connect to scales without PC via PPG MagicBox, which links directly to scales and receives formulas from PPG Linq Color\n• Live information — Live update and backup system provides latest information. No manual software updates needed, new PPG formulas available right away. Save data, customer formulas, and information to the cloud\n\nSource: PPG Industries — ppgrefinish.com"}'::jsonb
);

INSERT INTO public.document_chunks (document_id, chunk_index, content, metadata)
SELECT id, 0,
  'PPG Linq Color cloud-based digital color software for identifying right color for repairs. Enables mixing through connected and wireless dispensing solutions including PPG MagicBox which connects to scales communicates environmental conditions and receives formulas. Compatible with existing PCs spectrophotometers and scales. No installation or training required. Rapid search response with cloud computing and PPG proprietary algorithm. Communicate with spectrophotometers wirelessly, send formulas to scales via MagicBox without PC. Accessible from any connected device optimized for mobile and tablet. Benefits: immediate color match results from any internet device, time savings with rapid cloud search, direct wireless connectivity clears mixing room space, live update backup system with latest formulas available right away, save customer data to cloud.',
  '{"source": "PPG Linq Color", "type": "tech_sheet", "category": "digital tools"}'::jsonb
FROM public.documents WHERE title = 'PPG Linq Color — Cloud-Based Digital Color Software';

-- VERIFY
SELECT 'Linq Color document: ' || COUNT(*) FROM public.documents WHERE title LIKE '%Linq Color%';
SELECT 'Linq Color chunks: ' || COUNT(*) FROM public.document_chunks dc JOIN public.documents d ON dc.document_id = d.id WHERE d.title LIKE '%Linq Color%';
