-- ═══════════════════════════════════════════════════════════════
-- PPG MagicMix — Smart Product Selection Software
-- Run in Supabase SQL Editor
-- ═══════════════════════════════════════════════════════════════

INSERT INTO public.documents (title, description, doc_type, tab_slug, tags, metadata) VALUES (
  'PPG MagicMix — Smart Product Selection Software',
  'PPG MagicMix software within Linq Color that works with MagicBox mixing room solution and wireless MagicSensor temperature/humidity devices to recommend the most effective products, hardeners, and thinners/reducers based on real-time environmental conditions and repair type.',
  'tech_sheet',
  'painting',
  ARRAY['ppg', 'MagicMix', 'Linq', 'MagicBox', 'MagicSensor', 'temperature', 'humidity', 'product selection', 'hardener', 'thinner', 'reducer', 'undercoat', 'clearcoat', 'digital', 'wireless', 'environmental conditions'],
  '{"full_content": "PPG MagicMix — Smart. Simple. Magical.\n\nFind the right products for the job, rain or shine.\n\nPPG MagicMix is the latest addition to PPG Linq Color software. Working seamlessly with the PPG MagicBox mixing room solution and wireless PPG MagicSensor temperature and humidity sensing devices, PPG MagicMix displays the most effective products and combinations of hardener and thinner/reducer for current environmental conditions and type of repair.\n\nFEATURES:\n• Temperature and humidity within the application area shown in real time\n• Suitable for undercoats, color and clearcoats\n• Works for all sizes of repair\n• No additional computer hardware required\n• Integrated with existing PPG Linq Color setup and preferences\n• Compatible with tools in the PPG Linq digital ecosystem\n• Quick, easy and intuitive to use\n• Works with PPG MagicBox and PPG MagicSensor devices, certified and safe for bodyshop environment\n\nBENEFITS:\n• Increased productivity — Painters no longer need to spend extra time choosing the most appropriate products\n• Fewer reworks — Access the most appropriate product information in just a few clicks, ensuring right the first time results and significantly reducing rework\n• Reduce corrections and polishing time — Reduces time required for correcting defects and polishing\n• Improved painter experience — Painters of all skill levels can be confident using the right products, even in critical conditions, reducing stress and boosting motivation and performance\n• Increased car owner satisfaction — Achieve professional, long-lasting finish and boost car owner loyalty\n\nSource: PPG Industries — ppgrefinish.com"}'::jsonb
);

INSERT INTO public.document_chunks (document_id, chunk_index, content, metadata)
SELECT id, 0,
  'PPG MagicMix smart product selection software in Linq Color. Works with PPG MagicBox mixing room solution and wireless PPG MagicSensor temperature humidity sensing devices. Displays most effective products and combinations of hardener and thinner/reducer for current environmental conditions and type of repair. Real-time temperature and humidity shown. Suitable for undercoats color and clearcoats, all sizes of repair. No additional computer hardware required. Integrated with existing Linq Color setup. Benefits: increased productivity no extra time choosing products, fewer reworks right first time results, reduce corrections and polishing time, improved painter experience for all skill levels even in critical conditions, increased car owner satisfaction with professional long-lasting finish.',
  '{"source": "PPG MagicMix", "type": "tech_sheet", "category": "digital tools"}'::jsonb
FROM public.documents WHERE title = 'PPG MagicMix — Smart Product Selection Software';

-- VERIFY
SELECT 'MagicMix document: ' || COUNT(*) FROM public.documents WHERE title LIKE '%MagicMix%';
SELECT 'MagicMix chunks: ' || COUNT(*) FROM public.document_chunks dc JOIN public.documents d ON dc.document_id = d.id WHERE d.title LIKE '%MagicMix%';
