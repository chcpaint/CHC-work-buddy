-- Migration 004: Update SU4902 → SU470LV
-- PPG SU470LV / SUA470LV is the current 1K Compliant Adhesion Promoter
-- Replaces the older SU4902 Plastic Adhesion Prep
-- Source: PPG Technical Data Sheet OC-35

-- ═══════════════════════════════════════════════════════════
-- 1. Update Quiz Question (Plastic & Substrate Prep — Q2)
-- ═══════════════════════════════════════════════════════════

UPDATE public.quiz_questions SET
  question_text_en = 'How long should PPG SU470LV 1K Adhesion Promoter dry before top coating at 70°F (21°C)?',
  question_text_fr = 'Combien de temps le SU470LV doit-il sécher avant d''appliquer la couche suivante à 70°F (21°C)?',
  question_text_es = '¿Cuánto tiempo debe secarse el SU470LV antes de aplicar la capa siguiente a 70°F (21°C)?',
  explanation_en = 'PPG TDS OC-35: SU470LV requires 10 minutes dry time at 70°F (21°C) before top coating. Apply 1 medium wet coat — ready to spray, no mixing required. If more than 1 hour passes, lightly sand, re-clean, and reapply.',
  explanation_fr = 'TDS PPG OC-35: Le SU470LV nécessite 10 minutes de séchage à 70°F (21°C) avant la couche suivante. Appliquer 1 couche humide moyenne — prêt à pulvériser, aucun mélange requis. Si plus d''une heure, poncer légèrement, re-nettoyer et réappliquer.',
  explanation_es = 'TDS PPG OC-35: El SU470LV requiere 10 minutos de secado a 70°F (21°C) antes de la capa siguiente. Aplicar 1 capa húmeda media — listo para rociar, sin mezcla requerida. Si pasa más de 1 hora, lijar ligeramente, limpiar y volver a aplicar.'
WHERE id = 'b1000001-0001-0001-0005-000000000002';

-- Update answer options: correct answer is now 10 minutes (not 3-5)
DELETE FROM public.quiz_answers WHERE question_id = 'b1000001-0001-0001-0005-000000000002';
INSERT INTO public.quiz_answers (question_id, answer_order, answer_text_en, answer_text_fr, answer_text_es, is_correct) VALUES
  ('b1000001-0001-0001-0005-000000000002', 1, '10 minutes', '10 minutes', '10 minutos', true),
  ('b1000001-0001-0001-0005-000000000002', 2, '3-5 minutes', '3-5 minutes', '3-5 minutos', false),
  ('b1000001-0001-0001-0005-000000000002', 3, '30 minutes', '30 minutes', '30 minutos', false),
  ('b1000001-0001-0001-0005-000000000002', 4, 'No dry time — top coat immediately', 'Pas de séchage — appliquer immédiatement', 'Sin tiempo de secado — aplicar inmediatamente', false);

-- ═══════════════════════════════════════════════════════════
-- 2. Add SU470LV Technical Data Document to Knowledge Base
-- ═══════════════════════════════════════════════════════════

INSERT INTO public.documents (
  id, title, content, category, subcategory, language, metadata
) VALUES (
  gen_random_uuid(),
  'PPG SU470LV / SUA470LV — OneChoice 1K Compliant Adhesion Promoter (TDS OC-35)',
  E'# PPG OneChoice SU470LV / SUA470LV — 1K Compliant Adhesion Promoter\n\n' ||
  E'## Product Description\n' ||
  E'SU470LV (National Rule) and SUA470LV (SCAQMD Compliant) are single-component (1K) adhesion promoters for use on properly prepared OEM and aftermarket plastic parts including TPO, PP, EPDM, Noryl, ABS, SMC, and fiberglass. Replaces the older two-component SU4902 system.\n\n' ||
  E'## Key Advantages\n' ||
  E'- Ready to spray — no mixing, reducing, or catalyst required\n' ||
  E'- Indefinite pot life (single component)\n' ||
  E'- 1K formula reduces waste and simplifies inventory\n' ||
  E'- VOC Compliant: SU470LV ≤4.4 lbs/gal, SUA470LV ≤2.1 lbs/gal\n\n' ||
  E'## Surface Preparation\n' ||
  E'1. Clean surface with SWX350, SX103/SXA103, or SX394\n' ||
  E'2. Scuff with SU4901 Clean & Scuff Pad or SX1002 Sanding Paste\n' ||
  E'3. Re-clean with SWX350 or SX103/SXA103\n' ||
  E'4. Blow off with filtered compressed air or tack cloth\n\n' ||
  E'## Application\n' ||
  E'- Apply 1 medium wet coat\n' ||
  E'- Spray gun setup: Fluid tip 1.3–1.5 mm\n' ||
  E'- HVLP pressure: 8–10 PSI at the cap\n' ||
  E'- Compliant gun pressure: 29–40 PSI\n' ||
  E'- Coverage: approx. 700 sq ft per gallon\n\n' ||
  E'## Dry Time\n' ||
  E'- 10 minutes at 70°F (21°C) before applying topcoat\n' ||
  E'- If more than 1 hour has passed, lightly sand, re-clean, and reapply\n\n' ||
  E'## Critical Notes\n' ||
  E'- Do NOT directly topcoat with Envirobase HP or Aquabase Plus waterborne basecoats — a sealer coat is required first\n' ||
  E'- Compatible topcoat systems: Deltron 2000, Envirobase HP (with sealer), Global Refinish System, Aquabase Plus (with sealer), Concept, Nexa Autocolor\n' ||
  E'- Store at 60–80°F (16–27°C). Do not freeze.\n' ||
  E'- Shelf life: refer to product label for expiration date\n\n' ||
  E'## Packaging\n' ||
  E'- SU470LV: Quart, Gallon\n' ||
  E'- SUA470LV: Quart, Gallon',
  'products',
  'adhesion-promoter',
  'en',
  '{"source": "PPG TDS OC-35", "product_code": "SU470LV", "replaces": "SU4902", "type": "technical-data-sheet", "manufacturer": "PPG Industries"}'::jsonb
),
(
  gen_random_uuid(),
  'PPG SU470LV / SUA470LV — Promoteur d''adhérence 1K conforme OneChoice (TDS OC-35)',
  E'# PPG OneChoice SU470LV / SUA470LV — Promoteur d''adhérence 1K conforme\n\n' ||
  E'## Description du produit\n' ||
  E'SU470LV (règle nationale) et SUA470LV (conforme SCAQMD) sont des promoteurs d''adhérence monocomposants (1K) pour les pièces plastiques OEM et de rechange correctement préparées, incluant TPO, PP, EPDM, Noryl, ABS, SMC et fibre de verre. Remplace l''ancien système bicomposant SU4902.\n\n' ||
  E'## Avantages clés\n' ||
  E'- Prêt à pulvériser — aucun mélange, réduction ou catalyseur requis\n' ||
  E'- Durée de vie en pot indéfinie (monocomposant)\n' ||
  E'- Formule 1K réduit les déchets et simplifie l''inventaire\n\n' ||
  E'## Préparation de surface\n' ||
  E'1. Nettoyer avec SWX350, SX103/SXA103 ou SX394\n' ||
  E'2. Frotter avec SU4901 Clean & Scuff Pad ou SX1002\n' ||
  E'3. Re-nettoyer avec SWX350 ou SX103/SXA103\n' ||
  E'4. Souffler avec air comprimé filtré\n\n' ||
  E'## Application\n' ||
  E'- Appliquer 1 couche humide moyenne\n' ||
  E'- Buse: 1,3–1,5 mm\n' ||
  E'- HVLP: 8–10 PSI au chapeau d''air\n\n' ||
  E'## Temps de séchage\n' ||
  E'- 10 minutes à 70°F (21°C) avant d''appliquer la couche suivante\n' ||
  E'- Si plus d''une heure, poncer légèrement, re-nettoyer et réappliquer\n\n' ||
  E'## Notes importantes\n' ||
  E'- Ne PAS appliquer directement Envirobase HP ou Aquabase Plus — un scellant est requis\n' ||
  E'- Systèmes compatibles: Deltron 2000, Envirobase HP (avec scellant), GRS, Aquabase Plus (avec scellant), Concept, Nexa Autocolor',
  'products',
  'adhesion-promoter',
  'fr',
  '{"source": "PPG TDS OC-35", "product_code": "SU470LV", "replaces": "SU4902", "type": "technical-data-sheet", "manufacturer": "PPG Industries"}'::jsonb
),
(
  gen_random_uuid(),
  'PPG SU470LV / SUA470LV — Promotor de adhesión 1K OneChoice (TDS OC-35)',
  E'# PPG OneChoice SU470LV / SUA470LV — Promotor de adhesión 1K conforme\n\n' ||
  E'## Descripción del producto\n' ||
  E'SU470LV (regla nacional) y SUA470LV (conforme SCAQMD) son promotores de adhesión monocomponentes (1K) para piezas plásticas OEM y de repuesto correctamente preparadas, incluyendo TPO, PP, EPDM, Noryl, ABS, SMC y fibra de vidrio. Reemplaza el antiguo sistema bicomponente SU4902.\n\n' ||
  E'## Ventajas clave\n' ||
  E'- Listo para rociar — no requiere mezcla, reducción ni catalizador\n' ||
  E'- Vida útil en el bote indefinida (monocomponente)\n' ||
  E'- Fórmula 1K reduce desperdicio y simplifica inventario\n\n' ||
  E'## Preparación de superficie\n' ||
  E'1. Limpiar con SWX350, SX103/SXA103 o SX394\n' ||
  E'2. Frotar con SU4901 Clean & Scuff Pad o SX1002\n' ||
  E'3. Re-limpiar con SWX350 o SX103/SXA103\n' ||
  E'4. Soplar con aire comprimido filtrado\n\n' ||
  E'## Aplicación\n' ||
  E'- Aplicar 1 capa húmeda media\n' ||
  E'- Boquilla: 1,3–1,5 mm\n' ||
  E'- HVLP: 8–10 PSI en la tapa de aire\n\n' ||
  E'## Tiempo de secado\n' ||
  E'- 10 minutos a 70°F (21°C) antes de aplicar la capa siguiente\n' ||
  E'- Si pasa más de 1 hora, lijar ligeramente, limpiar y volver a aplicar\n\n' ||
  E'## Notas importantes\n' ||
  E'- NO aplicar directamente Envirobase HP o Aquabase Plus — se requiere sellador\n' ||
  E'- Sistemas compatibles: Deltron 2000, Envirobase HP (con sellador), GRS, Aquabase Plus (con sellador), Concept, Nexa Autocolor',
  'products',
  'adhesion-promoter',
  'es',
  '{"source": "PPG TDS OC-35", "product_code": "SU470LV", "replaces": "SU4902", "type": "technical-data-sheet", "manufacturer": "PPG Industries"}'::jsonb
);
