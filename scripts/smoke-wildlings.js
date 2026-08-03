const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const projectRoot = path.resolve(__dirname, '..');
const gameSource = fs.readFileSync(path.join(projectRoot, 'games/wildlings-ar/game.js'), 'utf8');
const gameMarkup = fs.readFileSync(path.join(projectRoot, 'games/wildlings-ar/index.html'), 'utf8');
const gameStyles = fs.readFileSync(path.join(projectRoot, 'games/wildlings-ar/style.css'), 'utf8');
const definitions = `${gameSource.split('const $=')[0]}\n;globalThis.wildlings={CREATURES,SPECIES_LABELS,FLOWER_CLUES,FLOWER_TARGETS};`;
const context = {};

vm.createContext(context);
vm.runInContext(definitions, context);

const { CREATURES, SPECIES_LABELS, FLOWER_CLUES, FLOWER_TARGETS } = context.wildlings;
assert.equal(CREATURES.length, 24, 'Wildlings should have 24 creatures');
assert.equal(new Set(CREATURES.map(creature => creature.id)).size, CREATURES.length, 'Creature IDs must be unique');

for (const creature of CREATURES) {
  assert.ok(SPECIES_LABELS[creature.clue], `Missing species label for ${creature.id}`);
  assert.ok(
    fs.existsSync(path.join(projectRoot, `games/wildlings-ar/assets/creatures/${creature.id}.png`)),
    `Missing sprite for ${creature.id}`,
  );
}

const flowerCreatures = CREATURES.filter(creature => FLOWER_CLUES.has(creature.clue));
assert.equal(flowerCreatures.length, 8, 'Wildlings should have eight flower species');
for (const creature of flowerCreatures) {
  assert.ok(FLOWER_TARGETS.some(target => target.clue === creature.clue), `Missing flower detector for ${creature.clue}`);
}

assert.match(gameSource, /function startCatch\(\)/, 'Missing catch start logic');
assert.match(gameSource, /function attemptCatch\(\)/, 'Missing catch tap logic');
assert.match(gameSource, /function escapeCatch\(\)/, 'Missing creature escape logic');
assert.match(gameMarkup, /id="catch-progress"/, 'Missing catch progress interface');
assert.match(gameMarkup, /id="befriend"[^>]*>♥<\/button>/, 'Missing post-catch friendship control');
assert.match(gameStyles, /@keyframes scamper/, 'Missing running animation');

console.log(`Wildlings smoke test passed: ${CREATURES.length} creatures, ${flowerCreatures.length} flower species, catch chase ready.`);
