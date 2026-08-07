const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const projectRoot = path.resolve(__dirname, '..');
const gameSource = fs.readFileSync(path.join(projectRoot, 'games/wildlings-ar/game.js'), 'utf8');
const gameMarkup = fs.readFileSync(path.join(projectRoot, 'games/wildlings-ar/index.html'), 'utf8');
const gameStyles = fs.readFileSync(path.join(projectRoot, 'games/wildlings-ar/style.css'), 'utf8');
const definitions = `${gameSource.split('const $=')[0]}\n;globalThis.wildlings={CREATURES,ADDITIONAL_CREATURES,NEW_CREATURES,SPECIFIC_CLUES,SPECIES_LABELS,FLOWER_CLUES,FLOWER_TARGETS,REFINEMENT_TARGETS_BY_PARENT};`;
const context = {};

vm.createContext(context);
vm.runInContext(definitions, context);

const { CREATURES, ADDITIONAL_CREATURES, NEW_CREATURES, SPECIFIC_CLUES, SPECIES_LABELS, FLOWER_CLUES, FLOWER_TARGETS, REFINEMENT_TARGETS_BY_PARENT } = context.wildlings;
assert.equal(CREATURES.length, 105, 'Wildlings should have 105 creatures');
assert.equal(ADDITIONAL_CREATURES.length, 75, 'Wildlings should have 75 additional creatures');
assert.equal(NEW_CREATURES.length, 6, 'Wildlings should have six new creature species');
assert.equal(new Set(CREATURES.map(creature => creature.id)).size, CREATURES.length, 'Creature IDs must be unique');
assert.equal(new Set(CREATURES.map(creature => creature.name)).size, CREATURES.length, 'Creature names must be unique');
assert.equal(new Set(CREATURES.map(creature => creature.clue)).size, CREATURES.length, 'Every creature must have a different real-world clue');
assert.equal(SPECIFIC_CLUES.length, 81, 'Every added creature should define an exact clue');
assert.equal(new Set(SPECIFIC_CLUES.map(item => item.label)).size, 81, 'Exact clue labels must be unique');

for (const creature of CREATURES) {
  assert.ok(SPECIES_LABELS[creature.clue], `Missing species label for ${creature.id}`);
  assert.ok(
    fs.existsSync(path.join(projectRoot, `games/wildlings-ar/assets/creatures/${creature.id}.png`)),
    `Missing sprite for ${creature.id}`,
  );
}
const spriteHashes = CREATURES.map(creature => crypto.createHash('sha256').update(
  fs.readFileSync(path.join(projectRoot, `games/wildlings-ar/assets/creatures/${creature.id}.png`)),
).digest('hex'));
assert.equal(new Set(spriteHashes).size, CREATURES.length, 'Every creature must have different artwork bytes');
for (const creature of [...ADDITIONAL_CREATURES, ...NEW_CREATURES]) {
  assert.equal('sprite' in creature, false, `${creature.id} must not reuse another creature sprite`);
  assert.equal('artFilter' in creature, false, `${creature.id} must not be a color-filtered variant`);
  assert.ok(Object.values(REFINEMENT_TARGETS_BY_PARENT).flat().some(target => target.clue === creature.clue), `Missing camera refinement for ${creature.clue}`);
  assert.equal(Object.values(REFINEMENT_TARGETS_BY_PARENT).flat().filter(target => target.clue === creature.clue).length, 2, `Expected two exact camera descriptions for ${creature.clue}`);
}

const flowerCreatures = CREATURES.filter(creature => FLOWER_CLUES.has(creature.clue));
assert.equal(flowerCreatures.length, 8, 'Wildlings should have eight flower species');
for (const creature of flowerCreatures) {
  assert.ok(FLOWER_TARGETS.some(target => target.clue === creature.clue), `Missing flower detector for ${creature.clue}`);
}

assert.match(gameSource, /function startCatch\(\)/, 'Missing catch start logic');
assert.match(gameSource, /function attemptCatch\(\)/, 'Missing catch tap logic');
assert.match(gameSource, /function escapeCatch\(\)/, 'Missing creature escape logic');
assert.match(gameSource, /function dodgeCatch\(time\)/, 'Missing chase dodge logic');
assert.match(gameSource, /function collectCatchBoost\(\)/, 'Missing chase calm-leaf boost');
assert.match(gameMarkup, /id="catch-progress"/, 'Missing catch progress interface');
assert.match(gameMarkup, /id="catch-meter"/, 'Missing chase timer meter');
assert.match(gameMarkup, /id="chase-boost"/, 'Missing chase boost control');
assert.match(gameMarkup, /id="befriend"[^>]*>♥<\/button>/, 'Missing post-catch friendship control');
assert.match(gameStyles, /@keyframes scamper/, 'Missing running animation');
assert.match(gameStyles, /\.chase-trail/, 'Missing chase movement trails');
assert.match(gameSource, /function handleWalkPosition\(position\)/, 'Missing walking distance logic');
assert.match(gameSource, /function pickGroupedVisionTarget\(/, 'Missing grouped flower classifier');
assert.match(gameSource, /Xenova\/clip-vit-base-patch16/, 'Missing precision patch-16 camera model');
assert.match(gameSource, /state\.stableHits>=requiredVisionMatches\(\)&&state\.stableViewCount>=2/, 'Missing multi-view camera consensus');
assert.match(gameSource, /function frameMotion\(/, 'Missing camera movement rejection');
assert.match(gameSource, /async function takeNaturePhoto\(/, 'Missing still-photo identification flow');
assert.match(gameSource, /for\(const view of CAMERA_VIEWS\)/, 'Photo identification must inspect every crop view');
assert.match(gameMarkup, /id="capture-photo"/, 'Missing camera shutter control');
assert.match(gameMarkup, /id="photo-preview"/, 'Missing frozen photo preview');
assert.match(gameMarkup, /id="refocus-camera"/, 'Missing camera refocus control');
assert.match(gameMarkup, /id="walk-chip"/, 'Missing walking companion interface');
assert.match(gameMarkup, /id="guide-search"/, 'Missing searchable field guide');

console.log(`Wildlings smoke test passed: ${CREATURES.length} creatures with ${CREATURES.length} different clues, six new species, boosted chase and walking ready.`);
