-- ═══════════════════════════════════════════════════════════════
-- PPG Envirobase EC5515/EC5517 Matte & Semi-Gloss Clear System
-- Source: EHPEC551XFY/EA sales flyer (PPG Industries, 5/21)
-- Run in Supabase SQL Editor
-- ═══════════════════════════════════════════════════════════════

INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata) VALUES (
  'PPG EC5515/EC5517 Low VOC Matte & Semi-Gloss Clear System',
  'PPG Envirobase EC5515 (matte) and EC5517 (semi-gloss) 2K acrylic urethane clearcoat system for OE low gloss finishes on Mercedes-Benz, BMW, Fiat, Lamborghini. Includes mix ratios, 5 gloss level formulas (FC01-FC05), application guide, and drying times.',
  'tech_sheet',
  'painting',
  ARRAY['ppg', 'envirobase', 'EC5515', 'EC5517', 'matte clear', 'semi-gloss clear', 'low VOC', '2K acrylic urethane', 'ECH5075', 'DT1855', 'Mercedes-Benz', 'BMW', 'Fiat', 'Lamborghini', 'clearcoat', 'FC01', 'FC02', 'FC03', 'FC04', 'FC05', 'flat', 'eggshell', 'satin'],
  '{"full_content": "PPG EC5515/EC5517 — Low VOC Matte Clear and Semi-Gloss Clear System (Envirobase High Performance)\n\nTwo premium-quality 2K acrylic urethane clears, this 2.1 low-VOC clearcoat system reproduces a range of gloss levels. Ideal for specialized refinish repairs on OE low gloss finishes on Mercedes-Benz, BMW, Fiat, and Lamborghini vehicles. Designed for use over Envirobase High Performance basecoat. The Matte and Semi-Gloss Clearcoats can be used alone or mixed together to precisely reproduce the OE finish.\n\nPRODUCTION FRIENDLY:\n• Suitable for all North American markets\n• Simple 3:1:1 mix ratio (Clearcoat : Hardener : Reducer)\n• Uses ECH5075 hardener and DT1855 reducer\n• No flexibilizer required for plastic substrates\n• Pot life: 1-2 hours at 70°F/21°C\n\nAPPLICATION EASE:\n• Versatile for small and large jobs\n• Excellent, consistent flow horizontally or vertically\n\nAPPEARANCE:\n• Smooth after bake\n• Exceptional durability\n• Formulas for 5 gloss levels\n\nGLOSS LEVEL MIXING GUIDE:\n• FC01 Flat (10% gloss) — 100% EC5515 / 0% EC5517 — Lamborghini full body matte finish\n• FC02 Matte (10.1-20% gloss) — 65% EC5515 / 35% EC5517\n• FC03 Eggshell (20.1-30% gloss) — 40% EC5515 / 60% EC5517 — Mercedes-Benz, Smart, BMW, Fiat full body matte finishes\n• FC04 Satin (30.1-45% gloss) — 25% EC5515 / 75% EC5517\n• FC05 Semi-Gloss (45.1-60% gloss) — 0% EC5515 / 100% EC5517 — Older Mercedes-Benz lower body cladding\n\nAPPLICATION:\n• Apply 2 full coats, followed by 1 lighter cross coat (1/2) on large or flat panels\n• De-nibbing between coats possible with 800/1000 grit sandpaper\n• HVLP: 10 PSI at the cap\n• Compliant: 29-40 PSI at the gun\n\nDRYING:\n• Between coats: 15-30 minutes (flash completely until matte is even all over)\n• Dust free: 30-45 minutes\n• Before baking: Purge 15-30 minutes to ensure completely matte\n• Force dry: 40 minutes at 140°F/60°C\n\nRefer to EB-551 Product Information Sheet for further details.\n\nSource: PPG Industries — ppgrefinish.com (Part No. EHPEC551XFY/EA, 5/21)"}'::jsonb
);

-- Chunk 1: Product overview and gloss levels
INSERT INTO public.document_chunks (document_id, chunk_index, content, metadata)
SELECT id, 0,
  'PPG EC5515 EC5517 Low VOC Matte and Semi-Gloss Clear System: Two 2K acrylic urethane clears, 2.1 low-VOC clearcoat for OE low gloss finishes on Mercedes-Benz BMW Fiat Lamborghini. Mix ratio 3:1:1 clearcoat to ECH5075 hardener to DT1855 reducer. Pot life 1-2 hours at 70°F. No flexibilizer required for plastic. Gloss levels: FC01 Flat 10% gloss = 100% EC5515, FC02 Matte 10-20% = 65% EC5515 35% EC5517, FC03 Eggshell 20-30% = 40% EC5515 60% EC5517 for Mercedes BMW Fiat, FC04 Satin 30-45% = 25% EC5515 75% EC5517, FC05 Semi-Gloss 45-60% = 100% EC5517 for older Mercedes lower body cladding.',
  '{"source": "PPG EC5515/EC5517 Sales Flyer", "type": "tech_sheet", "category": "clearcoat"}'::jsonb
FROM public.documents WHERE title = 'PPG EC5515/EC5517 Low VOC Matte & Semi-Gloss Clear System';

-- Chunk 2: Application and drying
INSERT INTO public.document_chunks (document_id, chunk_index, content, metadata)
SELECT id, 1,
  'EC5515 EC5517 application guide: Apply 2 full coats followed by 1 lighter cross coat on large or flat panels. De-nibbing between coats with 800/1000 grit sandpaper. HVLP 10 PSI at cap, compliant 29-40 PSI at gun. Drying between coats 15-30 minutes flash completely until matte even all over. Dust free 30-45 minutes. Before baking purge 15-30 minutes to ensure completely matte. Force dry 40 minutes at 140°F 60°C. Always create test panel before spraying vehicle to verify color match and gloss level.',
  '{"source": "PPG EC5515/EC5517 Sales Flyer", "type": "tech_sheet", "category": "application"}'::jsonb
FROM public.documents WHERE title = 'PPG EC5515/EC5517 Low VOC Matte & Semi-Gloss Clear System';


-- ═══════════════════════════════════════════════════════════════
-- VERIFY
-- ═══════════════════════════════════════════════════════════════
SELECT 'EC5515/5517 document: ' || COUNT(*) FROM public.documents WHERE title LIKE '%EC5515%';
SELECT 'EC5515/5517 chunks: ' || COUNT(*) FROM public.document_chunks dc JOIN public.documents d ON dc.document_id = d.id WHERE d.title LIKE '%EC5515%';
