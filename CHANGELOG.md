# Changelog

## 2026-08-06

- Expanded Wildlings AR to 105 creatures with six individually generated, separately isolated species: Quillkip, Craggle, Podkin, Bramblebum, Tide Twig, and Dewloom.
- Added six new camera clue categories—feather, lichen, seed pod, berry, driftwood, and spiderweb—with exact guide labels and dedicated clue transformations.
- Turned the three-tap catch into a fuller chase with timed dodges, motion trails, a visible countdown meter, two optional golden calm-leaf boosts, speed ramps after each tap, and performance-based catch ratings.
- Upgraded Wildlings AR from the patch-32 Nature Lens to a finer patch-16 vision model and verified it against real poppy, snapdragon, granite, quartz, and jasper photos.
- Added two exact visual descriptions per collectible clue, prompt-group averaging, and tuned botanical descriptions that cleanly separate real poppies from real snapdragons in the camera benchmark.
- Replaced the single fixed crop with tight, natural, and context views; a reveal now requires four agreeing readings across at least two views instead of trusting one framing.
- Added rapid frame-to-frame movement rejection, clearer match-and-view evidence in the camera HUD, and a manual refocus control for supported phone cameras.
- Added a tactile Take Photo shutter: it freezes the camera frame, identifies the centered object from three crop sizes, accepts two agreeing views, and offers a no-guess Retake state when the photo is unclear.

## 2026-08-04

- Reassigned the complete 99-creature roster to 99 different real-world clues instead of reusing broad labels like Leaf, Rock, or Flower across multiple profiles.
- Added a two-stage object lens: broad recognition stays fast on phones, then a smaller exact-clue pass distinguishes targets such as granite, quartz, slate, jasper, and marble without comparing all 99 at once.
- Added a repeatable exact-clue camera test that runs the production model and confidence rules against labeled real-world reference photos.

## 2026-08-03

- Expanded Wildlings AR to 99 collectible creatures with 75 individually illustrated additions across 15 nature species, plus guide search and permanent species clues.
- Replaced the first-pass recolor system with 75 separate creature sprites and distinct silhouettes, anatomy, nature features, and cheerful expressions; removed the regional-form labels entirely.
- Added a pinned local Pillow manifest and repeatable sprite-preparation command for chroma-key removal and mobile-sized transparent exports.
- Added walking companions: choose any befriended Wildling, keep the game open during a real walk, and gain one saved level for every 250 meters while retaining only cumulative distance—not the route.
- Reworked flower identification around multiple shape-specific descriptions per species, including a stricter poppy-versus-snapdragon check that asks for a clearer view instead of making a close guess.
- Added a repeatable real-photo flower-vision test command using the same pinned on-device classification package as the game.
- Added a three-tap creature chase after every reveal: Wildlings scamper around the camera view, can escape after 15 seconds, and only become available to befriend after being caught.
- Expanded Wildlings AR from 18 to 24 creatures with six cheerful flower species: rose, daisy, poppy, bluebell, lotus, and snapdragon.
- Added a permanent species clue beneath every field-guide profile, including undiscovered creatures, so players always know which real-world object to seek.
- Improved Nature Lens with broad-object recognition followed by a flower-specific classification pass and a four-of-five rolling consensus that tolerates one uncertain camera frame without making a wrong reveal.

## 2026-08-02

- Added Wildlings AR, an outdoor camera game with 18 collectible creatures, device-orientation scanning, location-seeded local populations, clue-to-creature transformations, and a persistent field guide.
- Added a no-camera demo field, mouse/keyboard look controls, on-device privacy language, and camera/motion/location permission fallbacks.
- Upgraded Wildlings with an on-device Nature Lens that classifies real leaves, rocks, flowers, bark, moss, pinecones, acorns, mushrooms, and water in the center camera crop before revealing a matching creature.
- Replaced the placeholder creature drawings with 18 generated transparent sprites blending Fossil Fury's pulp-comic texture with Clash of Critters' chunky, competitive mobile-battler energy.
- Revised the full Wildlings roster to remove angry or frowning expressions and replaced the fairy-like Dandy Drift with a cheerful, non-humanoid dandelion puff creature.
- Recut all 18 Wildlings with creature-specific isolation boxes so profile art no longer includes fragments of neighboring sprites.
- Aligned Nature Lens analysis to the visible object zone, added lighting and focus checks, expanded recognition to every field-guide clue, and required four consistent classifications before a creature reveal.

## 2026-07-21

- Added Game Lab+, a code-gated shelf for original and experimental games.
- Added a persistent homepage entry point, responsive access screen, session unlock, and explicit relock control.
- Curated Game Lab+ down to eight finished, high-signal games so the shelf represents the lab’s best work.
- Added Fossil Fury to Game Lab+: a hosted four-player dinosaur race with difficult trivia gates and collectible rarity crates.
- Promoted Game Lab+ into the homepage’s main attraction and removed every Plus title from the public game grid.
