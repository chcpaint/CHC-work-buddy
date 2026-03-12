-- ═══════════════════════════════════════════════════════════════
-- QUIZ SEED — Round 2: PPG Procedures + Body Shop Topics
-- Run AFTER STEP5_quiz_seed.sql (which created the first 3 quizzes)
-- ═══════════════════════════════════════════════════════════════


-- ═══════════════════════════════════════════════════════════════
-- QUIZ 4: PPG Envirobase Procedures
-- ═══════════════════════════════════════════════════════════════

INSERT INTO public.quizzes (id, slug, title_en, title_fr, title_es, description_en, description_fr, description_es, quiz_type, passing_score, icon)
VALUES (
  'a1000001-0001-0001-0001-000000000004',
  'ppg-envirobase-procedures',
  'PPG Envirobase Procedures', 'Procédures PPG Envirobase', 'Procedimientos PPG Envirobase',
  'Test your knowledge of PPG Envirobase High Performance SOPs — primers, plastics, panel prep, and tri-coat repair',
  'Testez vos connaissances des SOP PPG Envirobase — apprêts, plastiques, préparation et réparation tri-couche',
  'Pruebe su conocimiento de los SOP PPG Envirobase — imprimantes, plásticos, preparación y reparación tricapa',
  'product-knowledge', 75, '🎨'
);

-- Q1: Raw plastic identification
INSERT INTO public.quiz_questions (id, quiz_id, question_order, question_text_en, question_text_fr, question_text_es, question_type, explanation_en, explanation_fr, explanation_es)
VALUES (
  'b1000001-0001-0001-0004-000000000001',
  'a1000001-0001-0001-0001-000000000004', 1,
  'Per PPG SOP, how do you identify if a plastic part is raw or pre-primed?',
  'Selon le SOP PPG, comment identifiez-vous si une pièce plastique est brute ou pré-apprêtée?',
  'Según el SOP PPG, ¿cómo identifica si una pieza de plástico es cruda o pre-imprimada?',
  'multiple-choice',
  'Sand the plastic part with fine sand paper — if the substrate is exposed, it is raw. If primer is present underneath, it is pre-primed. This determines whether adhesion promoter is needed.',
  'Poncez la pièce avec du papier fin — si le substrat est exposé, elle est brute.',
  'Lije la pieza con papel fino — si el sustrato queda expuesto, es cruda.'
);
INSERT INTO public.quiz_answers (question_id, answer_order, answer_text_en, answer_text_fr, answer_text_es, is_correct) VALUES
  ('b1000001-0001-0001-0004-000000000001', 1, 'Sand with fine sand paper to see if primer is present underneath', 'Poncer avec du papier fin pour voir si un apprêt est présent', 'Lijar con papel fino para ver si hay imprimante debajo', true),
  ('b1000001-0001-0001-0004-000000000001', 2, 'Check the part number sticker on the back', 'Vérifier l''étiquette au dos', 'Verificar la etiqueta en la parte trasera', false),
  ('b1000001-0001-0001-0004-000000000001', 3, 'Spray water on it — raw plastic repels water', 'Pulvériser de l''eau — le plastique brut repousse l''eau', 'Rociar agua — el plástico crudo repele el agua', false),
  ('b1000001-0001-0001-0004-000000000001', 4, 'All new parts are always pre-primed', 'Toutes les pièces neuves sont toujours pré-apprêtées', 'Todas las piezas nuevas siempre están pre-imprimadas', false);

-- Q2: Adhesion promoter on pre-primed plastic
INSERT INTO public.quiz_questions (id, quiz_id, question_order, question_text_en, question_text_fr, question_text_es, question_type, explanation_en, explanation_fr, explanation_es)
VALUES (
  'b1000001-0001-0001-0004-000000000002',
  'a1000001-0001-0001-0001-000000000004', 2,
  'Should you apply adhesion promoter to a pre-primed plastic part?',
  'Devez-vous appliquer un promoteur d''adhérence sur une pièce plastique pré-apprêtée?',
  '¿Debe aplicar promotor de adhesión a una pieza plástica pre-imprimada?',
  'multiple-choice',
  'Per PPG SOP: Do NOT apply adhesion promoters to pre-primed plastic. The factory primer already provides the adhesion layer.',
  'Selon le SOP PPG: NE PAS appliquer de promoteur d''adhérence sur le plastique pré-apprêté.',
  'Según el SOP PPG: NO aplicar promotor de adhesión en plástico pre-imprimado.'
);
INSERT INTO public.quiz_answers (question_id, answer_order, answer_text_en, answer_text_fr, answer_text_es, is_correct) VALUES
  ('b1000001-0001-0001-0004-000000000002', 1, 'No — do not apply adhesion promoters to pre-primed plastic', 'Non — ne pas appliquer de promoteur sur plastique pré-apprêté', 'No — no aplicar promotor en plástico pre-imprimado', true),
  ('b1000001-0001-0001-0004-000000000002', 2, 'Yes — always apply adhesion promoter to all plastic', 'Oui — toujours appliquer sur tout plastique', 'Sí — siempre aplicar en todo plástico', false),
  ('b1000001-0001-0001-0004-000000000002', 3, 'Only if using waterborne paint', 'Seulement si vous utilisez de la peinture à l''eau', 'Solo si usa pintura a base de agua', false),
  ('b1000001-0001-0001-0004-000000000002', 4, 'Only on bumper covers, not on smaller parts', 'Seulement sur les pare-chocs, pas les petites pièces', 'Solo en defensas, no en piezas pequeñas', false);

-- Q3: Reverse priming method
INSERT INTO public.quiz_questions (id, quiz_id, question_order, question_text_en, question_text_fr, question_text_es, question_type, explanation_en, explanation_fr, explanation_es)
VALUES (
  'b1000001-0001-0001-0004-000000000003',
  'a1000001-0001-0001-0001-000000000004', 3,
  'In the PPG reverse priming method, how should you apply primer surfacer coats?',
  'Dans la méthode d''apprêtage inversé PPG, comment devez-vous appliquer les couches?',
  'En el método de imprimación inversa PPG, ¿cómo debe aplicar las capas de imprimante?',
  'multiple-choice',
  'PPG reverse priming: 1st coat lightest, 2nd coat medium, 3rd coat heaviest. This builds thickness gradually for better adhesion and leveling.',
  'Apprêtage inversé PPG: 1ère couche la plus légère, 2ème moyenne, 3ème la plus lourde.',
  'Imprimación inversa PPG: 1ª capa más ligera, 2ª media, 3ª más pesada.'
);
INSERT INTO public.quiz_answers (question_id, answer_order, answer_text_en, answer_text_fr, answer_text_es, is_correct) VALUES
  ('b1000001-0001-0001-0004-000000000003', 1, '1st coat lightest, 2nd medium, 3rd heaviest', '1ère légère, 2ème moyenne, 3ème lourde', '1ª ligera, 2ª media, 3ª pesada', true),
  ('b1000001-0001-0001-0004-000000000003', 2, 'All coats should be equally heavy', 'Toutes les couches doivent être également lourdes', 'Todas las capas deben ser igualmente pesadas', false),
  ('b1000001-0001-0001-0004-000000000003', 3, '1st coat heaviest, then progressively lighter', '1ère la plus lourde, puis progressivement plus légère', '1ª la más pesada, luego progresivamente más ligera', false),
  ('b1000001-0001-0001-0004-000000000003', 4, 'One single heavy coat is sufficient', 'Une seule couche lourde suffit', 'Una sola capa pesada es suficiente', false);

-- Q4: Etch primer flash time
INSERT INTO public.quiz_questions (id, quiz_id, question_order, question_text_en, question_text_fr, question_text_es, question_type, explanation_en, explanation_fr, explanation_es)
VALUES (
  'b1000001-0001-0001-0004-000000000004',
  'a1000001-0001-0001-0001-000000000004', 4,
  'How long should etch primer flash before applying primer surfacer per PPG SOP?',
  'Combien de temps l''apprêt d''accrochage doit-il sécher avant d''appliquer le surfacer selon le SOP PPG?',
  '¿Cuánto tiempo debe evaporarse el primer de adherencia antes de aplicar el surfacer según el SOP PPG?',
  'multiple-choice',
  'PPG SOP states: Apply 2 medium coats of etch primer over bare metal, then let flash for 15 minutes before primer surfacer application.',
  'Le SOP PPG indique: Appliquer 2 couches moyennes, laisser sécher 15 minutes.',
  'El SOP PPG indica: Aplicar 2 capas medianas, dejar evaporar 15 minutos.'
);
INSERT INTO public.quiz_answers (question_id, answer_order, answer_text_en, answer_text_fr, answer_text_es, is_correct) VALUES
  ('b1000001-0001-0001-0004-000000000004', 1, '15 minutes', '15 minutes', '15 minutos', true),
  ('b1000001-0001-0001-0004-000000000004', 2, '5 minutes', '5 minutes', '5 minutos', false),
  ('b1000001-0001-0001-0004-000000000004', 3, '30 minutes', '30 minutes', '30 minutos', false),
  ('b1000001-0001-0001-0004-000000000004', 4, 'No flash needed — apply surfacer immediately', 'Pas de séchage — appliquer immédiatement', 'No necesita — aplicar inmediatamente', false);

-- Q5: Panel prep sanding for sealed vs unsealed
INSERT INTO public.quiz_questions (id, quiz_id, question_order, question_text_en, question_text_fr, question_text_es, question_type, explanation_en, explanation_fr, explanation_es)
VALUES (
  'b1000001-0001-0001-0004-000000000005',
  'a1000001-0001-0001-0001-000000000004', 5,
  'Per PPG panel preparation SOP, what grit should you use on surfaces that will NOT be sealed?',
  'Selon le SOP de préparation de panneau PPG, quel grain utiliser sur les surfaces qui ne seront PAS scellées?',
  'Según el SOP de preparación de panel PPG, ¿qué grano debe usar en superficies que NO serán selladas?',
  'multiple-choice',
  'PPG SOP: Use P400 on surfaces that WILL be sealed. Use P600-P800 on surfaces that will NOT be sealed (finer grit needed for direct topcoat adhesion).',
  'SOP PPG: P400 pour surfaces scellées, P600-P800 pour surfaces non scellées.',
  'SOP PPG: P400 para superficies selladas, P600-P800 para superficies no selladas.'
);
INSERT INTO public.quiz_answers (question_id, answer_order, answer_text_en, answer_text_fr, answer_text_es, is_correct) VALUES
  ('b1000001-0001-0001-0004-000000000005', 1, 'P600-P800', 'P600-P800', 'P600-P800', true),
  ('b1000001-0001-0001-0004-000000000005', 2, 'P400', 'P400', 'P400', false),
  ('b1000001-0001-0001-0004-000000000005', 3, 'P80-P120', 'P80-P120', 'P80-P120', false),
  ('b1000001-0001-0001-0004-000000000005', 4, 'P1500-P2000', 'P1500-P2000', 'P1500-P2000', false);

-- Q6: EPW115 mixing
INSERT INTO public.quiz_questions (id, quiz_id, question_order, question_text_en, question_text_fr, question_text_es, question_type, explanation_en, explanation_fr, explanation_es)
VALUES (
  'b1000001-0001-0001-0004-000000000006',
  'a1000001-0001-0001-0001-000000000004', 6,
  'What is the mix ratio for PPG EPW115 Waterborne Primer?',
  'Quel est le ratio de mélange pour l''apprêt EPW115 de PPG?',
  '¿Cuál es la proporción de mezcla para el imprimante EPW115 de PPG?',
  'multiple-choice',
  'PPG SOP: Shake EPW115 thoroughly, then mix with 10% T494.',
  'SOP PPG: Secouer l''EPW115 puis mélanger avec 10% de T494.',
  'SOP PPG: Agitar el EPW115 y mezclar con 10% de T494.'
);
INSERT INTO public.quiz_answers (question_id, answer_order, answer_text_en, answer_text_fr, answer_text_es, is_correct) VALUES
  ('b1000001-0001-0001-0004-000000000006', 1, '10% T494', '10% T494', '10% T494', true),
  ('b1000001-0001-0001-0004-000000000006', 2, '25% T494', '25% T494', '25% T494', false),
  ('b1000001-0001-0001-0004-000000000006', 3, '4:1 with hardener', '4:1 avec durcisseur', '4:1 con endurecedor', false),
  ('b1000001-0001-0001-0004-000000000006', 4, 'Ready to spray — no mixing needed', 'Prêt à pulvériser — pas de mélange', 'Listo para pulverizar — sin mezcla', false);

-- Q7: Tri-coat zone refinishing
INSERT INTO public.quiz_questions (id, quiz_id, question_order, question_text_en, question_text_fr, question_text_es, question_type, explanation_en, explanation_fr, explanation_es)
VALUES (
  'b1000001-0001-0001-0004-000000000007',
  'a1000001-0001-0001-0001-000000000004', 7,
  'When should you use "zone" or section refinishing instead of colour blending on a tri-coat?',
  'Quand utiliser le refinissage par "zone" au lieu du raccord couleur sur un tri-couche?',
  '¿Cuándo debe usar refinamiento por "zona" en lugar de difuminado de color en un tricapa?',
  'multiple-choice',
  'Zone refinishing is used when existing finish varies in blotchiness or opaqueness across multiple panels. Body lines and mouldings hide the boundary.',
  'Le refinissage par zone est utilisé quand la finition existante varie en taches ou opacité.',
  'El refinamiento por zona se usa cuando el acabado existente varía en manchas u opacidad.'
);
INSERT INTO public.quiz_answers (question_id, answer_order, answer_text_en, answer_text_fr, answer_text_es, is_correct) VALUES
  ('b1000001-0001-0001-0004-000000000007', 1, 'When existing finish varies in blotchiness or opaqueness across multiple panels', 'Quand la finition varie en taches ou opacité sur plusieurs panneaux', 'Cuando el acabado varía en manchas u opacidad en varios paneles', true),
  ('b1000001-0001-0001-0004-000000000007', 2, 'Always — zone refinishing is the standard method', 'Toujours — c''est la méthode standard', 'Siempre — es el método estándar', false),
  ('b1000001-0001-0001-0004-000000000007', 3, 'Only on metallic colours', 'Seulement sur les couleurs métallisées', 'Solo en colores metálicos', false),
  ('b1000001-0001-0001-0004-000000000007', 4, 'Never — always blend into the panel', 'Jamais — toujours raccorder dans le panneau', 'Nunca — siempre difuminar en el panel', false);

-- Q8: Body filler back sand distance
INSERT INTO public.quiz_questions (id, quiz_id, question_order, question_text_en, question_text_fr, question_text_es, question_type, explanation_en, explanation_fr, explanation_es)
VALUES (
  'b1000001-0001-0001-0004-000000000008',
  'a1000001-0001-0001-0001-000000000004', 8,
  'Per PPG SOP, how far should you back sand from the edge of a body filler repair?',
  'Selon le SOP PPG, à quelle distance du bord de la réparation devez-vous poncer?',
  'Según el SOP PPG, ¿qué tan lejos del borde de la reparación debe lijar?',
  'multiple-choice',
  'PPG SOP: Back sand 6 to 8 inches away from the edge of the repair using P320 on a DA with interface pad or P400 by hand.',
  'SOP PPG: Poncer 15-20 cm du bord avec P320 sur DA ou P400 à la main.',
  'SOP PPG: Lijar 15-20 cm del borde con P320 en DA o P400 a mano.'
);
INSERT INTO public.quiz_answers (question_id, answer_order, answer_text_en, answer_text_fr, answer_text_es, is_correct) VALUES
  ('b1000001-0001-0001-0004-000000000008', 1, '6 to 8 inches using P320 on DA or P400 by hand', '15-20 cm avec P320 sur DA ou P400 à la main', '15-20 cm con P320 en DA o P400 a mano', true),
  ('b1000001-0001-0001-0004-000000000008', 2, '2 inches with P80', '5 cm avec P80', '5 cm con P80', false),
  ('b1000001-0001-0001-0004-000000000008', 3, '12+ inches with P600', '30+ cm avec P600', '30+ cm con P600', false),
  ('b1000001-0001-0001-0004-000000000008', 4, 'No back sanding needed — just prime over the edge', 'Pas de ponçage — juste apprêter par-dessus', 'No se necesita lijar — solo imprimar sobre el borde', false);


-- ═══════════════════════════════════════════════════════════════
-- QUIZ 5: Plastic & Substrate Preparation
-- ═══════════════════════════════════════════════════════════════

INSERT INTO public.quizzes (id, slug, title_en, title_fr, title_es, description_en, description_fr, description_es, quiz_type, passing_score, icon)
VALUES (
  'a1000001-0001-0001-0001-000000000005',
  'plastic-substrate-prep',
  'Plastic & Substrate Prep', 'Préparation plastique et substrat', 'Preparación de plástico y sustrato',
  'Test your knowledge of plastic identification, adhesion promoters, and substrate preparation techniques',
  'Testez vos connaissances sur l''identification du plastique, les promoteurs d''adhérence et la préparation du substrat',
  'Pruebe su conocimiento de identificación de plástico, promotores de adhesión y técnicas de preparación de sustrato',
  'skill-check', 70, '🧩'
);

-- Q1: SU4901 purpose
INSERT INTO public.quiz_questions (id, quiz_id, question_order, question_text_en, question_text_fr, question_text_es, question_type, explanation_en, explanation_fr, explanation_es)
VALUES (
  'b1000001-0001-0001-0005-000000000001',
  'a1000001-0001-0001-0001-000000000005', 1,
  'What is the PPG SU4901 Clean and Scuff Pad used for?',
  'À quoi sert le tampon SU4901 de PPG?',
  '¿Para qué se usa la almohadilla SU4901 de PPG?',
  'multiple-choice',
  'SU4901 is used to scrub, clean, and de-gloss the plastic substrate before applying adhesion promoter.',
  'Le SU4901 sert à frotter, nettoyer et dépolir le substrat plastique.',
  'El SU4901 se usa para fregar, limpiar y desbrillir el sustrato plástico.'
);
INSERT INTO public.quiz_answers (question_id, answer_order, answer_text_en, answer_text_fr, answer_text_es, is_correct) VALUES
  ('b1000001-0001-0001-0005-000000000001', 1, 'Scrub, clean, and de-gloss the plastic substrate', 'Frotter, nettoyer et dépolir le substrat plastique', 'Fregar, limpiar y desbrillir el sustrato', true),
  ('b1000001-0001-0001-0005-000000000001', 2, 'Apply adhesion promoter', 'Appliquer le promoteur d''adhérence', 'Aplicar promotor de adhesión', false),
  ('b1000001-0001-0001-0005-000000000001', 3, 'Final polish after clearcoat', 'Polissage final après vernis', 'Pulido final después del barniz', false),
  ('b1000001-0001-0001-0005-000000000001', 4, 'Remove orange peel from paint', 'Enlever la peau d''orange de la peinture', 'Eliminar la cáscara de naranja', false);

-- Q2: SU470LV dry time (updated from SU4902 — SU470LV is the current 1K adhesion promoter)
INSERT INTO public.quiz_questions (id, quiz_id, question_order, question_text_en, question_text_fr, question_text_es, question_type, explanation_en, explanation_fr, explanation_es)
VALUES (
  'b1000001-0001-0001-0005-000000000002',
  'a1000001-0001-0001-0001-000000000005', 2,
  'How long should PPG SU470LV 1K Adhesion Promoter dry before top coating at 70°F (21°C)?',
  'Combien de temps le SU470LV doit-il sécher avant d''appliquer la couche suivante à 70°F (21°C)?',
  '¿Cuánto tiempo debe secarse el SU470LV antes de aplicar la capa siguiente a 70°F (21°C)?',
  'multiple-choice',
  'PPG TDS OC-35: SU470LV requires 10 minutes dry time at 70°F (21°C) before top coating. Apply 1 medium wet coat — ready to spray, no mixing required. If more than 1 hour passes, lightly sand, re-clean, and reapply.',
  'TDS PPG OC-35: Le SU470LV nécessite 10 minutes de séchage à 70°F (21°C) avant la couche suivante. Appliquer 1 couche humide moyenne — prêt à pulvériser, aucun mélange requis. Si plus d''une heure, poncer légèrement, re-nettoyer et réappliquer.',
  'TDS PPG OC-35: El SU470LV requiere 10 minutos de secado a 70°F (21°C) antes de la capa siguiente. Aplicar 1 capa húmeda media — listo para rociar, sin mezcla requerida. Si pasa más de 1 hora, lijar ligeramente, limpiar y volver a aplicar.'
);
INSERT INTO public.quiz_answers (question_id, answer_order, answer_text_en, answer_text_fr, answer_text_es, is_correct) VALUES
  ('b1000001-0001-0001-0005-000000000002', 1, '10 minutes', '10 minutes', '10 minutos', true),
  ('b1000001-0001-0001-0005-000000000002', 2, '3-5 minutes', '3-5 minutes', '3-5 minutos', false),
  ('b1000001-0001-0001-0005-000000000002', 3, '30 minutes', '30 minutes', '30 minutos', false),
  ('b1000001-0001-0001-0005-000000000002', 4, 'No dry time — top coat immediately', 'Pas de séchage — appliquer immédiatement', 'Sin tiempo de secado — aplicar inmediatamente', false);

-- Q3: Pre-primed plastic sanding grit
INSERT INTO public.quiz_questions (id, quiz_id, question_order, question_text_en, question_text_fr, question_text_es, question_type, explanation_en, explanation_fr, explanation_es)
VALUES (
  'b1000001-0001-0001-0005-000000000003',
  'a1000001-0001-0001-0001-000000000005', 3,
  'What grit should you use to sand pre-primed plastic parts?',
  'Quel grain utiliser pour poncer les pièces plastiques pré-apprêtées?',
  '¿Qué grano debe usar para lijar piezas plásticas pre-imprimadas?',
  'multiple-choice',
  'PPG SOP: Sand pre-primed plastic with P400-P600 dry sandpaper by machine or by hand. Use grey scuff pad on edges.',
  'SOP PPG: Poncer avec P400-P600 à sec, utiliser un tampon gris sur les bords.',
  'SOP PPG: Lijar con P400-P600 en seco, usar almohadilla gris en bordes.'
);
INSERT INTO public.quiz_answers (question_id, answer_order, answer_text_en, answer_text_fr, answer_text_es, is_correct) VALUES
  ('b1000001-0001-0001-0005-000000000003', 1, 'P400-P600 dry, with grey scuff pad on edges', 'P400-P600 à sec, tampon gris sur les bords', 'P400-P600 en seco, almohadilla gris en bordes', true),
  ('b1000001-0001-0001-0005-000000000003', 2, 'P80-P120 wet', 'P80-P120 mouillé', 'P80-P120 húmedo', false),
  ('b1000001-0001-0001-0005-000000000003', 3, 'P1500-P2000 for a smooth finish', 'P1500-P2000 pour un fini lisse', 'P1500-P2000 para un acabado suave', false),
  ('b1000001-0001-0001-0005-000000000003', 4, 'No sanding needed — just clean and paint', 'Pas de ponçage — nettoyer et peindre', 'Sin lijar — limpiar y pintar', false);

-- Q4: SWX350
INSERT INTO public.quiz_questions (id, quiz_id, question_order, question_text_en, question_text_fr, question_text_es, question_type, explanation_en, explanation_fr, explanation_es)
VALUES (
  'b1000001-0001-0001-0005-000000000004',
  'a1000001-0001-0001-0001-000000000005', 4,
  'What is PPG SWX350 used for in the raw plastics procedure?',
  'À quoi sert le SWX350 de PPG dans la procédure des plastiques bruts?',
  '¿Para qué se usa el SWX350 de PPG en el procedimiento de plásticos crudos?',
  'multiple-choice',
  'SWX350 is a waterborne cleaner used to wash the substrate after scuffing and before adhesion promoter application.',
  'Le SWX350 est un nettoyant à l''eau utilisé pour laver le substrat.',
  'El SWX350 es un limpiador a base de agua usado para lavar el sustrato.'
);
INSERT INTO public.quiz_answers (question_id, answer_order, answer_text_en, answer_text_fr, answer_text_es, is_correct) VALUES
  ('b1000001-0001-0001-0005-000000000004', 1, 'Waterborne cleaner — to wash the substrate after scuffing', 'Nettoyant à l''eau — pour laver le substrat après le ponçage', 'Limpiador a base de agua — para lavar después del lijado', true),
  ('b1000001-0001-0001-0005-000000000004', 2, 'Adhesion promoter for bare metal', 'Promoteur d''adhérence pour métal nu', 'Promotor de adhesión para metal desnudo', false),
  ('b1000001-0001-0001-0005-000000000004', 3, 'Clearcoat additive for flexibility', 'Additif de vernis pour flexibilité', 'Aditivo de barniz para flexibilidad', false),
  ('b1000001-0001-0001-0005-000000000004', 4, 'Reducer for hot weather spraying', 'Diluant pour pulvérisation par temps chaud', 'Reductor para pulverización en clima caliente', false);

-- Q5: EPW115 max IR temperature
INSERT INTO public.quiz_questions (id, quiz_id, question_order, question_text_en, question_text_fr, question_text_es, question_type, explanation_en, explanation_fr, explanation_es)
VALUES (
  'b1000001-0001-0001-0005-000000000005',
  'a1000001-0001-0001-0001-000000000005', 5,
  'When using infrared to cure PPG EPW115 waterborne primer, what is the maximum metal temperature?',
  'Lors de l''utilisation de l''infrarouge pour le EPW115, quelle est la température maximale du métal?',
  'Al usar infrarrojo para curar el EPW115, ¿cuál es la temperatura máxima del metal?',
  'multiple-choice',
  'PPG SOP: Infrared can be used once flashed. Do not exceed 38°C / 100°F metal temperature.',
  'SOP PPG: L''infrarouge peut être utilisé une fois évaporé. Ne pas dépasser 38°C.',
  'SOP PPG: El infrarrojo puede usarse una vez evaporado. No exceder 38°C.'
);
INSERT INTO public.quiz_answers (question_id, answer_order, answer_text_en, answer_text_fr, answer_text_es, is_correct) VALUES
  ('b1000001-0001-0001-0005-000000000005', 1, '38°C / 100°F', '38°C / 100°F', '38°C / 100°F', true),
  ('b1000001-0001-0001-0005-000000000005', 2, '60°C / 140°F', '60°C / 140°F', '60°C / 140°F', false),
  ('b1000001-0001-0001-0005-000000000005', 3, '80°C / 176°F', '80°C / 176°F', '80°C / 176°F', false),
  ('b1000001-0001-0001-0005-000000000005', 4, 'No temperature limit with infrared', 'Pas de limite de température', 'Sin límite de temperatura', false);


-- ═══════════════════════════════════════════════════════════════
-- QUIZ 6: Environmental Compliance
-- ═══════════════════════════════════════════════════════════════

INSERT INTO public.quizzes (id, slug, title_en, title_fr, title_es, description_en, description_fr, description_es, quiz_type, passing_score, icon)
VALUES (
  'a1000001-0001-0001-0001-000000000006',
  'environmental-compliance',
  'Environmental Compliance', 'Conformité environnementale', 'Cumplimiento ambiental',
  'Test your knowledge of EPA regulations, VOC limits, waste disposal, and environmental compliance for body shops',
  'Testez vos connaissances des réglementations EPA, limites de COV et élimination des déchets',
  'Pruebe su conocimiento de regulaciones EPA, límites de COV y eliminación de desechos',
  'safety-certification', 70, '🌿'
);

-- Q1: VOC regulations
INSERT INTO public.quiz_questions (id, quiz_id, question_order, question_text_en, question_text_fr, question_text_es, question_type, explanation_en, explanation_fr, explanation_es)
VALUES (
  'b1000001-0001-0001-0006-000000000001',
  'a1000001-0001-0001-0001-000000000006', 1,
  'What does VOC stand for and why is it regulated in body shops?',
  'Que signifie COV et pourquoi est-il réglementé dans les ateliers?',
  '¿Qué significa COV y por qué está regulado en talleres?',
  'multiple-choice',
  'VOC = Volatile Organic Compounds. They contribute to smog and air pollution. EPA regulates them under 40 CFR 59 Subpart B.',
  'COV = Composés Organiques Volatils. Ils contribuent au smog.',
  'COV = Compuestos Orgánicos Volátiles. Contribuyen al smog.'
);
INSERT INTO public.quiz_answers (question_id, answer_order, answer_text_en, answer_text_fr, answer_text_es, is_correct) VALUES
  ('b1000001-0001-0001-0006-000000000001', 1, 'Volatile Organic Compounds — contribute to smog and air pollution', 'Composés Organiques Volatils — contribuent au smog', 'Compuestos Orgánicos Volátiles — contribuyen al smog', true),
  ('b1000001-0001-0001-0006-000000000001', 2, 'Vehicle Operating Costs — regulated for pricing transparency', 'Coûts d''exploitation des véhicules', 'Costos Operativos de Vehículos', false),
  ('b1000001-0001-0001-0006-000000000001', 3, 'Verified Original Colours — regulated for paint accuracy', 'Couleurs Originales Vérifiées', 'Colores Originales Verificados', false),
  ('b1000001-0001-0001-0006-000000000001', 4, 'Visual Output Calibration — regulated for spray booth lighting', 'Calibration visuelle de sortie', 'Calibración Visual de Salida', false);

-- Q2: Paint waste disposal
INSERT INTO public.quiz_questions (id, quiz_id, question_order, question_text_en, question_text_fr, question_text_es, question_type, explanation_en, explanation_fr, explanation_es)
VALUES (
  'b1000001-0001-0001-0006-000000000002',
  'a1000001-0001-0001-0001-000000000006', 2,
  'How should waste paint, solvents, and reducers be disposed of in a body shop?',
  'Comment les déchets de peinture, solvants et diluants doivent-ils être éliminés?',
  '¿Cómo deben eliminarse los residuos de pintura, solventes y reductores?',
  'multiple-choice',
  'Paint waste is hazardous waste under RCRA. It must be collected in proper containers, labeled, and disposed of through a licensed hazardous waste hauler.',
  'Les déchets de peinture sont des déchets dangereux sous le RCRA.',
  'Los residuos de pintura son desechos peligrosos bajo RCRA.'
);
INSERT INTO public.quiz_answers (question_id, answer_order, answer_text_en, answer_text_fr, answer_text_es, is_correct) VALUES
  ('b1000001-0001-0001-0006-000000000002', 1, 'Collected in labeled containers and disposed via licensed hazardous waste hauler', 'Collectés dans des conteneurs étiquetés et éliminés par transporteur agréé', 'Recolectados en contenedores etiquetados y eliminados por transportista autorizado', true),
  ('b1000001-0001-0001-0006-000000000002', 2, 'Poured down the drain with plenty of water', 'Versés dans les égouts avec beaucoup d''eau', 'Vertidos por el drenaje con mucha agua', false),
  ('b1000001-0001-0001-0006-000000000002', 3, 'Left to evaporate in open containers outside', 'Laissés s''évaporer dans des conteneurs ouverts dehors', 'Dejados evaporar en contenedores abiertos afuera', false),
  ('b1000001-0001-0001-0006-000000000002', 4, 'Mixed with regular shop trash for weekly pickup', 'Mélangés aux ordures normales', 'Mezclados con la basura normal', false);

-- Q3: 6H Rule
INSERT INTO public.quiz_questions (id, quiz_id, question_order, question_text_en, question_text_fr, question_text_es, question_type, explanation_en, explanation_fr, explanation_es)
VALUES (
  'b1000001-0001-0001-0006-000000000003',
  'a1000001-0001-0001-0001-000000000006', 3,
  'What is the EPA "6H Rule" (NESHAP) for auto body shops?',
  'Qu''est-ce que la règle "6H" (NESHAP) de l''EPA pour les ateliers?',
  '¿Qué es la regla "6H" (NESHAP) de la EPA para talleres?',
  'multiple-choice',
  'The 6H Rule (40 CFR 63 Subpart HHHHHH) requires auto body shops to use compliant spray guns (HVLP or equivalent), proper spray techniques, and maintain records.',
  'La règle 6H exige des pistolets conformes HVLP et des techniques appropriées.',
  'La regla 6H requiere pistolas compatibles HVLP y técnicas apropiadas.'
);
INSERT INTO public.quiz_answers (question_id, answer_order, answer_text_en, answer_text_fr, answer_text_es, is_correct) VALUES
  ('b1000001-0001-0001-0006-000000000003', 1, 'Requires HVLP-compliant spray guns, proper techniques, and record-keeping', 'Exige pistolets HVLP, techniques appropriées et tenue de registres', 'Requiere pistolas HVLP, técnicas apropiadas y registro', true),
  ('b1000001-0001-0001-0006-000000000003', 2, 'Limits shops to 6 hours of spraying per day', 'Limite les ateliers à 6 heures de pulvérisation par jour', 'Limita los talleres a 6 horas de pulverización por día', false),
  ('b1000001-0001-0001-0006-000000000003', 3, 'Requires 6 exhaust fans per spray booth', 'Exige 6 ventilateurs par cabine', 'Requiere 6 ventiladores por cabina', false),
  ('b1000001-0001-0001-0006-000000000003', 4, 'Only applies to shops painting more than 6 cars per week', 'Ne s''applique qu''aux ateliers peignant plus de 6 voitures par semaine', 'Solo aplica a talleres que pintan más de 6 autos por semana', false);

-- Q4: Spray booth filters
INSERT INTO public.quiz_questions (id, quiz_id, question_order, question_text_en, question_text_fr, question_text_es, question_type, explanation_en, explanation_fr, explanation_es)
VALUES (
  'b1000001-0001-0001-0006-000000000004',
  'a1000001-0001-0001-0001-000000000006', 4,
  'What is the minimum paint capture efficiency required for spray booth filters under EPA regulations?',
  'Quelle est l''efficacité minimale de capture requise pour les filtres de cabine?',
  '¿Cuál es la eficiencia mínima de captura requerida para los filtros de cabina?',
  'multiple-choice',
  'EPA requires a minimum 98% capture efficiency for particulate filters in spray booths to minimize paint overspray emissions.',
  'L''EPA exige une efficacité de capture minimale de 98%.',
  'La EPA requiere una eficiencia de captura mínima del 98%.'
);
INSERT INTO public.quiz_answers (question_id, answer_order, answer_text_en, answer_text_fr, answer_text_es, is_correct) VALUES
  ('b1000001-0001-0001-0006-000000000004', 1, '98% capture efficiency', '98% d''efficacité de capture', '98% de eficiencia de captura', true),
  ('b1000001-0001-0001-0006-000000000004', 2, '50% capture efficiency', '50% d''efficacité', '50% de eficiencia', false),
  ('b1000001-0001-0001-0006-000000000004', 3, '75% capture efficiency', '75% d''efficacité', '75% de eficiencia', false),
  ('b1000001-0001-0001-0006-000000000004', 4, 'No minimum — any filter will do', 'Pas de minimum — tout filtre convient', 'Sin mínimo — cualquier filtro sirve', false);

-- Q5: Waterborne vs solventborne
INSERT INTO public.quiz_questions (id, quiz_id, question_order, question_text_en, question_text_fr, question_text_es, question_type, explanation_en, explanation_fr, explanation_es)
VALUES (
  'b1000001-0001-0001-0006-000000000005',
  'a1000001-0001-0001-0001-000000000006', 5,
  'What is the primary environmental advantage of waterborne basecoats like PPG Envirobase?',
  'Quel est le principal avantage environnemental des bases à l''eau comme PPG Envirobase?',
  '¿Cuál es la principal ventaja ambiental de las bases a base de agua como PPG Envirobase?',
  'multiple-choice',
  'Waterborne basecoats significantly reduce VOC emissions compared to solventborne systems, helping shops comply with EPA air quality regulations.',
  'Les bases à l''eau réduisent significativement les émissions de COV.',
  'Las bases a base de agua reducen significativamente las emisiones de COV.'
);
INSERT INTO public.quiz_answers (question_id, answer_order, answer_text_en, answer_text_fr, answer_text_es, is_correct) VALUES
  ('b1000001-0001-0001-0006-000000000005', 1, 'Significantly lower VOC emissions for air quality compliance', 'Émissions de COV significativement plus faibles', 'Emisiones de COV significativamente más bajas', true),
  ('b1000001-0001-0001-0006-000000000005', 2, 'Cheaper to purchase than solventborne', 'Moins cher que le solvant', 'Más barato que el solvente', false),
  ('b1000001-0001-0001-0006-000000000005', 3, 'Faster drying time in all conditions', 'Séchage plus rapide dans toutes les conditions', 'Secado más rápido en todas las condiciones', false),
  ('b1000001-0001-0001-0006-000000000005', 4, 'No environmental advantage — just a different formula', 'Pas d''avantage — juste une formule différente', 'Sin ventaja — solo una fórmula diferente', false);


-- ═══════════════════════════════════════════════════════════════
-- VERIFY
-- ═══════════════════════════════════════════════════════════════
SELECT 'Total quizzes now: ' || COUNT(*) FROM public.quizzes;
SELECT 'Total questions now: ' || COUNT(*) FROM public.quiz_questions;
SELECT 'Total answers now: ' || COUNT(*) FROM public.quiz_answers;
