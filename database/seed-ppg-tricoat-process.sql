-- ═══════════════════════════════════════════════════════════════
-- PPG Waterborne Tri-Coat Refinish Process (WBTP001)
-- Source: WBTP001 Waterborne Tri-Coat Refinish Process 5/18
-- Run in Supabase SQL Editor
-- ═══════════════════════════════════════════════════════════════

-- ─── Document: Tri-Coat Refinish Process (detailed) ────────────
INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata) VALUES (
  'PPG Waterborne Tri-Coat Refinish Process (WBTP001)',
  'Comprehensive PPG guide for waterborne tri-coat refinish repair. Covers the 5-step application flowchart, full terminology definitions (G-Shade undercoat, coverage coat, control coat, groundcoat, effect coat, transition layer, mid-coat, zone refinishing, let-down process, reverse blending, viscosity), standard blending vs zone refinishing, and building a let-down tool.',
  'procedure',
  'painting',
  ARRAY['ppg', 'tri-coat', 'three stage', 'waterborne', 'WBTP001', 'G-shade', 'groundcoat', 'mid-coat', 'transition layer', 'effect coat', 'coverage coat', 'control coat', 'zone refinishing', 'section refinishing', 'let-down tool', 'reverse blending', 'viscosity', 'DIN4 cup', 'blend', 'envirobase'],
  '{"full_content": "PPG Waterborne Tri-Coat Refinish Process (WBTP001 5/18)\n\nThis guide covers the tri-coat refinish repair process for PPG Envirobase High Performance.\n\nAPPLICATION FLOWCHART (5 Steps):\n1. Gray Shade Undercoat Layer\n2. Groundcoat Layer (Coverage Coats + Control Coat if required)\n3. Blending Decision — If YES: create transition color (1 part RTS Groundcoat + 1 part RTS Mid-Coat), apply as Effect Coat, tack off blend areas. Optional 2nd transition layer: mix 1 part RTS Transition Color + 1 part RTS Mid-Coat. If NO blending: skip to Mid-Coat.\n4. Mid-Coat (Effect Coats + Control Coat if required)\n5. Clearcoat\n\nTRI-COAT TERMINOLOGY:\n\nG-Shade Undercoat: Primer/sealer gray shade recommended on the formula. Helps achieve desired color in fewest coats. Refer to PPG color retrieval system for correct G-Shade.\n\nCoverage Coat: Spraygun distance approximately 6-8 inches, 75% overlap to achieve coverage. Apply to a uniform wet-dry-wet-dry appearance. Caution: avoid wet or over application of color.\n\nControl Coat: Spraygun distance approximately 10-12 inches, 90% overlap with reduced air pressure. Only for pearl and/or metallic containing colors to ensure metallic and/or pearl orientation. Apply dry with no wetness.\n\nGroundcoat (Main Layer): Basecoat color (solid, pearl, metallic) used as the first or ground color coat of a tri-coat system. Spray like a standard Coverage Coat. Pearl/metallic colors require a Control Coat. Spraygun distance 6-8 inches, 75% overlap. Apply to wet-dry-wet-dry appearance.\n\nEffect Coat: The application method for the Transition Layer and Mid-Coats. Differs from normal Groundcoat/Control Coat application. 90% overlap required with a 10% (2-4 psi) reduction in air pressure to achieve an appearance drier than Coverage Coat but wetter than Control Coat.\n\nTransition Layer: 1:1 mix of ready-to-spray (RTS) Groundcoat color and RTS Mid-Coat color. Purpose is to create a gradual transition from Groundcoat to Mid-Coat in blend areas. Sprayed/applied as an Effect Coat. A Control Coat may not be necessary over the Transition Layer.\n\nMid-Coat (Tinted Clearcoat/Transparent Coat): Translucent layer (tinted or pearl containing) applied over the groundcoat in a tri-coat system.\n\nZone or Section Refinishing: Refinishing an entire zone or section rather than blending. Used when existing finish varies in blotchiness and/or opaqueness across multiple panels. Body lines, feature lines, moldings can disguise or hide the color blend. Apply color to entire zone, then clearcoat all panels to panel edge.\n\nLet-Down Process: Process to determine the number of Mid-Coats needed for a blendable color alignment to the vehicle.\n\nReverse Blending: Process to minimize total blend area size. Start outside the coverage area and blend back into it. Gradually pull trigger from no material to full trigger while keeping spraygun at 90 degrees. Helps keep metallic/pearl overspray from floating out to areas receiving no Mid-Coat.\n\nViscosity: Waterborne basecoats should be mixed at 23-28 seconds using a DIN4 cup. Optimal performance at 23-25 seconds. Tech Tip: 1 fluid oz of waterborne thinner lowers viscosity for 24 oz of basecoat by approximately 5 seconds. Temperature and humidity also affect viscosity.\n\nBUILDING A LET-DOWN TOOL (10 Steps):\n1. Adhere PPG sprayout cards to stationary object. Cards should have correct G-Shade sealer applied.\n2. Spray all cards with single coats of Groundcoat until perceived opacity. For metallic/pearl, apply a Control Coat.\n3. Cover Card #1 with masking paper — reference for Groundcoat only.\n4. If blending, apply 1 Transition Layer to exposed cards.\n5. Cover all but 1 card with masking paper.\n6. Apply 1 Mid-Coat to exposed card.\n7. Remove masking for next card, apply 1 Mid-Coat to both exposed cards.\n8. Repeat until Card #2 has only one coat of Mid-Coat.\n9. For pearl Mid-Coats, mask off half of each card vertically and apply Control Coat.\n10. Allow to dry, apply 2 coats of clear to half of each card. Evaluate in natural daylight or color-correct lighting.\nCards: #1 Groundcoat only, #2 Groundcoat+1 Mid-Coat, #3 +2, #4 +3, #5 +4, #6 +5 Mid-Coats.\nDocument formula numbers, viscosity, # of ground/mid-coats, spray gun setup on back of cards.\n\nSource: PPG Industries — ppgrefinish.com (WBTP001 5/18)"}'::jsonb
);

-- Chunk 1: Flowchart and terminology
INSERT INTO public.document_chunks (document_id, chunk_index, content, metadata)
SELECT id, 0,
  'PPG Waterborne Tri-Coat Refinish Process WBTP001: 5-step flowchart - Step 1 Gray Shade Undercoat Layer, Step 2 Groundcoat Layer with coverage coats plus control coat if required, Step 3 Blending decision - if blending create transition color 1:1 mix RTS Groundcoat and RTS Mid-Coat apply as effect coat tack off blend areas, optional 2nd transition layer mix transition color with mid-coat color, Step 4 Mid-Coat effect coats plus control coat, Step 5 Clearcoat. Terminology: G-Shade is primer/sealer gray shade on formula. Coverage Coat 6-8 inches 75% overlap wet-dry-wet-dry. Control Coat 10-12 inches 90% overlap reduced pressure for pearl metallic orientation apply dry. Groundcoat is basecoat color first layer. Effect Coat 90% overlap 2-4 psi reduction drier than coverage but wetter than control.',
  '{"source": "PPG WBTP001", "type": "procedure", "category": "tri-coat"}'::jsonb
FROM public.documents WHERE title = 'PPG Waterborne Tri-Coat Refinish Process (WBTP001)';

-- Chunk 2: Transition, mid-coat, zone refinishing, viscosity
INSERT INTO public.document_chunks (document_id, chunk_index, content, metadata)
SELECT id, 1,
  'Tri-coat terminology continued: Transition Layer is 1:1 mix of RTS Groundcoat color and RTS Mid-Coat color for gradual transition in blend areas applied as effect coat. Mid-Coat is translucent tinted or pearl containing layer over groundcoat. Zone or Section Refinishing refinishes entire zone instead of blending, used when existing finish varies in blotchiness or opaqueness. Reverse Blending starts outside coverage area blends back in, keep spraygun at 90 degrees. Viscosity waterborne basecoats 23-28 seconds DIN4 cup optimal 23-25 seconds. Tech tip 1 fluid oz waterborne thinner lowers viscosity for 24 oz basecoat by 5 seconds.',
  '{"source": "PPG WBTP001", "type": "procedure", "category": "tri-coat"}'::jsonb
FROM public.documents WHERE title = 'PPG Waterborne Tri-Coat Refinish Process (WBTP001)';

-- Chunk 3: Let-down tool process
INSERT INTO public.document_chunks (document_id, chunk_index, content, metadata)
SELECT id, 2,
  'Building a Let-Down Tool for tri-coat: 10 steps. Adhere PPG sprayout cards to stationary object with correct G-Shade sealer. Spray all cards with Groundcoat until opacity, apply Control Coat for metallic pearl. Cover Card 1 as groundcoat reference. Apply 1 Transition Layer if blending. Progressively apply Mid-Coats one card at a time. Card 1 groundcoat only, Card 2 groundcoat plus 1 mid-coat, Card 3 plus 2, through Card 6 plus 5 mid-coats. For pearl mid-coats mask half vertically apply Control Coat. Apply 2 coats clear to half each card. Evaluate in natural daylight or color-correct lighting. Document formula viscosity coats and spray setup on back of cards.',
  '{"source": "PPG WBTP001", "type": "procedure", "category": "let-down tool"}'::jsonb
FROM public.documents WHERE title = 'PPG Waterborne Tri-Coat Refinish Process (WBTP001)';


-- ═══════════════════════════════════════════════════════════════
-- QUIZ: Expanded Tri-Coat Refinish Process
-- ═══════════════════════════════════════════════════════════════

INSERT INTO public.quizzes (title_en, title_fr, title_es, description_en, description_fr, description_es, slug, quiz_type, passing_score, is_active)
VALUES (
  'Tri-Coat Refinish Process',
  'Processus de finition tri-couche',
  'Proceso de acabado tricapa',
  'Test your knowledge of the PPG waterborne tri-coat refinish process — terminology, application flowchart, blending techniques, and the let-down tool.',
  'Testez vos connaissances du processus de finition tri-couche PPG.',
  'Evalúa tu conocimiento del proceso de acabado tricapa PPG.',
  'tri-coat-refinish-process',
  'product-knowledge',
  70,
  true
);

-- Q1: What is a G-Shade Undercoat?
INSERT INTO public.quiz_questions (quiz_id, question_text_en, question_text_fr, question_text_es, question_type, explanation_en, explanation_fr, explanation_es, question_order)
SELECT id,
  'In a tri-coat system, what is the purpose of the "G-Shade" undercoat?',
  'Dans un système tri-couche, quel est le but du sous-couche "G-Shade"?',
  '¿En un sistema tricapa, cuál es el propósito de la subcapa "G-Shade"?',
  'multiple-choice',
  'The G-Shade is a primer/sealer gray shade recommended on the formula that helps achieve the desired color in the fewest number of coats.',
  'Le G-Shade est un apprêt/scellant gris recommandé sur la formule.',
  'El G-Shade es un imprimador/sellador gris recomendado en la fórmula.',
  1
FROM public.quizzes WHERE slug = 'tri-coat-refinish-process';

INSERT INTO public.quiz_answers (question_id, answer_text_en, answer_text_fr, answer_text_es, is_correct, answer_order)
SELECT id, 'A gray shade primer/sealer that helps achieve the desired color in fewer coats', 'Un apprêt/scellant gris qui aide à obtenir la couleur désirée en moins de couches', 'Un imprimador/sellador gris que ayuda a lograr el color deseado en menos capas', true, 1 FROM public.quiz_questions WHERE question_text_en = 'In a tri-coat system, what is the purpose of the "G-Shade" undercoat?'
UNION ALL
SELECT id, 'A protective clear layer applied before basecoat', 'Une couche protectrice transparente appliquée avant la base', 'Una capa protectora transparente aplicada antes de la base', false, 2 FROM public.quiz_questions WHERE question_text_en = 'In a tri-coat system, what is the purpose of the "G-Shade" undercoat?'
UNION ALL
SELECT id, 'A colored tint added to the clearcoat', 'Une teinte colorée ajoutée au vernis', 'Un tinte de color añadido al barniz', false, 3 FROM public.quiz_questions WHERE question_text_en = 'In a tri-coat system, what is the purpose of the "G-Shade" undercoat?'
UNION ALL
SELECT id, 'A rust inhibitor applied to bare metal', 'Un inhibiteur de rouille appliqué sur le métal nu', 'Un inhibidor de óxido aplicado sobre metal desnudo', false, 4 FROM public.quiz_questions WHERE question_text_en = 'In a tri-coat system, what is the purpose of the "G-Shade" undercoat?';

-- Q2: What is the transition layer mix ratio?
INSERT INTO public.quiz_questions (quiz_id, question_text_en, question_text_fr, question_text_es, question_type, explanation_en, explanation_fr, explanation_es, question_order)
SELECT id,
  'What is the mix ratio for creating a Transition Layer in a tri-coat blend?',
  'Quel est le ratio de mélange pour créer une couche de transition dans un dégradé tri-couche?',
  '¿Cuál es la proporción de mezcla para crear una capa de transición en un degradado tricapa?',
  'multiple-choice',
  'The Transition Layer is a 1:1 mix of ready-to-spray (RTS) Groundcoat color and RTS Mid-Coat color.',
  'La couche de transition est un mélange 1:1 de Groundcoat RTS et Mid-Coat RTS.',
  'La capa de transición es una mezcla 1:1 de Groundcoat RTS y Mid-Coat RTS.',
  2
FROM public.quizzes WHERE slug = 'tri-coat-refinish-process';

INSERT INTO public.quiz_answers (question_id, answer_text_en, answer_text_fr, answer_text_es, is_correct, answer_order)
SELECT id, '1:1 mix of RTS Groundcoat and RTS Mid-Coat', 'Mélange 1:1 de Groundcoat RTS et Mid-Coat RTS', 'Mezcla 1:1 de Groundcoat RTS y Mid-Coat RTS', true, 1 FROM public.quiz_questions WHERE question_text_en = 'What is the mix ratio for creating a Transition Layer in a tri-coat blend?'
UNION ALL
SELECT id, '3:1 mix of clearcoat and basecoat', 'Mélange 3:1 de vernis et base', 'Mezcla 3:1 de barniz y base', false, 2 FROM public.quiz_questions WHERE question_text_en = 'What is the mix ratio for creating a Transition Layer in a tri-coat blend?'
UNION ALL
SELECT id, '2:1 mix of Mid-Coat and reducer', 'Mélange 2:1 de Mid-Coat et réducteur', 'Mezcla 2:1 de Mid-Coat y reductor', false, 3 FROM public.quiz_questions WHERE question_text_en = 'What is the mix ratio for creating a Transition Layer in a tri-coat blend?'
UNION ALL
SELECT id, '4:1 mix of Groundcoat and hardener', 'Mélange 4:1 de Groundcoat et durcisseur', 'Mezcla 4:1 de Groundcoat y endurecedor', false, 4 FROM public.quiz_questions WHERE question_text_en = 'What is the mix ratio for creating a Transition Layer in a tri-coat blend?';

-- Q3: What is the difference between a Coverage Coat and a Control Coat?
INSERT INTO public.quiz_questions (quiz_id, question_text_en, question_text_fr, question_text_es, question_type, explanation_en, explanation_fr, explanation_es, question_order)
SELECT id,
  'What is the key difference between a Coverage Coat and a Control Coat in tri-coat application?',
  'Quelle est la différence clé entre une couche de couverture et une couche de contrôle?',
  '¿Cuál es la diferencia clave entre una capa de cobertura y una capa de control?',
  'multiple-choice',
  'A Coverage Coat is applied at 6-8 inches with 75% overlap for coverage. A Control Coat is applied at 10-12 inches with 90% overlap and reduced air pressure for metallic/pearl orientation — applied dry with no wetness.',
  'La couche de couverture est à 6-8 pouces 75% chevauchement, la couche de contrôle à 10-12 pouces 90% chevauchement pression réduite.',
  'La capa de cobertura es a 6-8 pulgadas 75% solape, la capa de control a 10-12 pulgadas 90% solape presión reducida.',
  3
FROM public.quizzes WHERE slug = 'tri-coat-refinish-process';

INSERT INTO public.quiz_answers (question_id, answer_text_en, answer_text_fr, answer_text_es, is_correct, answer_order)
SELECT id, 'Coverage Coat: 6-8" distance, 75% overlap, wet. Control Coat: 10-12", 90% overlap, reduced pressure, dry', 'Couverture: 6-8", 75%, humide. Contrôle: 10-12", 90%, pression réduite, sec', 'Cobertura: 6-8", 75%, húmedo. Control: 10-12", 90%, presión reducida, seco', true, 1 FROM public.quiz_questions WHERE question_text_en = 'What is the key difference between a Coverage Coat and a Control Coat in tri-coat application?'
UNION ALL
SELECT id, 'They are the same technique with different names', 'C''est la même technique avec des noms différents', 'Son la misma técnica con nombres diferentes', false, 2 FROM public.quiz_questions WHERE question_text_en = 'What is the key difference between a Coverage Coat and a Control Coat in tri-coat application?'
UNION ALL
SELECT id, 'Coverage Coat uses higher pressure than Control Coat', 'La couverture utilise une pression plus élevée que le contrôle', 'La cobertura usa mayor presión que el control', false, 3 FROM public.quiz_questions WHERE question_text_en = 'What is the key difference between a Coverage Coat and a Control Coat in tri-coat application?'
UNION ALL
SELECT id, 'Control Coat is thicker and wetter than Coverage Coat', 'La couche de contrôle est plus épaisse et humide que la couverture', 'La capa de control es más gruesa y húmeda que la cobertura', false, 4 FROM public.quiz_questions WHERE question_text_en = 'What is the key difference between a Coverage Coat and a Control Coat in tri-coat application?';

-- Q4: What is the correct viscosity range?
INSERT INTO public.quiz_questions (quiz_id, question_text_en, question_text_fr, question_text_es, question_type, explanation_en, explanation_fr, explanation_es, question_order)
SELECT id,
  'What is the optimal viscosity range for waterborne basecoats measured with a DIN4 cup?',
  'Quelle est la viscosité optimale pour les bases hydrodiluables mesurée avec un godet DIN4?',
  '¿Cuál es la viscosidad óptima para bases al agua medida con copa DIN4?',
  'multiple-choice',
  'Waterborne basecoats should be mixed at 23-28 seconds using a DIN4 cup, with optimal performance at 23-25 seconds.',
  'Les bases hydrodiluables doivent être mélangées à 23-28 secondes avec un godet DIN4.',
  'Las bases al agua deben mezclarse a 23-28 segundos con copa DIN4.',
  4
FROM public.quizzes WHERE slug = 'tri-coat-refinish-process';

INSERT INTO public.quiz_answers (question_id, answer_text_en, answer_text_fr, answer_text_es, is_correct, answer_order)
SELECT id, '23-25 seconds (optimal), 23-28 seconds (acceptable)', '23-25 secondes (optimal), 23-28 secondes (acceptable)', '23-25 segundos (óptimo), 23-28 segundos (aceptable)', true, 1 FROM public.quiz_questions WHERE question_text_en = 'What is the optimal viscosity range for waterborne basecoats measured with a DIN4 cup?'
UNION ALL
SELECT id, '10-15 seconds', '10-15 secondes', '10-15 segundos', false, 2 FROM public.quiz_questions WHERE question_text_en = 'What is the optimal viscosity range for waterborne basecoats measured with a DIN4 cup?'
UNION ALL
SELECT id, '40-50 seconds', '40-50 secondes', '40-50 segundos', false, 3 FROM public.quiz_questions WHERE question_text_en = 'What is the optimal viscosity range for waterborne basecoats measured with a DIN4 cup?'
UNION ALL
SELECT id, '60-75 seconds', '60-75 secondes', '60-75 segundos', false, 4 FROM public.quiz_questions WHERE question_text_en = 'What is the optimal viscosity range for waterborne basecoats measured with a DIN4 cup?';

-- Q5: When should you use Zone Refinishing?
INSERT INTO public.quiz_questions (quiz_id, question_text_en, question_text_fr, question_text_es, question_type, explanation_en, explanation_fr, explanation_es, question_order)
SELECT id,
  'When should "Zone" or "Section" refinishing be used instead of blending?',
  'Quand faut-il utiliser la finition par zone plutôt que le dégradé?',
  '¿Cuándo se debe usar el acabado por zona en lugar del degradado?',
  'multiple-choice',
  'Zone refinishing is used when the existing finish varies in blotchiness and/or opaqueness across multiple panels. Body lines and moldings can be used to hide the color transition.',
  'La finition par zone est utilisée quand la finition existante varie en taches ou opacité.',
  'El acabado por zona se usa cuando el acabado existente varía en manchas u opacidad.',
  5
FROM public.quizzes WHERE slug = 'tri-coat-refinish-process';

INSERT INTO public.quiz_answers (question_id, answer_text_en, answer_text_fr, answer_text_es, is_correct, answer_order)
SELECT id, 'When existing finish varies in blotchiness or opaqueness across multiple panels', 'Quand la finition existante varie en taches ou opacité sur plusieurs panneaux', 'Cuando el acabado existente varía en manchas u opacidad en múltiples paneles', true, 1 FROM public.quiz_questions WHERE question_text_en = 'When should "Zone" or "Section" refinishing be used instead of blending?'
UNION ALL
SELECT id, 'Only on brand new vehicles', 'Uniquement sur les véhicules neufs', 'Solo en vehículos nuevos', false, 2 FROM public.quiz_questions WHERE question_text_en = 'When should "Zone" or "Section" refinishing be used instead of blending?'
UNION ALL
SELECT id, 'When the paint is less than one year old', 'Quand la peinture a moins d''un an', 'Cuando la pintura tiene menos de un año', false, 3 FROM public.quiz_questions WHERE question_text_en = 'When should "Zone" or "Section" refinishing be used instead of blending?'
UNION ALL
SELECT id, 'Only for solid (non-metallic) colors', 'Uniquement pour les couleurs solides', 'Solo para colores sólidos', false, 4 FROM public.quiz_questions WHERE question_text_en = 'When should "Zone" or "Section" refinishing be used instead of blending?';

-- Q6: What is the purpose of a Let-Down Tool?
INSERT INTO public.quiz_questions (quiz_id, question_text_en, question_text_fr, question_text_es, question_type, explanation_en, explanation_fr, explanation_es, question_order)
SELECT id,
  'What is the purpose of building a Let-Down Tool for tri-coat repairs?',
  'Quel est le but de la construction d''un outil de dégression pour les réparations tri-couche?',
  '¿Cuál es el propósito de construir una herramienta de degradación para reparaciones tricapa?',
  'multiple-choice',
  'A Let-Down Tool helps determine the number of Mid-Coats necessary to achieve a blendable color alignment to the vehicle.',
  'L''outil de dégression aide à déterminer le nombre de Mid-Coats nécessaires.',
  'La herramienta de degradación ayuda a determinar el número de Mid-Coats necesarios.',
  6
FROM public.quizzes WHERE slug = 'tri-coat-refinish-process';

INSERT INTO public.quiz_answers (question_id, answer_text_en, answer_text_fr, answer_text_es, is_correct, answer_order)
SELECT id, 'To determine the number of Mid-Coats needed for blendable color alignment', 'Pour déterminer le nombre de Mid-Coats nécessaires pour l''alignement des couleurs', 'Para determinar el número de Mid-Coats necesarios para alineación de color', true, 1 FROM public.quiz_questions WHERE question_text_en = 'What is the purpose of building a Let-Down Tool for tri-coat repairs?'
UNION ALL
SELECT id, 'To measure the paint film thickness', 'Pour mesurer l''épaisseur du film de peinture', 'Para medir el espesor de la película de pintura', false, 2 FROM public.quiz_questions WHERE question_text_en = 'What is the purpose of building a Let-Down Tool for tri-coat repairs?'
UNION ALL
SELECT id, 'To test reducer compatibility', 'Pour tester la compatibilité du réducteur', 'Para probar la compatibilidad del reductor', false, 3 FROM public.quiz_questions WHERE question_text_en = 'What is the purpose of building a Let-Down Tool for tri-coat repairs?'
UNION ALL
SELECT id, 'To calibrate the spray gun pressure', 'Pour calibrer la pression du pistolet', 'Para calibrar la presión de la pistola', false, 4 FROM public.quiz_questions WHERE question_text_en = 'What is the purpose of building a Let-Down Tool for tri-coat repairs?';

-- Q7: How is an Effect Coat different?
INSERT INTO public.quiz_questions (quiz_id, question_text_en, question_text_fr, question_text_es, question_type, explanation_en, explanation_fr, explanation_es, question_order)
SELECT id,
  'How does an "Effect Coat" differ from a standard Coverage or Control Coat?',
  'Comment une couche d''effet diffère-t-elle d''une couche de couverture ou de contrôle standard?',
  '¿Cómo difiere una capa de efecto de una capa de cobertura o control estándar?',
  'multiple-choice',
  'An Effect Coat requires 90% overlap with a 10% (2-4 psi) reduction in air pressure, achieving an appearance drier than a Coverage Coat but wetter than a Control Coat.',
  'La couche d''effet nécessite 90% de chevauchement avec une réduction de pression de 2-4 psi.',
  'La capa de efecto requiere 90% de solape con una reducción de presión de 2-4 psi.',
  7
FROM public.quizzes WHERE slug = 'tri-coat-refinish-process';

INSERT INTO public.quiz_answers (question_id, answer_text_en, answer_text_fr, answer_text_es, is_correct, answer_order)
SELECT id, '90% overlap, 2-4 psi less pressure — drier than coverage but wetter than control', '90% chevauchement, 2-4 psi de moins — plus sec que couverture mais plus humide que contrôle', '90% solape, 2-4 psi menos — más seco que cobertura pero más húmedo que control', true, 1 FROM public.quiz_questions WHERE question_text_en = 'How does an "Effect Coat" differ from a standard Coverage or Control Coat?'
UNION ALL
SELECT id, 'It uses double the normal air pressure', 'Il utilise le double de la pression normale', 'Usa el doble de la presión normal', false, 2 FROM public.quiz_questions WHERE question_text_en = 'How does an "Effect Coat" differ from a standard Coverage or Control Coat?'
UNION ALL
SELECT id, 'It is applied from 18-24 inches away', 'Il est appliqué à 18-24 pouces de distance', 'Se aplica a 18-24 pulgadas de distancia', false, 3 FROM public.quiz_questions WHERE question_text_en = 'How does an "Effect Coat" differ from a standard Coverage or Control Coat?'
UNION ALL
SELECT id, 'It is identical to a Coverage Coat', 'Il est identique à une couche de couverture', 'Es idéntico a una capa de cobertura', false, 4 FROM public.quiz_questions WHERE question_text_en = 'How does an "Effect Coat" differ from a standard Coverage or Control Coat?';

-- Q8: What is Reverse Blending?
INSERT INTO public.quiz_questions (quiz_id, question_text_en, question_text_fr, question_text_es, question_type, explanation_en, explanation_fr, explanation_es, question_order)
SELECT id,
  'In tri-coat refinishing, what technique is "Reverse Blending"?',
  'Dans la finition tri-couche, qu''est-ce que le dégradé inversé?',
  '¿En el acabado tricapa, qué es el degradado inverso?',
  'multiple-choice',
  'Reverse Blending starts outside the coverage area and blends back into it, gradually pulling the trigger from no material to full. Keep spraygun at 90 degrees to prevent metallic/pearl overspray floating out.',
  'Le dégradé inversé commence à l''extérieur de la zone de couverture et revient vers l''intérieur.',
  'El degradado inverso comienza fuera del área de cobertura y regresa hacia adentro.',
  8
FROM public.quizzes WHERE slug = 'tri-coat-refinish-process';

INSERT INTO public.quiz_answers (question_id, answer_text_en, answer_text_fr, answer_text_es, is_correct, answer_order)
SELECT id, 'Starting outside the coverage area and blending back into it at 90 degrees', 'Commencer à l''extérieur de la zone de couverture et revenir vers l''intérieur à 90 degrés', 'Comenzar fuera del área de cobertura y regresar hacia adentro a 90 grados', true, 1 FROM public.quiz_questions WHERE question_text_en = 'In tri-coat refinishing, what technique is "Reverse Blending"?'
UNION ALL
SELECT id, 'Applying clearcoat before basecoat', 'Appliquer le vernis avant la base', 'Aplicar barniz antes de la base', false, 2 FROM public.quiz_questions WHERE question_text_en = 'In tri-coat refinishing, what technique is "Reverse Blending"?'
UNION ALL
SELECT id, 'Spraying from the center of the panel outward', 'Pulvériser du centre du panneau vers l''extérieur', 'Pulverizar desde el centro del panel hacia afuera', false, 3 FROM public.quiz_questions WHERE question_text_en = 'In tri-coat refinishing, what technique is "Reverse Blending"?'
UNION ALL
SELECT id, 'Using the same cup for groundcoat and mid-coat', 'Utiliser le même godet pour groundcoat et mid-coat', 'Usar la misma copa para groundcoat y mid-coat', false, 4 FROM public.quiz_questions WHERE question_text_en = 'In tri-coat refinishing, what technique is "Reverse Blending"?';


-- ═══════════════════════════════════════════════════════════════
-- VERIFY
-- ═══════════════════════════════════════════════════════════════
SELECT 'Tri-coat document: ' || COUNT(*) FROM public.documents WHERE title LIKE '%Tri-Coat Refinish Process%';
SELECT 'Tri-coat chunks: ' || COUNT(*) FROM public.document_chunks dc JOIN public.documents d ON dc.document_id = d.id WHERE d.title LIKE '%Tri-Coat Refinish Process%';
SELECT 'Tri-coat quiz: ' || COUNT(*) FROM public.quizzes WHERE slug = 'tri-coat-refinish-process';
SELECT 'Tri-coat questions: ' || COUNT(*) FROM public.quiz_questions qq JOIN public.quizzes q ON qq.quiz_id = q.id WHERE q.slug = 'tri-coat-refinish-process';
SELECT 'Tri-coat answers: ' || COUNT(*) FROM public.quiz_answers qa JOIN public.quiz_questions qq ON qa.question_id = qq.id JOIN public.quizzes q ON qq.quiz_id = q.id WHERE q.slug = 'tri-coat-refinish-process';
