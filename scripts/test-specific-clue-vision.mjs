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

const model=process.env.WILDLINGS_VISION_MODEL||'Xenova/clip-vit-base-patch16';
console.log(`Using ${model}`);
const classify=await pipeline('zero-shot-image-classification',model,{dtype:'q8'});
function groupResults(results,targets){
  const groups=new Map();
  for(const result of results){const target=targets.find(item=>item.label===result.label),key=target?.clue||'other',group=groups.get(key)||{total:0,count:0};group.total+=result.score;group.count+=1;groups.set(key,group)}
  const means=[...groups.entries()].map(([clue,group])=>[clue,group.total/group.count]),total=means.reduce((sum,[,score])=>sum+score,0)||1;
  return means.map(([clue,score])=>[clue,score/total]).sort((a,b)=>b[1]-a[1]);
}
let correct=0;
for(const fixture of fixtures){
  const targets=targetGroups[fixture.parent],image=await RawImage.read(fixture.filePath),results=await classify(image,targets.map(target=>target.label),{hypothesis_template:'The exact outdoor object in the center is {}.'}),ranked=groupResults(results,targets),[bestClue,bestScore]=ranked[0],[,runnerScore]=ranked[1]||['other',0],margin=bestScore-runnerScore,dominance=bestScore/Math.max(.001,runnerScore),accepted=bestScore>=.1&&margin>=.025&&dominance>=1.12;
  if(accepted&&bestClue===fixture.expected)correct++;
  console.log(`${path.basename(fixture.filePath)}: expected ${fixture.expected}, saw ${accepted?bestClue:'uncertain'}; top ${ranked.slice(0,3).map(([clue,score])=>`${clue} ${(score*100).toFixed(1)}%`).join(', ')}`);
}
assert.equal(correct,fixtures.length,`${correct} of ${fixtures.length} exact-clue fixtures classified correctly`);
console.log(`Exact-clue vision test passed: ${correct} of ${fixtures.length} real photos classified correctly.`);
