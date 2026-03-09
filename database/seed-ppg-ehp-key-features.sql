-- ═══════════════════════════════════════════════════════════════
-- PPG Envirobase High Performance — Key Features Document
-- Source: 251002_EHP_Key_Features_V2.pdf (PPG Industries, 2020)
-- Run in Supabase SQL Editor
-- ═══════════════════════════════════════════════════════════════

-- ─── Document: EHP Key Features ────────────────────────────────
INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata) VALUES (
  'PPG Envirobase High Performance — Key Features',
  'Overview of key features that make PPG Envirobase High Performance North America''s number one waterborne refinish system. Covers the toner system, color database, chromatic variant chip deck, application features, blend process, repairability, cycle time performance, and service/support.',
  'tech_sheet',
  'painting',
  ARRAY['ppg', 'envirobase', 'waterborne', 'key features', 'toner system', 'color database', 'variant deck', 'blend process', 'repairability', 'cycle time', 'latex technology', 'VOC', 'anti-settle', 'spectral grey sealer', 'de-nib', 'EC520', 'ECH8075', 'T400', 'T412'],
  '{"full_content": "PPG Envirobase High Performance — Key Features of the Leading Waterborne Refinish System\n\nMore collision centers use the Envirobase High Performance system in National Rule regions than in all compliance-regulated areas within the US and Canada combined. Color-matching accuracy, ease of use, and cycle time performance are the top reasons for choosing one waterborne system over another.\n\nTHE TONER SYSTEM:\nThe system is comprised of more than 90 toners including the latest translucent pigments best for matching the newest, highly chromatic factory colors. Toners incorporate anti-settle technology, requiring only a shake-n-pour — no mechanical mixing machine needed. This eliminates mismatches due to improper agitation. PPG uses true latex technology, while competitors may use polyurethane water dilutable or one-component polyurethane based systems.\n\nCOLOR DATABASE:\nPPG''s global color database contains more than 3.5 million formulas including a vast number of variants. The database is updated daily via the internet.\n\nCHROMATIC VARIANT CHIP DECK:\nComprised of approximately 6,000 OEM prime and variant color chips, all arranged chromatically. Chips are sprayed with actual waterborne paint for what-you-see-is-what-you-get accuracy. Wheel, trim, and engine bay color decks also available.\n\nAPPLICATION FEATURES:\nBasecoat achieves accurate match in 2-3 coats with a final control coat. Just 2-3 minutes flash time between coats with proper air flow. Greater opacity of finely dispersed pigments allows hiding in thinner films with excellent metallic orientation. Spectral grey sealer system assists in matching highly translucent colors. Uses traditional application techniques — easy transition from solvent-based systems.\n\nBLEND PROCESS:\nEnvirobase uses a simple 1-gun-cup process: apply 2-3 wet coats, flash 2-4 minutes between coats with air dryer, apply two control coats at lighter pressure for metallic orientation, flash 10-15 minutes then ready for clearcoat. Competitors often require complex reverse blending with 3 separate gun cups.\n\nREPAIRABILITY:\nDirt specks during basecoat application can be de-nibbed on the fly with 800-1200 grit paper. Other waterborne systems may require starting over because their basecoats can peel due to higher film build. Since there is no solvent in the waterborne basecoat, it will not burn back into the thin-feathered edge, allowing smooth transitions when repairing defects.\n\nCYCLE TIME PERFORMANCE:\nTrue cycle performance should evaluate the entire process from sealer to final clearcoat. Aided by an accelerated sealer and fast clears that bake in as little as 15 minutes, a paint technician can complete a spot repair in about an hour.\n\nSERVICE AND SUPPORT:\nPPG offers knowledgeable sales force, expert technical support, extensive training resources, and the industry-leading MVP Business Solutions program.\n\nSource: PPG Industries, Inc. — ppgrefinish.com"}'::jsonb
);

-- Chunk 1: Toner system and color tools
INSERT INTO public.document_chunks (document_id, chunk_index, content, metadata)
SELECT id, 0,
  'PPG Envirobase High Performance Key Features: North America number one waterborne refinish system. Toner system has more than 90 toners with latest translucent pigments for chromatic factory colors. Anti-settle technology means shake-n-pour only, no mechanical mixing machine needed, eliminates mismatches from improper agitation. PPG uses true latex technology. Global color database has more than 3.5 million formulas updated daily via internet. Chromatic variant chip deck has approximately 6000 OEM prime and variant color chips arranged chromatically, sprayed with actual waterborne paint for accurate color matching. Wheel trim and engine bay decks also available.',
  '{"source": "PPG Envirobase EHP Key Features", "type": "tech_sheet", "category": "product knowledge"}'::jsonb
FROM public.documents WHERE title = 'PPG Envirobase High Performance — Key Features';

-- Chunk 2: Application, blending, repairability, cycle time
INSERT INTO public.document_chunks (document_id, chunk_index, content, metadata)
SELECT id, 1,
  'Envirobase application features: basecoat achieves accurate match in 2-3 coats with final control coat, 2-3 minutes flash time between coats with proper air flow. Finely dispersed pigments allow hiding in thinner films with excellent metallic orientation. Spectral grey sealer for translucent colors. Simple 1-gun-cup blend process versus competitor 3-cup reverse blending. Repairability: de-nib dirt specks on the fly with 800-1200 grit paper, no need to start over. No solvent in waterborne basecoat so it will not burn back into thin-feathered edge. Cycle time: accelerated sealer and fast clears bake in as little as 15 minutes, spot repair completed in about an hour. PPG service includes MVP Business Solutions program.',
  '{"source": "PPG Envirobase EHP Key Features", "type": "tech_sheet", "category": "application"}'::jsonb
FROM public.documents WHERE title = 'PPG Envirobase High Performance — Key Features';


-- ═══════════════════════════════════════════════════════════════
-- QUIZ: Envirobase Key Features & Product Knowledge
-- ═══════════════════════════════════════════════════════════════

INSERT INTO public.quizzes (title_en, title_fr, title_es, description_en, description_fr, description_es, slug, quiz_type, passing_score, is_active)
VALUES (
  'Envirobase Key Features',
  'Caractéristiques clés Envirobase',
  'Características clave Envirobase',
  'Test your knowledge of the PPG Envirobase High Performance system — toner technology, color tools, application features, blending, repairability, and cycle time.',
  'Testez vos connaissances du système PPG Envirobase High Performance.',
  'Evalúa tu conocimiento del sistema PPG Envirobase High Performance.',
  'envirobase-key-features',
  'product-knowledge',
  70,
  true
);

-- Q1: How many toners in the Envirobase system?
INSERT INTO public.quiz_questions (quiz_id, question_text_en, question_text_fr, question_text_es, question_type, explanation_en, explanation_fr, explanation_es, question_order)
SELECT id,
  'How many toners does the Envirobase High Performance system include?',
  'Combien de colorants le système Envirobase High Performance comprend-il?',
  '¿Cuántos colorantes incluye el sistema Envirobase High Performance?',
  'multiple-choice',
  'The Envirobase High Performance system is comprised of more than 90 toners including the latest translucent pigments.',
  'Le système comprend plus de 90 colorants.',
  'El sistema incluye más de 90 colorantes.',
  1
FROM public.quizzes WHERE slug = 'envirobase-key-features';

INSERT INTO public.quiz_answers (question_id, answer_text_en, answer_text_fr, answer_text_es, is_correct, answer_order)
SELECT id, 'More than 90', 'Plus de 90', 'Más de 90', true, 1 FROM public.quiz_questions WHERE question_text_en = 'How many toners does the Envirobase High Performance system include?'
UNION ALL
SELECT id, 'About 50', 'Environ 50', 'Alrededor de 50', false, 2 FROM public.quiz_questions WHERE question_text_en = 'How many toners does the Envirobase High Performance system include?'
UNION ALL
SELECT id, 'More than 200', 'Plus de 200', 'Más de 200', false, 3 FROM public.quiz_questions WHERE question_text_en = 'How many toners does the Envirobase High Performance system include?'
UNION ALL
SELECT id, 'Exactly 75', 'Exactement 75', 'Exactamente 75', false, 4 FROM public.quiz_questions WHERE question_text_en = 'How many toners does the Envirobase High Performance system include?';

-- Q2: What technology eliminates the need for mechanical mixing?
INSERT INTO public.quiz_questions (quiz_id, question_text_en, question_text_fr, question_text_es, question_type, explanation_en, explanation_fr, explanation_es, question_order)
SELECT id,
  'What technology in Envirobase toners eliminates the need for a mechanical mixing machine?',
  'Quelle technologie dans les colorants Envirobase élimine le besoin d''une machine de mélange mécanique?',
  '¿Qué tecnología en los colorantes Envirobase elimina la necesidad de una máquina de mezcla mecánica?',
  'multiple-choice',
  'The toners incorporate anti-settle technology, requiring only a "shake ''n pour" — no mechanical mixing machine needed.',
  'Les colorants intègrent une technologie anti-sédimentation.',
  'Los colorantes incorporan tecnología anti-sedimentación.',
  2
FROM public.quizzes WHERE slug = 'envirobase-key-features';

INSERT INTO public.quiz_answers (question_id, answer_text_en, answer_text_fr, answer_text_es, is_correct, answer_order)
SELECT id, 'Anti-settle technology', 'Technologie anti-sédimentation', 'Tecnología anti-sedimentación', true, 1 FROM public.quiz_questions WHERE question_text_en = 'What technology in Envirobase toners eliminates the need for a mechanical mixing machine?'
UNION ALL
SELECT id, 'Magnetic stirring beads', 'Billes d''agitation magnétiques', 'Perlas de agitación magnéticas', false, 2 FROM public.quiz_questions WHERE question_text_en = 'What technology in Envirobase toners eliminates the need for a mechanical mixing machine?'
UNION ALL
SELECT id, 'Ultrasonic blending', 'Mélange ultrasonique', 'Mezcla ultrasónica', false, 3 FROM public.quiz_questions WHERE question_text_en = 'What technology in Envirobase toners eliminates the need for a mechanical mixing machine?'
UNION ALL
SELECT id, 'Pre-mixed cartridges', 'Cartouches pré-mélangées', 'Cartuchos premezclados', false, 4 FROM public.quiz_questions WHERE question_text_en = 'What technology in Envirobase toners eliminates the need for a mechanical mixing machine?';

-- Q3: How many formulas in the PPG color database?
INSERT INTO public.quiz_questions (quiz_id, question_text_en, question_text_fr, question_text_es, question_type, explanation_en, explanation_fr, explanation_es, question_order)
SELECT id,
  'Approximately how many formulas are in PPG''s global color database?',
  'Combien de formules environ contient la base de données couleur mondiale de PPG?',
  '¿Aproximadamente cuántas fórmulas hay en la base de datos global de color de PPG?',
  'multiple-choice',
  'PPG''s global color database is comprised of more than 3.5 million formulas including a vast number of variants, updated daily.',
  'La base de données contient plus de 3,5 millions de formules.',
  'La base de datos contiene más de 3.5 millones de fórmulas.',
  3
FROM public.quizzes WHERE slug = 'envirobase-key-features';

INSERT INTO public.quiz_answers (question_id, answer_text_en, answer_text_fr, answer_text_es, is_correct, answer_order)
SELECT id, 'More than 3.5 million', 'Plus de 3,5 millions', 'Más de 3.5 millones', true, 1 FROM public.quiz_questions WHERE question_text_en = 'Approximately how many formulas are in PPG''s global color database?'
UNION ALL
SELECT id, 'About 500,000', 'Environ 500 000', 'Alrededor de 500,000', false, 2 FROM public.quiz_questions WHERE question_text_en = 'Approximately how many formulas are in PPG''s global color database?'
UNION ALL
SELECT id, 'About 1 million', 'Environ 1 million', 'Alrededor de 1 millón', false, 3 FROM public.quiz_questions WHERE question_text_en = 'Approximately how many formulas are in PPG''s global color database?'
UNION ALL
SELECT id, 'More than 10 million', 'Plus de 10 millions', 'Más de 10 millones', false, 4 FROM public.quiz_questions WHERE question_text_en = 'Approximately how many formulas are in PPG''s global color database?';

-- Q4: How many coats to achieve accurate match?
INSERT INTO public.quiz_questions (quiz_id, question_text_en, question_text_fr, question_text_es, question_type, explanation_en, explanation_fr, explanation_es, question_order)
SELECT id,
  'How many coats does Envirobase basecoat typically require to achieve an accurate color match?',
  'Combien de couches la base Envirobase nécessite-t-elle généralement pour obtenir une correspondance de couleur précise?',
  '¿Cuántas capas de base Envirobase se necesitan típicamente para una igualación de color precisa?',
  'multiple-choice',
  'Envirobase basecoat achieves an accurate match in 2-3 coats with a final control coat, with just 2-3 minutes flash time between coats.',
  'La base Envirobase obtient une correspondance en 2-3 couches avec une couche de contrôle finale.',
  'La base Envirobase logra una igualación en 2-3 capas con una capa de control final.',
  4
FROM public.quizzes WHERE slug = 'envirobase-key-features';

INSERT INTO public.quiz_answers (question_id, answer_text_en, answer_text_fr, answer_text_es, is_correct, answer_order)
SELECT id, '2-3 coats plus a control coat', '2-3 couches plus une couche de contrôle', '2-3 capas más una capa de control', true, 1 FROM public.quiz_questions WHERE question_text_en = 'How many coats does Envirobase basecoat typically require to achieve an accurate color match?'
UNION ALL
SELECT id, '1 coat only', '1 couche seulement', '1 capa solamente', false, 2 FROM public.quiz_questions WHERE question_text_en = 'How many coats does Envirobase basecoat typically require to achieve an accurate color match?'
UNION ALL
SELECT id, '5-6 coats', '5-6 couches', '5-6 capas', false, 3 FROM public.quiz_questions WHERE question_text_en = 'How many coats does Envirobase basecoat typically require to achieve an accurate color match?'
UNION ALL
SELECT id, '4 coats with no control coat', '4 couches sans couche de contrôle', '4 capas sin capa de control', false, 4 FROM public.quiz_questions WHERE question_text_en = 'How many coats does Envirobase basecoat typically require to achieve an accurate color match?';

-- Q5: How to de-nib dirt specks during basecoat?
INSERT INTO public.quiz_questions (quiz_id, question_text_en, question_text_fr, question_text_es, question_type, explanation_en, explanation_fr, explanation_es, question_order)
SELECT id,
  'How can you fix dirt specks that appear during Envirobase basecoat application?',
  'Comment corriger les impuretés qui apparaissent pendant l''application de la base Envirobase?',
  '¿Cómo se corrigen las impurezas que aparecen durante la aplicación de la base Envirobase?',
  'multiple-choice',
  'Simply de-nib them on the fly by sanding with 800-1200 grit paper. This repairability feature is unique to Envirobase — other waterborne systems may require starting over.',
  'Simplement les poncer avec du papier grain 800-1200.',
  'Simplemente lijarlos con papel de grano 800-1200.',
  5
FROM public.quizzes WHERE slug = 'envirobase-key-features';

INSERT INTO public.quiz_answers (question_id, answer_text_en, answer_text_fr, answer_text_es, is_correct, answer_order)
SELECT id, 'De-nib on the fly with 800-1200 grit paper', 'Poncer avec du papier grain 800-1200', 'Lijar con papel de grano 800-1200', true, 1 FROM public.quiz_questions WHERE question_text_en = 'How can you fix dirt specks that appear during Envirobase basecoat application?'
UNION ALL
SELECT id, 'Strip the entire panel and start over', 'Décaper tout le panneau et recommencer', 'Decapar todo el panel y empezar de nuevo', false, 2 FROM public.quiz_questions WHERE question_text_en = 'How can you fix dirt specks that appear during Envirobase basecoat application?'
UNION ALL
SELECT id, 'Apply more basecoat to cover them', 'Appliquer plus de base pour les couvrir', 'Aplicar más base para cubrirlos', false, 3 FROM public.quiz_questions WHERE question_text_en = 'How can you fix dirt specks that appear during Envirobase basecoat application?'
UNION ALL
SELECT id, 'Wait overnight and buff them out', 'Attendre toute la nuit et les polir', 'Esperar toda la noche y pulirlos', false, 4 FROM public.quiz_questions WHERE question_text_en = 'How can you fix dirt specks that appear during Envirobase basecoat application?';

-- Q6: How many gun cups for Envirobase blend process?
INSERT INTO public.quiz_questions (quiz_id, question_text_en, question_text_fr, question_text_es, question_type, explanation_en, explanation_fr, explanation_es, question_order)
SELECT id,
  'How many gun cups does the Envirobase blend process require compared to competitor "reverse blending"?',
  'Combien de godets le processus de dégradé Envirobase nécessite-t-il comparé au dégradé inversé concurrent?',
  '¿Cuántas copas de pistola requiere el proceso de degradado Envirobase comparado con el degradado inverso de la competencia?',
  'multiple-choice',
  'Envirobase uses a simple 1-gun-cup blend process, while competitors often require 3 separate gun cups for reverse blending.',
  'Envirobase utilise un processus simple à 1 godet.',
  'Envirobase usa un proceso simple de 1 copa.',
  6
FROM public.quizzes WHERE slug = 'envirobase-key-features';

INSERT INTO public.quiz_answers (question_id, answer_text_en, answer_text_fr, answer_text_es, is_correct, answer_order)
SELECT id, '1 cup for Envirobase vs 3 cups for competitors', '1 godet Envirobase vs 3 godets concurrents', '1 copa Envirobase vs 3 copas competidores', true, 1 FROM public.quiz_questions WHERE question_text_en = 'How many gun cups does the Envirobase blend process require compared to competitor "reverse blending"?'
UNION ALL
SELECT id, '2 cups for both systems', '2 godets pour les deux systèmes', '2 copas para ambos sistemas', false, 2 FROM public.quiz_questions WHERE question_text_en = 'How many gun cups does the Envirobase blend process require compared to competitor "reverse blending"?'
UNION ALL
SELECT id, '3 cups for Envirobase vs 1 for competitors', '3 godets Envirobase vs 1 concurrent', '3 copas Envirobase vs 1 competidor', false, 3 FROM public.quiz_questions WHERE question_text_en = 'How many gun cups does the Envirobase blend process require compared to competitor "reverse blending"?'
UNION ALL
SELECT id, '4 cups for both systems', '4 godets pour les deux systèmes', '4 copas para ambos sistemas', false, 4 FROM public.quiz_questions WHERE question_text_en = 'How many gun cups does the Envirobase blend process require compared to competitor "reverse blending"?';

-- Q7: How fast can a spot repair be completed?
INSERT INTO public.quiz_questions (quiz_id, question_text_en, question_text_fr, question_text_es, question_type, explanation_en, explanation_fr, explanation_es, question_order)
SELECT id,
  'With the Envirobase system''s accelerated sealer and fast clears, approximately how long does a spot repair take?',
  'Avec le scellant accéléré et les vernis rapides Envirobase, combien de temps prend une réparation ponctuelle?',
  '¿Con el sellador acelerado y barnices rápidos Envirobase, cuánto tiempo toma una reparación puntual?',
  'multiple-choice',
  'Aided by an accelerated sealer and fast clears that bake in as little as 15 minutes, a spot repair can be completed in about an hour.',
  'Environ une heure grâce au scellant accéléré et aux vernis rapides.',
  'Aproximadamente una hora gracias al sellador acelerado y barnices rápidos.',
  7
FROM public.quizzes WHERE slug = 'envirobase-key-features';

INSERT INTO public.quiz_answers (question_id, answer_text_en, answer_text_fr, answer_text_es, is_correct, answer_order)
SELECT id, 'About 1 hour', 'Environ 1 heure', 'Aproximadamente 1 hora', true, 1 FROM public.quiz_questions WHERE question_text_en = 'With the Envirobase system''s accelerated sealer and fast clears, approximately how long does a spot repair take?'
UNION ALL
SELECT id, 'About 3-4 hours', 'Environ 3-4 heures', 'Aproximadamente 3-4 horas', false, 2 FROM public.quiz_questions WHERE question_text_en = 'With the Envirobase system''s accelerated sealer and fast clears, approximately how long does a spot repair take?'
UNION ALL
SELECT id, '15 minutes', '15 minutes', '15 minutos', false, 3 FROM public.quiz_questions WHERE question_text_en = 'With the Envirobase system''s accelerated sealer and fast clears, approximately how long does a spot repair take?'
UNION ALL
SELECT id, 'Overnight cure required', 'Séchage toute la nuit requis', 'Se requiere curado durante la noche', false, 4 FROM public.quiz_questions WHERE question_text_en = 'With the Envirobase system''s accelerated sealer and fast clears, approximately how long does a spot repair take?';

-- Q8: What sealer system helps match translucent colors?
INSERT INTO public.quiz_questions (quiz_id, question_text_en, question_text_fr, question_text_es, question_type, explanation_en, explanation_fr, explanation_es, question_order)
SELECT id,
  'What type of sealer system does Envirobase use to assist in matching highly translucent colors?',
  'Quel type de système de scellant Envirobase utilise-t-il pour les couleurs très translucides?',
  '¿Qué tipo de sistema de sellador usa Envirobase para igualar colores altamente translúcidos?',
  'multiple-choice',
  'A spectral grey sealer system assists in matching highly translucent colors by providing the correct undertone base.',
  'Un système de scellant gris spectral aide à correspondre aux couleurs translucides.',
  'Un sistema de sellador gris espectral ayuda a igualar colores translúcidos.',
  8
FROM public.quizzes WHERE slug = 'envirobase-key-features';

INSERT INTO public.quiz_answers (question_id, answer_text_en, answer_text_fr, answer_text_es, is_correct, answer_order)
SELECT id, 'Spectral grey sealer system', 'Système de scellant gris spectral', 'Sistema de sellador gris espectral', true, 1 FROM public.quiz_questions WHERE question_text_en = 'What type of sealer system does Envirobase use to assist in matching highly translucent colors?'
UNION ALL
SELECT id, 'White primer only', 'Apprêt blanc uniquement', 'Solo imprimador blanco', false, 2 FROM public.quiz_questions WHERE question_text_en = 'What type of sealer system does Envirobase use to assist in matching highly translucent colors?'
UNION ALL
SELECT id, 'Black tinted undercoat', 'Sous-couche teintée noire', 'Subcapa teñida negra', false, 3 FROM public.quiz_questions WHERE question_text_en = 'What type of sealer system does Envirobase use to assist in matching highly translucent colors?'
UNION ALL
SELECT id, 'Clear sealer with tint added', 'Scellant transparent avec teinture ajoutée', 'Sellador transparente con tinte añadido', false, 4 FROM public.quiz_questions WHERE question_text_en = 'What type of sealer system does Envirobase use to assist in matching highly translucent colors?';


-- ═══════════════════════════════════════════════════════════════
-- VERIFY
-- ═══════════════════════════════════════════════════════════════
SELECT 'EHP Key Features document: ' || COUNT(*) FROM public.documents WHERE title LIKE '%Key Features%';
SELECT 'EHP Key Features chunks: ' || COUNT(*) FROM public.document_chunks dc JOIN public.documents d ON dc.document_id = d.id WHERE d.title LIKE '%Key Features%';
SELECT 'EHP quiz: ' || COUNT(*) FROM public.quizzes WHERE slug = 'envirobase-key-features';
SELECT 'EHP quiz questions: ' || COUNT(*) FROM public.quiz_questions qq JOIN public.quizzes q ON qq.quiz_id = q.id WHERE q.slug = 'envirobase-key-features';
SELECT 'EHP quiz answers: ' || COUNT(*) FROM public.quiz_answers qa JOIN public.quiz_questions qq ON qa.question_id = qq.id JOIN public.quizzes q ON qq.quiz_id = q.id WHERE q.slug = 'envirobase-key-features';
