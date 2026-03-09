-- ═══════════════════════════════════════════════════════════════
-- PPG Envirobase High Performance — Standard Operating Procedures
-- Source: PPG Refinish SOP boards (ca.ppgrefinish.com)
-- Tagged as: PPG SOP | procedure
-- Run in Supabase SQL Editor
-- ═══════════════════════════════════════════════════════════════

-- ─── SOP 1: Raw Plastics (Advanced Plastic Bond Method) ──────
INSERT INTO public.documents (title, description, doc_type, tab_slug, keywords, full_content) VALUES (
  'PPG SOP: Raw Plastics — Advanced Plastic Bond Method',
  'PPG Envirobase procedure for preparing and coating raw (unprimed) plastic parts using SU4901 Clean & Scuff Pad, SU4902 Plastic Adhesion Prep, and SU4903/SUA4903 Advanced Plastic Bond.',
  'procedure',
  'painting',
  ARRAY['ppg', 'sop', 'raw plastics', 'plastic', 'adhesion promoter', 'SU4901', 'SU4902', 'SU4903', 'SUA4903', 'envirobase', 'scuff pad', 'plastic adhesion prep', 'advanced plastic bond'],
  'PPG SOP: Raw Plastics — Advanced Plastic Bond Method (Envirobase High Performance)

IMPORTANT: Sand the plastic part with fine sand paper to identify if it is primed or unprimed (raw). Do not apply adhesion promoters to pre-primed plastic.

Step 1: Clean and Scuff Pad (SU4901)
• Scrub and clean the substrate thoroughly using the scuff pad side of the sponge.
• Rinse with water.
• Blow dry and wipe with a clean cloth.
• Entire surface must be de-glossed.

Step 2: Plastic Adhesion Prep (SU4902)
• Apply a light even coat over the entire area, wiping in one direction to minimize product overlap.
• Allow 3-5 minutes flash time.

Step 3: Advanced Plastic Bond (SU4903 or SUA4903)
• Apply a light coat of Advanced Plastic Bond.
• Allow 5 minutes dry time (until completely flashed).
• Apply flexed ECS A-chromatic sealer with correct G-shade for top coat colour.
• Apply top coat.

Source: PPG Envirobase High Performance — ca.ppgrefinish.com'
);

-- Insert document chunks for vector search
INSERT INTO public.document_chunks (document_id, chunk_index, content, metadata)
SELECT id, 0,
  'PPG SOP Raw Plastics Advanced Plastic Bond Method: Sand plastic to identify if primed or unprimed. Do not apply adhesion promoters to pre-primed plastic. Step 1: Clean and Scuff Pad SU4901 - scrub and clean substrate using scuff pad side, rinse with water, blow dry, wipe with clean cloth, entire surface must be de-glossed. Step 2: Plastic Adhesion Prep SU4902 - apply light even coat over entire area wiping in one direction, allow 3-5 minutes flash time. Step 3: Advanced Plastic Bond SU4903 or SUA4903 - apply light coat, allow 5 minutes dry time until completely flashed, apply flexed ECS A-chromatic sealer with correct G-shade for top coat colour, apply top coat.',
  '{"source": "PPG Envirobase", "type": "procedure", "category": "raw plastics"}'::jsonb
FROM public.documents WHERE title = 'PPG SOP: Raw Plastics — Advanced Plastic Bond Method';


-- ─── SOP 2: Raw Plastics (Adhesion Promoter SU470LV Method) ─
INSERT INTO public.documents (title, description, doc_type, tab_slug, keywords, full_content) VALUES (
  'PPG SOP: Raw Plastics — Adhesion Promoter Method',
  'PPG Envirobase procedure for preparing raw plastic parts using SU4901 Clean & Scuff Pad and SU470LV Adhesion Promoter with SWX350 waterborne cleaner.',
  'procedure',
  'painting',
  ARRAY['ppg', 'sop', 'raw plastics', 'plastic', 'adhesion promoter', 'SU4901', 'SU470LV', 'SWX350', 'envirobase', 'waterborne cleaner'],
  'PPG SOP: Raw Plastics — Adhesion Promoter Method (Envirobase High Performance)

IMPORTANT: Sand the plastic part with fine sand paper to identify if it is primed or unprimed (raw). Do not apply adhesion promoters to pre-primed plastic.

Step 1: Clean and Scuff Pad (SU4901)
• Scrub and clean the substrate thoroughly using the scuff pad side of the sponge.
• Rinse with water.
• Blow dry and wipe with a clean cloth.
• Entire surface must be de-glossed.
• Wash with SWX350 (waterborne cleaner).

Step 2: Adhesion Promoter (SU470LV)
• Apply a light wet coat of SU470LV adhesion promoter.
• Allow 5 minutes dry time (until completely flashed).
• Apply flexed ECS A-chromatic sealer with correct G-shade for top coat colour.
• Apply top coat.

Source: PPG Envirobase High Performance — ca.ppgrefinish.com'
);

INSERT INTO public.document_chunks (document_id, chunk_index, content, metadata)
SELECT id, 0,
  'PPG SOP Raw Plastics Adhesion Promoter Method: Sand plastic to identify if primed or raw. Do not apply adhesion promoters to pre-primed plastic. Step 1: Clean and Scuff Pad SU4901 - scrub and clean substrate with scuff pad, rinse with water, blow dry, wipe clean cloth, de-gloss entire surface, wash with SWX350 waterborne cleaner. Step 2: Adhesion Promoter SU470LV - apply light wet coat of SU470LV, allow 5 minutes dry time until flashed, apply flexed ECS A-chromatic sealer with correct G-shade, apply top coat.',
  '{"source": "PPG Envirobase", "type": "procedure", "category": "raw plastics"}'::jsonb
FROM public.documents WHERE title = 'PPG SOP: Raw Plastics — Adhesion Promoter Method';


-- ─── SOP 3: Plastic Preparation (Pre-Primed Parts) ──────────
INSERT INTO public.documents (title, description, doc_type, tab_slug, keywords, full_content) VALUES (
  'PPG SOP: Plastic Preparation — Pre-Primed Parts',
  'PPG Envirobase procedure for preparing pre-primed plastic parts for painting including washing, sanding with P400-P600, and sealer application.',
  'procedure',
  'painting',
  ARRAY['ppg', 'sop', 'plastic preparation', 'pre-primed', 'plastic parts', 'P400', 'P600', 'sealer', 'envirobase', 'waterborne cleaner', 'scuff pad'],
  'PPG SOP: Plastic Preparation — Pre-Primed Plastic Parts (Envirobase High Performance)

IMPORTANT: Sand the plastic part with fine sand paper to identify if it is primed or unprimed (raw). Do not apply adhesion promoters to pre-primed plastic.

Step 1: Wash the repair area with soap and water and then clean with appropriate waterborne cleaner.

Step 2: Sand pre-primed plastic with P400-P600 dry sandpaper by machine or by hand. Use grey scuff pad on edges.

Step 3: Re-clean with appropriate waterborne cleaner.

Step 4: Apply sealer with correct G-shade.

Step 5: Apply topcoat.

Source: PPG Envirobase High Performance — ca.ppgrefinish.com'
);

INSERT INTO public.document_chunks (document_id, chunk_index, content, metadata)
SELECT id, 0,
  'PPG SOP Plastic Preparation Pre-Primed Parts: Sand plastic with fine paper to identify if primed. Do not apply adhesion promoters to pre-primed plastic. Step 1: wash repair area with soap and water, clean with waterborne cleaner. Step 2: sand pre-primed plastic P400-P600 dry sandpaper by machine or hand, use grey scuff pad on edges. Step 3: re-clean with waterborne cleaner. Step 4: apply sealer with correct G-shade. Step 5: apply topcoat.',
  '{"source": "PPG Envirobase", "type": "procedure", "category": "plastic preparation"}'::jsonb
FROM public.documents WHERE title = 'PPG SOP: Plastic Preparation — Pre-Primed Parts';


-- ─── SOP 4: Panel Preparation ────────────────────────────────
INSERT INTO public.documents (title, description, doc_type, tab_slug, keywords, full_content) VALUES (
  'PPG SOP: Panel Preparation',
  'PPG Envirobase 7-step panel preparation procedure including washing, wax and grease removal, sanding progression from P400 to P1000, scuffing, and final cleaning.',
  'procedure',
  'painting',
  ARRAY['ppg', 'sop', 'panel preparation', 'panel prep', 'wax and grease remover', 'P400', 'P600', 'P800', 'P1000', 'scuff pad', 'interface pad', 'envirobase', 'de-gloss', 'blend panels'],
  'PPG SOP: Panel Preparation (Envirobase High Performance)

Step 1: Wash with soap and water.

Step 2: Clean using recommended Wax and Grease Remover.

Step 3: Sand using P400 on primed repairs and factory finishes that WILL be sealed.

Step 4: Sand using P600-P800 on primed repairs and factory finishes that will NOT be sealed.

Step 5: Scuff using a gold or light grey scuff pad. Scuff all edges, body lines and hard-to-reach areas prior to sanding blend panels.

Step 6: Machine sand using interface pad and P800-P1000 to de-gloss panel thoroughly.

Step 7: Final clean using appropriate pre-cleaner and wipe off thoroughly with lint free cloth.

Source: PPG Envirobase High Performance — ca.ppgrefinish.com'
);

INSERT INTO public.document_chunks (document_id, chunk_index, content, metadata)
SELECT id, 0,
  'PPG SOP Panel Preparation 7 steps: Step 1: wash with soap and water. Step 2: clean with Wax and Grease Remover. Step 3: sand P400 on primed repairs and factory finishes that will be sealed. Step 4: sand P600-P800 on primed repairs and factory finishes not being sealed. Step 5: scuff using gold or light grey scuff pad on all edges body lines and hard-to-reach areas prior to sanding blend panels. Step 6: machine sand using interface pad and P800-P1000 to de-gloss panel thoroughly. Step 7: final clean with pre-cleaner and wipe with lint free cloth.',
  '{"source": "PPG Envirobase", "type": "procedure", "category": "panel preparation"}'::jsonb
FROM public.documents WHERE title = 'PPG SOP: Panel Preparation';


-- ─── SOP 5: Primer Surfacer Sanding ──────────────────────────
INSERT INTO public.documents (title, description, doc_type, tab_slug, keywords, full_content) VALUES (
  'PPG SOP: Primer Surfacer Sanding',
  'PPG Envirobase 6-step primer surfacer sanding procedure using guide coat technique with P320, P400, and P600 grit progression.',
  'procedure',
  'painting',
  ARRAY['ppg', 'sop', 'primer surfacer', 'sanding', 'guide coat', 'P320', 'P400', 'P600', 'interface pad', 'sanding block', 'envirobase', 'etch primer', 'wet-on-wet sealer'],
  'PPG SOP: Primer Surfacer Sanding (Envirobase High Performance)

Step 1: Make sure all parts to be painted are present and that repairs are understood.

Step 2: Apply guide coat to primed area for final sanding.

Step 3: Sand guide coated area using P320 and a flat sanding block.

Step 4: Apply guide coat, machine sand using interface pad and P400.

Step 5: Machine sand using interface pad and P600, if sealer is NOT to be used.

NOTE: If bare metal, body filler or guide coat remains, reapply etch primer and primer surfacer as needed.

Step 6: Clean the area with appropriate pre-cleaner before wet-on-wet sealer application. Dry thoroughly.

Source: PPG Envirobase High Performance — ca.ppgrefinish.com'
);

INSERT INTO public.document_chunks (document_id, chunk_index, content, metadata)
SELECT id, 0,
  'PPG SOP Primer Surfacer Sanding 6 steps: Step 1: ensure all parts present and repairs understood. Step 2: apply guide coat to primed area for final sanding. Step 3: sand guide coated area using P320 and flat sanding block. Step 4: apply guide coat, machine sand using interface pad and P400. Step 5: machine sand using interface pad and P600 if sealer is not to be used. Note: if bare metal body filler or guide coat remains, reapply etch primer and primer surfacer as needed. Step 6: clean area with pre-cleaner before wet-on-wet sealer application, dry thoroughly.',
  '{"source": "PPG Envirobase", "type": "procedure", "category": "primer sanding"}'::jsonb
FROM public.documents WHERE title = 'PPG SOP: Primer Surfacer Sanding';


-- ─── SOP 6: Etch Primer and Primer Surfacer Application ──────
INSERT INTO public.documents (title, description, doc_type, tab_slug, keywords, full_content) VALUES (
  'PPG SOP: Etch Primer and Primer Surfacer Application',
  'PPG Envirobase procedure for applying etch primer over bare metal and primer surfacer using the reverse priming method (lightest coat first, heaviest coat last).',
  'procedure',
  'painting',
  ARRAY['ppg', 'sop', 'etch primer', 'primer surfacer', 'reverse priming', 'bare metal', 'G-shade', 'high solids primer', 'envirobase', 'flash time'],
  'PPG SOP: Etch Primer and Primer Surfacer Application (Envirobase High Performance)

PREPARATION PROCEDURE — Etch Primer:
Step 1: Apply 2 medium coats of etch primer over bare metal areas. Let flash for 15 minutes before primer surfacer application.

APPLICATION PROCEDURE — Primer Surfacer:
Step 1: Apply high solids primer. Use correct G-shade and mix as a surfacer for optimal performance.

Step 2: When applying, first coat should be the lightest and last coat the heaviest. Use reverse priming method:
• 1st Coat — Lightest
• 2nd Coat — Medium
• 3rd Coat — Heaviest

Source: PPG Envirobase High Performance — ca.ppgrefinish.com'
);

INSERT INTO public.document_chunks (document_id, chunk_index, content, metadata)
SELECT id, 0,
  'PPG SOP Etch Primer and Primer Surfacer Application: Etch Primer preparation - apply 2 medium coats of etch primer over bare metal areas, let flash 15 minutes before primer surfacer application. Primer Surfacer application - apply high solids primer, use correct G-shade and mix as surfacer for optimal performance. Reverse priming method: first coat lightest, second coat medium, third coat heaviest. 1st coat lightest, 2nd coat medium, 3rd coat heaviest.',
  '{"source": "PPG Envirobase", "type": "procedure", "category": "primer application"}'::jsonb
FROM public.documents WHERE title = 'PPG SOP: Etch Primer and Primer Surfacer Application';


-- ─── SOP 7: Body Filler and Primer Preparation ───────────────
INSERT INTO public.documents (title, description, doc_type, tab_slug, keywords, full_content) VALUES (
  'PPG SOP: Body Filler and Primer Preparation',
  'PPG Envirobase 6-step procedure for body filler application and primer preparation including filler shaping, guide coat, putty, and back sanding.',
  'procedure',
  'painting',
  ARRAY['ppg', 'sop', 'body filler', 'primer preparation', 'P80', 'P120', 'P180', 'P240', 'P320', 'P400', 'guide coat', 'putty', 'polyester putty', 'feather edge', 'envirobase', 'wax and grease remover'],
  'PPG SOP: Body Filler and Primer Preparation (Envirobase High Performance)

Step 1: Wash the repair area with soap and water and then clean with Wax and Grease Remover.

Step 2: Sand low spots and hard-to-reach areas with P80, feather edge repair with P180 and apply body filler over bare metal.

Step 3: Sand using appropriately sized sanding block and rough shape body filler using P80-120. Using guide coat, final sand body filler using P180.

Step 4: Inspect for pin holes and undesired scratches from paint edge to paint edge and reapply filler as needed. Application of body filler or polyester putty may be needed.

Step 5: Block sand putty using P240. Check feathered area and re-sand if required.

Step 6: Back sand 6" to 8" away from the edge of the repair using P320 on a DA with an interface pad or P400 by hand.

Source: PPG Envirobase High Performance — ca.ppgrefinish.com'
);

INSERT INTO public.document_chunks (document_id, chunk_index, content, metadata)
SELECT id, 0,
  'PPG SOP Body Filler and Primer Preparation 6 steps: Step 1: wash repair area with soap and water, clean with Wax and Grease Remover. Step 2: sand low spots and hard-to-reach areas P80, feather edge repair P180, apply body filler over bare metal. Step 3: sand with sanding block rough shape body filler P80-120, use guide coat, final sand body filler P180. Step 4: inspect for pin holes and undesired scratches from paint edge to paint edge, reapply filler as needed, body filler or polyester putty may be needed. Step 5: block sand putty P240, check feathered area and re-sand if required. Step 6: back sand 6 to 8 inches from edge of repair using P320 on DA with interface pad or P400 by hand.',
  '{"source": "PPG Envirobase", "type": "procedure", "category": "body filler"}'::jsonb
FROM public.documents WHERE title = 'PPG SOP: Body Filler and Primer Preparation';


-- ─── SOP 8: Waterborne Tri-Coat Repair — Standard Blending ──
INSERT INTO public.documents (title, description, doc_type, tab_slug, keywords, full_content) VALUES (
  'PPG SOP: Waterborne Tri-Coat Repair — Standard Colour Blending',
  'PPG Envirobase tri-coat repair process showing standard repair with colour blending vs zone/section refinishing. Covers clearcoat, mid-coat, transition, and ground coat layers.',
  'procedure',
  'painting',
  ARRAY['ppg', 'sop', 'tri-coat', 'three stage', 'colour blending', 'color blending', 'zone refinishing', 'section refinishing', 'clearcoat', 'mid-coat', 'ground coat', 'transition layer', 'envirobase', 'waterborne'],
  'PPG SOP: Waterborne Tri-Coat Repair Process — Standard Repair with Colour Blending (Envirobase High Performance)

STANDARD REPAIR WITH COLOUR BLENDING:
Layer structure (from top to bottom):
• Clearcoat
• Mid-Coat Layer
• Transition Layer
• Ground Coat Layer
• Repaired Area

The colour blend transitions across adjacent panels using the mid-coat and transition layers.

"ZONE" OR SECTION REFINISHING (No colour blending):
• Apply colour to the entire "ZONE" and then clearcoat all panels to panel edge.
• Use the next body line or breakpoint as the boundary.

WHEN TO USE ZONE REFINISHING:
"Zone" or Section Refinishing is considered when existing finish varies in blotchiness and/or opaqueness in multiple panels on a vehicle. Depending on the vehicle/repair area, body lines, fenders, mouldings, etc. may be used to "disguise" or "hide" the colour blend rather than a typical/traditional colour blend in the middle of a panel.

Source: PPG Envirobase High Performance — ca.ppgrefinish.com'
);

INSERT INTO public.document_chunks (document_id, chunk_index, content, metadata)
SELECT id, 0,
  'PPG SOP Waterborne Tri-Coat Repair Standard Colour Blending: Standard repair layers from top - clearcoat, mid-coat layer, transition layer, ground coat layer, repaired area. Colour blend transitions across adjacent panels using mid-coat and transition layers. Zone or Section Refinishing with no colour blending: apply colour to entire zone then clearcoat all panels to panel edge, use next body line or breakpoint as boundary. Use zone refinishing when existing finish varies in blotchiness and opaqueness in multiple panels, body lines fenders mouldings can disguise or hide the colour blend.',
  '{"source": "PPG Envirobase", "type": "procedure", "category": "tri-coat repair"}'::jsonb
FROM public.documents WHERE title = 'PPG SOP: Waterborne Tri-Coat Repair — Standard Colour Blending';


-- ─── SOP 9: Waterborne Tri-Coat Repair — Flowchart ──────────
INSERT INTO public.documents (title, description, doc_type, tab_slug, keywords, full_content) VALUES (
  'PPG SOP: Waterborne Tri-Coat Repair — Process Flowchart',
  'PPG Envirobase detailed tri-coat repair process flowchart covering gray shade undercoat, groundcoat, blending decision, transition layers, mid-coat, and clearcoat application.',
  'procedure',
  'painting',
  ARRAY['ppg', 'sop', 'tri-coat', 'three stage', 'flowchart', 'process', 'blending', 'transition layer', 'effect coat', 'mid-coat', 'groundcoat', 'gray shade', 'RTS', 'envirobase', 'waterborne', 'let-down tool'],
  'PPG SOP: Waterborne Tri-Coat Repair Process — Flowchart (Envirobase High Performance)

PROCESS FLOW:

1. Gray Shade Undercoat Layer

2. Groundcoat Layer (Coverage Coats + Control Coat if required)

3. DECISION: Blending?

IF YES (Blending):
• Use 1 Part RTS Groundcoat Colour
• Apply 1 "Transition Layer" (to be applied as an "Effect Coat")
• Tack off "Blend Areas" BEFORE proceeding to the next step

OPTIONAL: If a 2nd "Transition Layer" is needed to step the blend out further:
• Create/mix 1 part RTS Transition Colour (created above) to 1 part RTS Mid-Coat Colour
• Apply 2nd "Transition Layer" (to be applied as an "Effect Coat")
• Tack off "Blend Areas" BEFORE proceeding to the next step

IF NO (Not Blending):
• Use 1 Part RTS Mid-Coat Colour

4. Mid-Coat (Effects Coat + Control Coat if required)

5. Clearcoat

Source: PPG Envirobase High Performance — ca.ppgrefinish.com
Scan QR code to view "Building a Let-Down Tool" Process.'
);

INSERT INTO public.document_chunks (document_id, chunk_index, content, metadata)
SELECT id, 0,
  'PPG SOP Waterborne Tri-Coat Repair Process Flowchart: Step 1 gray shade undercoat layer. Step 2 groundcoat layer with coverage coats plus control coat if required. Step 3 blending decision. If blending YES: use 1 part RTS groundcoat colour, apply 1 transition layer as effect coat, tack off blend areas before next step. Optional 2nd transition layer: mix 1 part RTS transition colour to 1 part RTS mid-coat colour, apply 2nd transition layer as effect coat, tack off blend areas. If NOT blending: use 1 part RTS mid-coat colour. Step 4 mid-coat effects coat plus control coat if required. Step 5 clearcoat.',
  '{"source": "PPG Envirobase", "type": "procedure", "category": "tri-coat repair"}'::jsonb
FROM public.documents WHERE title = 'PPG SOP: Waterborne Tri-Coat Repair — Process Flowchart';


-- ─── SOP 10: EPW115 Waterborne Primer Application ────────────
INSERT INTO public.documents (title, description, doc_type, tab_slug, keywords, full_content) VALUES (
  'PPG SOP: EPW115 Waterborne Primer Application',
  'PPG Envirobase 5-step procedure for EPW115 waterborne primer application including mixing ratio, wet coat application, air drying, sanding, and infrared curing guidelines.',
  'procedure',
  'painting',
  ARRAY['ppg', 'sop', 'EPW115', 'waterborne primer', 'T494', 'primer application', 'bare metal', 'infrared', 'air drying', 'envirobase', 'sanding'],
  'PPG SOP: EPW115 Waterborne Primer Application (Envirobase High Performance)

Step 1: Shake waterborne primer thoroughly prior to mixing (10% T494).

Step 2: Apply 3 to 5 wet coats (may be applied directly over bare metal areas).

Step 3: Blow dry using air drying equipment for approximately 3 to 5 minutes between coats or until uniformly dull.

Step 4: Sand after 30 minutes at 21°C / 70°F metal temperature. Follow standard sanding procedures.

Step 5: Infrared can be used once flashed. Do not exceed 38°C / 100°F metal temperature.

Source: PPG Envirobase High Performance — ca.ppgrefinish.com
Scan QR code to view the Product Data Sheet for EPW115 Waterborne Primer.'
);

INSERT INTO public.document_chunks (document_id, chunk_index, content, metadata)
SELECT id, 0,
  'PPG SOP EPW115 Waterborne Primer Application 5 steps: Step 1: shake waterborne primer thoroughly prior to mixing with 10% T494. Step 2: apply 3 to 5 wet coats, may be applied directly over bare metal areas. Step 3: blow dry using air drying equipment 3 to 5 minutes between coats or until uniformly dull. Step 4: sand after 30 minutes at 21°C 70°F metal temperature, follow standard sanding procedures. Step 5: infrared can be used once flashed, do not exceed 38°C 100°F metal temperature.',
  '{"source": "PPG Envirobase", "type": "procedure", "category": "primer application"}'::jsonb
FROM public.documents WHERE title = 'PPG SOP: EPW115 Waterborne Primer Application';


-- ═══════════════════════════════════════════════════════════════
-- VERIFY
-- ═══════════════════════════════════════════════════════════════
SELECT 'PPG SOPs inserted: ' || COUNT(*) FROM public.documents WHERE title LIKE 'PPG SOP:%';
SELECT 'PPG SOP chunks inserted: ' || COUNT(*) FROM public.document_chunks dc JOIN public.documents d ON dc.document_id = d.id WHERE d.title LIKE 'PPG SOP:%';
