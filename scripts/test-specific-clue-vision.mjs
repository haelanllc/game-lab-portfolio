import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { pipeline, RawImage } from '@huggingface/transformers';

const projectRoot=path.resolve(import.meta.dirname,'..');
const gameSource=fs.readFileSync(path.join(projectRoot,'games/wildlings-ar/game.js'),'utf8');
const context={};
vm.createContext(context);
vm.runInContext(`${gameSource.split('const $=')[0]};globalThis.targetGroups=REFINEMENT_TARGETS_BY_PARENT`,context);
const targetGroups=context.targetGroups;
const fixtures=process.argv.slice(2).map(argument=>{
  const [identity,filePath]=argument.split('=',2),[parent,expected]=identity.split(':',2);return{parent,expected,filePath:path.resolve(filePath||'')}
});

if(!fixtures.length)throw new Error('Pass fixtures as parent:exact-clue=/absolute/path.jpg');
for(const fixture of fixtures){
  assert.ok(targetGroups[fixture.parent],`Unknown parent clue: ${fixture.parent}`);
  assert.ok(targetGroups[fixture.parent].some(target=>target.clue===fixture.expected),`Unknown exact clue: ${fixture.expected}`);
  assert.ok(fs.existsSync(fixture.filePath),`Missing fixture: ${fixture.filePath}`);
}

const classify=await pipeline('zero-shot-image-classification','Xenova/clip-vit-base-patch32',{dtype:'q8'});
let correct=0;
for(const fixture of fixtures){
  const targets=targetGroups[fixture.parent],image=await RawImage.read(fixture.filePath),results=await classify(image,targets.map(target=>target.label),{hypothesis_template:'The exact outdoor object in the center is {}.'}),ranked=results.map(result=>({...result,clue:targets.find(target=>target.label===result.label)?.clue})),best=ranked[0],runner=ranked[1],margin=best.score-(runner?.score||0),dominance=best.score/Math.max(.001,runner?.score||0),accepted=best.score>=.16&&margin>=.02&&dominance>=1.12;
  if(accepted&&best.clue===fixture.expected)correct++;
  console.log(`${path.basename(fixture.filePath)}: expected ${fixture.expected}, saw ${accepted?best.clue:'uncertain'}; top ${ranked.slice(0,3).map(item=>`${item.clue} ${(item.score*100).toFixed(1)}%`).join(', ')}`);
}
assert.equal(correct,fixtures.length,`${correct} of ${fixtures.length} exact-clue fixtures classified correctly`);
console.log(`Exact-clue vision test passed: ${correct} of ${fixtures.length} real photos classified correctly.`);
