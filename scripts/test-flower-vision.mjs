import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { pipeline, RawImage } from '@huggingface/transformers';

const projectRoot=path.resolve(import.meta.dirname,'..');
const gameSource=fs.readFileSync(path.join(projectRoot,'games/wildlings-ar/game.js'),'utf8');
const context={};
vm.createContext(context);
vm.runInContext(`${gameSource.split('const $=')[0]};globalThis.targets=FLOWER_TARGETS`,context);
const targets=context.targets;
const fixtures=process.argv.slice(2).map(argument=>{
  const [expected,filePath]=argument.split('=',2);return{expected,filePath:path.resolve(filePath||'')}
});

if(!fixtures.length)throw new Error('Pass fixtures as species=/absolute/path.jpg');
for(const fixture of fixtures)assert.ok(fs.existsSync(fixture.filePath),`Missing fixture: ${fixture.filePath}`);

function groupResults(results){
  const groups=new Map();
  for(const result of results){const target=targets.find(item=>item.label===result.label),key=target?.clue||'other';groups.set(key,(groups.get(key)||0)+result.score)}
  return [...groups.entries()].sort((a,b)=>b[1]-a[1]);
}

const classify=await pipeline('zero-shot-image-classification','Xenova/clip-vit-base-patch32',{dtype:'q8'});
let correct=0;
for(const fixture of fixtures){
  const image=await RawImage.read(fixture.filePath),results=await classify(image,targets.map(target=>target.label),{hypothesis_template:'The flower in the center is {}.'}),ranked=groupResults(results),winner=ranked[0][0];
  if(winner===fixture.expected)correct++;
  console.log(`${path.basename(fixture.filePath)}: expected ${fixture.expected}, saw ${winner}; top groups ${ranked.slice(0,3).map(([clue,score])=>`${clue} ${(score*100).toFixed(1)}%`).join(', ')}`);
}
assert.equal(correct,fixtures.length,`${correct} of ${fixtures.length} flower fixtures classified correctly`);
console.log(`Flower vision test passed: ${correct} of ${fixtures.length} real photos classified correctly.`);
