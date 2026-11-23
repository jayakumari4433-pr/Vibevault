-- ============================================================
-- VibeVault — catalog seed (real data the store needs to run).
-- Idempotent: safe to re-run. No fake orders/customers/reviews.
-- ============================================================

-- ---------- Vibes ----------
insert into public.vibes (slug, name, tagline, quote, emoji, blurb, sort_order) values
  ('girls', 'Girls',     'Soft · pastel · cute',     'it''s giving soft-girl era 🎀',       '🎀', 'Soft pinks and the cutest little surprises — a box that feels like a hug.', 1),
  ('boys',  'Boys',      'Cool · bold · street',     'lowkey iconic ⛓️',                    '🛹', 'Street-ready and cool, with a little bit of attitude.', 2),
  ('women', 'Women',     'Elegant · warm · refined', 'quiet luxury, loud confidence ✨',    '🌹', 'Elegant, warm-toned pieces that go from desk to dinner.', 3),
  ('men',   'Men',       'Minimal · sharp · clean',  'effortless, never trying 🖤',         '⚡', 'Minimal and clean. Sharp, simple, never too much.', 4),
  ('gamer', 'Gamer',     'Playful · night · fun',    'pov: your setup has drip now 🎮',     '🎮', 'Playful, fun accessories for the night-owl crowd.', 5),
  ('car',   'Car Lover', 'Bold · warm · fast',       'full send, always 🏎️',               '🏎️', 'Bold, warm-metal pieces for the ones who love the drive.', 6)
on conflict (slug) do update set
  name = excluded.name, tagline = excluded.tagline, quote = excluded.quote,
  emoji = excluded.emoji, blurb = excluded.blurb, sort_order = excluded.sort_order;

-- ---------- Colours ----------
insert into public.colours (id, label, swatch, sort_order) values
  ('blush',     'Blush pink',    '#e6a9a0', 1),
  ('lilac',     'Lilac',         '#c7a7d6', 2),
  ('sage',      'Sage green',    '#8aa177', 3),
  ('gold',      'Classic gold',  '#c6a24b', 4),
  ('rose-gold', 'Rose gold',     '#c88f78', 5),
  ('silver',    'Silver',        '#c7ccd1', 6),
  ('black',     'Classic black', '#2a2521', 7),
  ('pearl',     'Pearl white',   '#f3ece0', 8),
  ('pastel',    'Pastel mix',    'linear-gradient(90deg,#e6a9a0,#c7a7d6,#8aa177)', 9),
  ('surprise',  'Surprise me',   'linear-gradient(90deg,#c17a54,#c6a24b)', 10)
on conflict (id) do update set
  label = excluded.label, swatch = excluded.swatch, sort_order = excluded.sort_order;

-- ---------- Products (the box menu) ----------
insert into public.products (id, type, name, price, kicker, tagline, description, feelings, sort_order) values
  ('ring', 'ring', 'Ring Mystery Box', 149,
   'it''s giving main character',
   'A ring you didn''t pick, that somehow feels picked for you.',
   'Slip on a surprise. Tell us your vibe and colour, and we''ll match a ring to your mood — the kind you keep reaching for.',
   array['everyday','a little lucky','so you'], 1),

  ('pendant', 'pendant', 'Pendant Mystery Box', 199,
   'wear your mood',
   'Something to rest right over your heart.',
   'A pendant chosen to your vibe — soft, bold, cute or clean. The surprise is which one lands in your hands.',
   array['close to the heart','quietly special','gift-worthy'], 2),

  ('jewellery', 'jewellery', 'Jewellery Mystery Box', 249,
   'serotonin, delivered',
   'A little edit of surprises, matched to your vibe.',
   'Our most-loved box. Tell us who it''s for and the colour you love — we pack a feel-good mix and keep the rest a secret.',
   array['main-character','glow-up','treat-yourself'], 3),

  ('jewellery-plus', 'jewellery', 'Jewellery Box · Extra', 399,
   'go full spoil',
   'The whole feeling — a bigger hit of surprise.',
   'When you want the moment to last a little longer. Same secret magic, turned up — matched to your vibe and colour.',
   array['spoiled','all-out','your-sign'], 4),

  ('customize', 'customize', 'Customise Your Surprise', 70,
   'you set the vibe',
   'Your budget, your colour, your note — our surprise.',
   'Start from ₹70. Pick what it''s for — jewellery, a ring, a pendant, or something else entirely (a cup, a book, a pen… tell us). Add a colour and a little note about what you''re hoping for, and leave the surprise to us.',
   array['made-for-you','your-call','thoughtful'], 5)
on conflict (id) do update set
  type = excluded.type, name = excluded.name, price = excluded.price,
  kicker = excluded.kicker, tagline = excluded.tagline, description = excluded.description,
  feelings = excluded.feelings, sort_order = excluded.sort_order;

-- ---------- Quiz ----------
insert into public.quiz_questions (id, question, helper, options, sort_order) values
  ('mood', 'What are you in the mood for?',
   'No wrong answer — it just points us at the right little surprise.',
   '[
     {"id":"ring","label":"A ring","emoji":"💫","sub":"something for your hands","box":"ring"},
     {"id":"pendant","label":"Something at the heart","emoji":"🫧","sub":"a pendant to wear close","box":"pendant"},
     {"id":"mix","label":"A little mix","emoji":"🎀","sub":"our most-loved box","box":"jewellery"},
     {"id":"spoil","label":"Spoil me","emoji":"✨","sub":"the full feeling","box":"jewellery"},
     {"id":"custom","label":"My own thing","emoji":"🎁","sub":"I''ll set it up (from ₹70)","box":"customize"}
   ]'::jsonb, 1)
on conflict (id) do update set
  question = excluded.question, helper = excluded.helper,
  options = excluded.options, sort_order = excluded.sort_order;

-- ---------- Default settings ----------
insert into public.settings (key, value) values
  ('shipping', '{"free_above":249,"flat_rate":39}'::jsonb),
  ('payments', '{"cod_enabled":true}'::jsonb)
on conflict (key) do nothing;
