const BASE_CREATURES = [
  {id:'maple-mote',name:'Maple Mote',clue:'leaf',rarity:'Common',bio:'A tiny keeper of autumn color.',body:'#c85a39',belly:'#f0bc55',habitat:'woodland',form:'ears'},
  {id:'mosskin',name:'Mosskin',clue:'moss',rarity:'Common',bio:'Sleeps wherever the ground feels soft.',body:'#73905b',belly:'#c9d5a5',habitat:'woodland',form:'round'},
  {id:'pebble-pip',name:'Pebble Pip',clue:'stone',rarity:'Common',bio:'Collects the smallest stones for very serious reasons.',body:'#7f8b82',belly:'#d6d2bd',habitat:'urban',form:'ears'},
  {id:'dandy-drift',name:'Dandy Drift',clue:'dandelion',rarity:'Uncommon',bio:'Rides the breeze and never hurries home.',body:'#efe1a1',belly:'#fff7d4',habitat:'meadow',form:'round'},
  {id:'barkback',name:'Barkback',clue:'bark',rarity:'Common',bio:'Knows every old tree by its wrinkles.',body:'#745540',belly:'#cba77d',habitat:'woodland',form:'horns'},
  {id:'puddle-purl',name:'Puddle Purl',clue:'water',rarity:'Uncommon',bio:'Appears just after rain and leaves no footprints.',body:'#4e92a1',belly:'#a8d6d2',habitat:'wetland',form:'fins'},
  {id:'sunseed',name:'Sunseed',clue:'sunflower',rarity:'Common',bio:'Carries a pocket of warm afternoon light.',body:'#e3a82f',belly:'#fae7a3',habitat:'meadow',form:'round'},
  {id:'rosette-rumble',name:'Rosette Rumble',clue:'rose',rarity:'Uncommon',bio:'Tumbles through rose beds without bending a single thorn.',body:'#cf493d',belly:'#f3ab76',habitat:'meadow',form:'ears'},
  {id:'daisy-doodle',name:'Daisy Doodle',clue:'daisy',rarity:'Common',bio:'Draws sunny circles wherever the path feels lonely.',body:'#f4e9c8',belly:'#f2c347',habitat:'meadow',form:'round'},
  {id:'poppy-bop',name:'Poppy Bop',clue:'poppy',rarity:'Uncommon',bio:'Bounces once whenever a breeze crosses the field.',body:'#dd4f38',belly:'#49372d',habitat:'meadow',form:'round'},
  {id:'bluebell-bounce',name:'Bluebell Bounce',clue:'bluebell',rarity:'Rare',bio:'Rings a tiny blue note that only beetles can hear.',body:'#4e82c8',belly:'#b7d3df',habitat:'woodland',form:'ears'},
  {id:'lotus-loop',name:'Lotus Loop',clue:'lotus',rarity:'Rare',bio:'Glides in quiet circles at the edge of still water.',body:'#2d8c83',belly:'#f1d795',habitat:'wetland',form:'round'},
  {id:'snapdragon-sprout',name:'Snapdragon Sprout',clue:'snapdragon',rarity:'Rare',bio:'Looks dragon-sized to ants and treats them very kindly.',body:'#e69a2e',belly:'#f5d56d',habitat:'dry',form:'horns'},
  {id:'mooncap',name:'Mooncap',clue:'mushroom',rarity:'Rare',bio:'Only wakes when the shadows grow long.',body:'#665d7a',belly:'#cfc4d4',habitat:'woodland',form:'cap'},
  {id:'clover-skip',name:'Clover Skip',clue:'clover',rarity:'Common',bio:'Lucky, but far too polite to mention it.',body:'#4f8a58',belly:'#cae6b8',habitat:'meadow',form:'ears'},
  {id:'pinecone-pal',name:'Pinecone Pal',clue:'cone',rarity:'Uncommon',bio:'Builds perfect towers when nobody is watching.',body:'#875e39',belly:'#d2aa72',habitat:'woodland',form:'horns'},
  {id:'tide-twill',name:'Tide Twill',clue:'shell',rarity:'Rare',bio:'Stitches foam along the edge of the sea.',body:'#498b91',belly:'#d0e4d9',habitat:'coast',form:'fins'},
  {id:'cloudlet',name:'Cloudlet',clue:'cloud',rarity:'Uncommon',bio:'A small weather system with excellent manners.',body:'#c9d8d9',belly:'#f5f2e8',habitat:'any',form:'wings'},
  {id:'acorn-orbit',name:'Acorn Orbit',clue:'acorn',rarity:'Rare',bio:'Circles oak trees in a route only it understands.',body:'#9b7441',belly:'#e8cb8f',habitat:'woodland',form:'cap'},
  {id:'reed-whistle',name:'Reed Whistle',clue:'reed',rarity:'Uncommon',bio:'Sings one clear note across quiet water.',body:'#6c8d6a',belly:'#cad3a0',habitat:'wetland',form:'wings'},
  {id:'brickbit',name:'Brickbit',clue:'brick',rarity:'Common',bio:'Makes a home in the warm corners of cities.',body:'#a85b45',belly:'#e6bd94',habitat:'urban',form:'horns'},
  {id:'frost-fleck',name:'Frost Fleck',clue:'snow',rarity:'Rare',bio:'Keeps one snowflake safe through every summer.',body:'#a7c9d2',belly:'#eef8f5',habitat:'cold',form:'ears'},
  {id:'cinderfinch',name:'Cinderfinch',clue:'ash',rarity:'Rare',bio:'Follows campfire stories after the flames go out.',body:'#4e4a45',belly:'#e47843',habitat:'dry',form:'wings'},
  {id:'star-nook',name:'Star Nook',clue:'starlight',rarity:'Legendary',bio:'A patient listener from somewhere very far away.',body:'#273f55',belly:'#f1cb6a',habitat:'any',form:'horns'}
];

const REGIONAL_LINEAGES = [
  {sprite:'maple-mote',clue:'leaf',names:['Amber Sprig','Copper Canopy','Ruby Rustle','Golden Frond','Silver Vein']},
  {sprite:'mosskin',clue:'moss',names:['Velvet Mossling','Ferny Cushion','Emerald Nap','Lichen Loaf','Dewy Tuft']},
  {sprite:'pebble-pip',clue:'stone',names:['Granite Skip','Quartz Nibble','Slate Scoot','Jasper Jot','Marble Munch']},
  {sprite:'barkback',clue:'bark',names:['Cedar Crinkle','Birch Bouncer','Oak Knurl','Willow Rind','Redwood Ruffle']},
  {sprite:'puddle-purl',clue:'water',names:['Ripple Rollo','Brook Bubble','Rainy Rill','Lagoon Loop','Drizzle Drop']},
  {sprite:'mooncap',clue:'mushroom',names:['Chanterelle Chuckle','Porcini Pounce','Inkcap Wink','Morel Muddle','Truffle Trot']},
  {sprite:'clover-skip',clue:'clover',names:['Lucky Lilt','Shamrock Shuffle','Meadow Trefoil','Clover Curl','Greenwish']},
  {sprite:'pinecone-pal',clue:'cone',names:['Spruce Tumble','Fir Fidget','Cedar Conekin','Larch Loper','Sequoia Scale']},
  {sprite:'tide-twill',clue:'shell',names:['Coral Coil','Pearl Paddle','Whelk Whirl','Scallop Skim','Nautilus Nod']},
  {sprite:'cloudlet',clue:'cloud',names:['Nimbus Nudge','Cirrus Scoot','Cumulus Cuddle','Misty Mallow','Raincloud Roll']},
  {sprite:'acorn-orbit',clue:'acorn',names:['Oaklet Orbit','Chestnut Chuck','Hazel Hop','Bur Oak Bounce','Woodland Nutkin']},
  {sprite:'reed-whistle',clue:'reed',names:['Cattail Cadence','Rush Ripple','Bulrush Beat','Sedge Song','Marsh Piper']},
  {sprite:'brickbit',clue:'brick',names:['Terracotta Tuck','Clay Click','Mortar Mite','Ember Brickle','Cobble Kiln']},
  {sprite:'frost-fleck',clue:'snow',names:['Powder Pounce','Crystal Kip','Flurry Floof','Glacier Glint','Icicle Skip']},
  {sprite:'cinderfinch',clue:'ash',names:['Sooty Spark','Charcoal Chirp','Ember Ashling','Cinder Swoop','Campfire Fleck']}
];
const REGIONAL_RARITIES=['Common','Common','Uncommon','Uncommon','Rare'];
const slugifyName=name=>name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
const REGIONAL_CREATURES=REGIONAL_LINEAGES.flatMap((lineage,lineageIndex)=>{
  const original=BASE_CREATURES.find(creature=>creature.id===lineage.sprite);
  return lineage.names.map((name,variantIndex)=>({
    ...original,
    id:`regional-${slugifyName(name)}`,
    name,
    clue:lineage.clue,
    rarity:REGIONAL_RARITIES[variantIndex],
    bio:`A ${lineage.clue} Wildling shaped by a different corner of the world.`,
    sprite:lineage.sprite,
    regional:true,
    artFilter:`hue-rotate(${(lineageIndex*29+variantIndex*51)%360}deg) saturate(${.84+variantIndex*.12}) brightness(${.92+(variantIndex%3)*.08})`
  }))
});
const CREATURES=[...BASE_CREATURES,...REGIONAL_CREATURES];

const CLUE_LABELS={leaf:'maple leaf',moss:'patch of moss',stone:'small stone',flower:'flower',dandelion:'dandelion',sunflower:'sunflower',rose:'rose',daisy:'daisy',poppy:'poppy',bluebell:'bluebell',lotus:'lotus',snapdragon:'snapdragon',bark:'piece of bark',water:'rain puddle',mushroom:'mushroom cap',clover:'clover',cone:'pinecone',shell:'seashell',cloud:'small cloud',acorn:'acorn',reed:'river reed',brick:'warm brick',snow:'snow crystal',ash:'charcoal fleck',starlight:'pinprick of light'};
const SPECIES_LABELS={leaf:'Leaf',moss:'Moss',stone:'Rock',dandelion:'Dandelion',sunflower:'Sunflower',rose:'Rose',daisy:'Daisy',poppy:'Poppy',bluebell:'Bluebell',lotus:'Lotus',snapdragon:'Snapdragon',bark:'Bark',water:'Water',mushroom:'Mushroom',clover:'Clover',cone:'Pinecone',shell:'Seashell',cloud:'Cloud',acorn:'Acorn',reed:'Reed',brick:'Brick',snow:'Snow',ash:'Ash',starlight:'Starlight'};
const FLOWER_CLUES=new Set(['dandelion','sunflower','rose','daisy','poppy','bluebell','lotus','snapdragon']);
const VISION_TARGETS=[
  {label:'a single tree leaf',clue:'leaf'},
  {label:'a patch of green moss',clue:'moss'},
  {label:'a natural rock or pebble',clue:'stone'},
  {label:'a clearly visible flower blossom',clue:'flower'},
  {label:'rough tree bark',clue:'bark'},
  {label:'a puddle of water',clue:'water'},
  {label:'a mushroom cap',clue:'mushroom'},
  {label:'a three-leaf clover plant',clue:'clover'},
  {label:'a brown pine cone',clue:'cone'},
  {label:'a seashell',clue:'shell'},
  {label:'a white cloud in the sky',clue:'cloud'},
  {label:'an acorn',clue:'acorn'},
  {label:'tall reeds or cattails',clue:'reed'},
  {label:'a clay brick',clue:'brick'},
  {label:'snow or ice crystals',clue:'snow'},
  {label:'charcoal or wood ash',clue:'ash'},
  {label:'a bright star or small point of light',clue:'starlight'},
  {label:'only a human hand',clue:null},
  {label:'only a person\'s face',clue:null},
  {label:'an indoor room',clue:null},
  {label:'an empty outdoor scene',clue:null},
  {label:'blurry camera motion',clue:null},
  {label:'plain grass or soil with no centered object',clue:null}
];
const FLOWER_TARGETS=[
  {label:'a round yellow dandelion flower with many thin petals',clue:'dandelion'},
  {label:'a white spherical dandelion seed head',clue:'dandelion'},
  {label:'a low dandelion bloom above toothed leaves',clue:'dandelion'},
  {label:'a large sunflower with broad yellow petals and a dark seed disk',clue:'sunflower'},
  {label:'one tall sunflower facing the camera',clue:'sunflower'},
  {label:'a sunflower head with a large brown circular center',clue:'sunflower'},
  {label:'a rose blossom with layered spiral petals',clue:'rose'},
  {label:'a many-petaled rose bloom seen close up',clue:'rose'},
  {label:'a cup-shaped rose with tightly overlapping petals',clue:'rose'},
  {label:'a white daisy with thin petals and a yellow button center',clue:'daisy'},
  {label:'a small round daisy flower seen from the front',clue:'daisy'},
  {label:'a daisy bloom with a single ring of white petals',clue:'daisy'},
  {label:'a single open red poppy with four broad papery petals and a dark black center',clue:'poppy'},
  {label:'a flat red poppy seen from the front with a black seed center',clue:'poppy'},
  {label:'one cup-shaped red poppy bloom on a thin stem',clue:'poppy'},
  {label:'a drooping cluster of small blue bell-shaped flowers',clue:'bluebell'},
  {label:'many bluebells hanging downward from curved stems',clue:'bluebell'},
  {label:'a woodland bluebell with narrow blue petals',clue:'bluebell'},
  {label:'a layered pink or white lotus flower floating above water',clue:'lotus'},
  {label:'a symmetrical lotus bloom beside a round lily pad',clue:'lotus'},
  {label:'an open lotus with many pointed petals around a yellow center',clue:'lotus'},
  {label:'a tall upright stalk covered with many small tubular snapdragon flowers',clue:'snapdragon'},
  {label:'a cluster of orange or pink dragon-mouth blossoms on a vertical stem',clue:'snapdragon'},
  {label:'many narrow blossoms on one tall spike, not a single flat flower',clue:'snapdragon'},
  {label:'a different kind of flower not described here',clue:null},
  {label:'only green leaves with no visible flower',clue:null},
  {label:'a hand or background rather than one flower',clue:null}
];
const $=query=>document.querySelector(query);
const storedFound=()=>{try{return JSON.parse(localStorage.getItem('wildlings-found')||'[]')}catch{return []}};
const storedTrailSeed=()=>{try{return Number(localStorage.getItem('wildlings-trail-seed'))||20260802}catch{return 20260802}};
const storedWalkProgress=()=>{try{return JSON.parse(localStorage.getItem('wildlings-walk-progress')||'{}')}catch{return {}}};
const storedWalkCompanion=()=>{try{return localStorage.getItem('wildlings-walk-companion')||''}catch{return ''}};
const state={heading:0,targetBearing:110,hasOrientation:false,dragging:false,dragX:0,scan:0,discovered:false,active:null,queue:[],queueIndex:0,found:new Set(storedFound()),trailSeed:storedTrailSeed(),facing:'environment',stream:null,habitat:'meadow',audio:null,cameraReady:false,visionMode:'idle',classifier:null,RawImage:null,visionBusy:false,stableClue:null,stableHits:0,stableScoreTotal:0,detectionHistory:[],catching:false,caught:false,catchHits:0,catchX:0,catchY:0,catchVX:0,catchVY:0,catchFrame:0,catchLastTime:0,catchDeadline:0,catchSecond:-1,catchReadyTimer:0,guideQuery:'',walkCompanionId:storedWalkCompanion(),walkProgress:storedWalkProgress(),walkWatchId:null,lastWalkPosition:null};

function seeded(seed){let value=seed>>>0;return()=>{value+=0x6d2b79f5;let mixed=value;mixed=Math.imul(mixed^(mixed>>>15),mixed|1);mixed^=mixed+Math.imul(mixed^(mixed>>>7),mixed|61);return((mixed^(mixed>>>14))>>>0)/4294967296}}
function hashString(value){let h=2166136261;for(const char of value){h^=char.charCodeAt(0);h=Math.imul(h,16777619)}return h>>>0}
function normalizeAngle(angle){return((angle+540)%360)-180}
function shuffle(items,random){const copy=[...items];for(let index=copy.length-1;index>0;index--){const other=Math.floor(random()*(index+1));[copy[index],copy[other]]=[copy[other],copy[index]]}return copy}

function creatureArt(c,mini=false){
  const alt=mini?c.name:'';
  const loading=mini?' loading="lazy"':'';
  const style=c.artFilter?` style="filter:${c.artFilter}"`:'';
  return `<img class="wildling-sprite" src="assets/creatures/${c.sprite||c.id}.png" alt="${alt}"${loading}${style}>`
}

function clueArt(type){
  const line=`stroke="#172019" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"`;
  if(type==='leaf'||type==='clover')return`<svg viewBox="0 0 160 160"><path d="M80 137V69" ${line}/><path d="M79 82C50 68 28 42 31 22c14 8 29 6 42 23 8-14 17-22 28-29 1 16 9 25 26 31-7 20-23 37-48 35Z" fill="${type==='leaf'?'#c85a39':'#5d995e'}" ${line}/>${type==='clover'?'<circle cx="61" cy="48" r="19" fill="#69a769"/><circle cx="91" cy="45" r="19" fill="#69a769"/><circle cx="79" cy="67" r="19" fill="#69a769"/>':''}</svg>`;
  if(type==='flower'||FLOWER_CLUES.has(type)){const colors={dandelion:'#efe1a1',sunflower:'#e9b52d',rose:'#cf493d',daisy:'#f4f0e5',poppy:'#df4d37',bluebell:'#587fc2',lotus:'#f0d79f',snapdragon:'#e89a31'};return`<svg viewBox="0 0 160 160"><path d="M80 137V77" ${line}/><g fill="${colors[type]||'#f1d56e'}" ${line}><circle cx="80" cy="47" r="18"/><circle cx="55" cy="63" r="18"/><circle cx="105" cy="63" r="18"/><circle cx="66" cy="89" r="18"/><circle cx="94" cy="89" r="18"/></g><circle cx="80" cy="69" r="15" fill="${type==='daisy'?'#e3a82f':'#8a613c'}"/></svg>`}
  if(type==='water'||type==='shell'||type==='reed')return`<svg viewBox="0 0 160 160"><ellipse cx="80" cy="106" rx="57" ry="22" fill="#6eb0ba" ${line}/><path d="M42 105q18-14 37 0t38 0" fill="none" stroke="#d6f0eb" stroke-width="4"/>${type==='reed'?'<path d="M62 104V32m18 72V44m20 60V27" stroke="#63835d" stroke-width="7"/>':''}</svg>`;
  if(type==='mushroom')return`<svg viewBox="0 0 160 160"><path d="M68 68h25l10 65H58Z" fill="#e1d5bc" ${line}/><path d="M27 72C31 24 126 19 135 72Z" fill="#9a6d76" ${line}/><circle cx="67" cy="47" r="7" fill="#f4f0e5"/><circle cx="102" cy="55" r="6" fill="#f4f0e5"/></svg>`;
  if(type==='cloud'||type==='snow'||type==='starlight')return`<svg viewBox="0 0 160 160">${type==='starlight'?'<path d="M80 19l10 39 33-17-22 32 35 17-40-2 3 40-19-35-20 35 4-40-40 2 35-17-22-32 33 17Z" fill="#efc85d" stroke="#172019" stroke-width="3"/>':'<path d="M31 103c-18-28 7-50 31-38 4-36 58-36 62 1 30-5 36 37 7 45H44c-6 0-10-3-13-8Z" fill="#dce5e4" stroke="#172019" stroke-width="3"/>'}</svg>`;
  return`<svg viewBox="0 0 160 160"><path d="M35 112 48 52l38-22 39 27 4 53-47 25Z" fill="${type==='brick'?'#a75b44':type==='cone'||type==='acorn'?'#9b7441':'#8b9089'}" ${line}/><path d="m50 61 55 52M44 86l42-56M74 130l44-66" opacity=".35" ${line}/></svg>`
}

function buildLocalField(lat=37.7749,lon=-122.4194,label=''){
  const random=seeded(hashString(`${lat.toFixed(2)},${lon.toFixed(2)},${state.trailSeed}`));
  const absLat=Math.abs(lat);
  state.habitat=absLat>58?'cold':Math.abs(lon%11)<1.8?'coast':Math.abs((lat+lon)%9)<2?'wetland':Math.abs(lat%7)<2.5?'woodland':'meadow';
  const local=shuffle(CREATURES.filter(c=>c.habitat===state.habitat||c.habitat==='any'),random);
  const visitors=shuffle(CREATURES.filter(c=>!local.includes(c)),random);
  state.queue=[...local,...visitors].slice(0,8);
  $('#place-name').textContent=label||`${state.habitat[0].toUpperCase()}${state.habitat.slice(1)} field · ${Math.abs(lat).toFixed(1)}°`;
  if(!state.discovered)spawnNext()
}

function spawnNext(){
  resetCatchState();
  if(state.visionMode==='loading'||state.visionMode==='active'){
    state.active=null;state.discovered=false;state.scan=0;state.stableClue=null;state.stableHits=0;state.stableScoreTotal=0;state.detectionHistory=[];
    const target=$('#ar-target');target.className='ar-target';target.innerHTML='';target.style.left='50%';target.style.top='50%';delete target.dataset.clue;
    $('#discovery-card').classList.remove('show');$('#reticle').style.setProperty('--scan','0%');$('#reticle').classList.remove('reticle-lock','reticle-checking');
    $('#search-copy').innerHTML='<strong>Show me something real</strong><span>Hold a leaf or rock inside the circle</span>';
    return
  }
  state.active=state.queue[state.queueIndex++%state.queue.length];state.discovered=false;state.scan=0;
  state.targetBearing=(state.heading+65+Math.random()*185)%360;
  const target=$('#ar-target');target.className='ar-target';target.style.left='50%';target.style.top='50%';
  target.innerHTML=`<div class="clue-art">${clueArt(state.active.clue)}</div><div class="creature-art">${creatureArt(state.active)}</div>`;
  target.setAttribute('aria-label',`A hidden ${CLUE_LABELS[state.active.clue]||state.active.clue}`);
  $('#discovery-card').classList.remove('show');$('#search-copy').innerHTML='<strong>Turn slowly</strong><span>A nearby clue is rustling</span>'
}

function updateView(){
  if(state.visionMode==='loading'||state.visionMode==='active')return;
  if(!state.active||state.discovered||document.querySelector('.sheet.open'))return;
  const diff=normalizeAngle(state.targetBearing-state.heading);const fov=window.innerWidth<600?34:46;const visible=Math.abs(diff)<fov;
  const target=$('#ar-target'),arrow=$('#edge-arrow');target.classList.toggle('visible',visible);arrow.classList.toggle('show',!visible);
  if(visible){
    target.style.left=`${50+(diff/fov)*42}%`;target.style.top=`${48+Math.sin(Date.now()/700)*4}%`;
    state.scan=Math.min(100,state.scan+(Math.abs(diff)<13?2.1:.25));$('#reticle').classList.toggle('reticle-lock',Math.abs(diff)<13);
    $('#search-copy').innerHTML=`<strong>${state.scan>30?'It is changing…':`A ${CLUE_LABELS[state.active.clue]||state.active.clue}`}</strong><span>Hold it inside the circle</span>`
  }else{
    state.scan=Math.max(0,state.scan-.6);$('#reticle').classList.remove('reticle-lock');arrow.style.left=diff>0?'calc(100% - 45px)':'45px';arrow.style.setProperty('--arrow-rotation',diff>0?'90deg':'-90deg')
  }
  $('#reticle').style.setProperty('--scan',`${state.scan}%`);if(state.scan>=100)reveal()
}

function reveal(){
  if(state.discovered)return;state.discovered=true;state.caught=false;const target=$('#ar-target');target.classList.add('visible','discovered');target.setAttribute('aria-label',`${state.active.name} is getting ready to run`);$('#reticle').classList.remove('reticle-lock','reticle-checking');$('#edge-arrow').classList.remove('show');$('#discovery-card').classList.remove('show');
  $('#search-copy').innerHTML=`<strong>${state.active.name} spotted you!</strong><span>Get ready to catch it</span>`;$('#discovery-rarity').textContent=`${state.active.rarity} · ${SPECIES_LABELS[state.active.clue]||state.active.clue} wildling`;$('#discovery-name').textContent=state.active.name;$('#discovery-copy').textContent=state.active.bio;
  setVisionStatus('Creature found · chase starting','seeing');ping(620,.08);setTimeout(()=>ping(880,.1),90);state.catchReadyTimer=setTimeout(startCatch,520)
}

function befriend(){
  if(!state.discovered||!state.caught)return;const isNew=!state.found.has(state.active.id);state.found.add(state.active.id);try{localStorage.setItem('wildlings-found',JSON.stringify([...state.found]))}catch{}updateCount();burst();if(!state.walkCompanionId)selectWalkCompanion(state.active.id,false);toast(isNew?`${state.active.name} is your friend now`:`${state.active.name} remembers you`);$('#discovery-card').classList.remove('show');$('#ar-target').classList.remove('visible');state.caught=false;setTimeout(spawnNext,1000)
}
function updateCount(){const validFound=CREATURES.filter(creature=>state.found.has(creature.id)).length;$('#found-count').textContent=validFound;$('#total-count').textContent=CREATURES.length}
function walkDistanceFor(id){return Math.max(0,Number(state.walkProgress[id])||0)}
function walkLevelFor(id){return Math.min(100,1+Math.floor(walkDistanceFor(id)/250))}
function formatWalkDistance(meters){return meters>=1000?`${(meters/1000).toFixed(meters>=10000?0:1)} km`:`${Math.floor(meters)} m`}
function persistWalkProgress(){try{localStorage.setItem('wildlings-walk-progress',JSON.stringify(state.walkProgress))}catch{}}
function updateWalkChip(){
  const chip=$('#walk-chip'),creature=CREATURES.find(item=>item.id===state.walkCompanionId&&state.found.has(item.id));
  if(!creature){chip.hidden=true;return}
  chip.hidden=false;$('#walk-art').innerHTML=creatureArt(creature);$('#walk-name').textContent=creature.name;$('#walk-level').textContent=`Lv ${walkLevelFor(creature.id)}`;$('#walk-distance').textContent=formatWalkDistance(walkDistanceFor(creature.id))
}
function selectWalkCompanion(id,announce=true){
  const creature=CREATURES.find(item=>item.id===id);if(!creature||!state.found.has(id))return;
  state.walkCompanionId=id;state.lastWalkPosition=null;try{localStorage.setItem('wildlings-walk-companion',id)}catch{}updateWalkChip();startWalkTracking();if(document.querySelector('#guide-sheet.open'))renderGuide();if(announce){closeSheets();toast(`${creature.name} is walking with you`)}
}
function haversineMeters(a,b){
  const radians=value=>value*Math.PI/180,earth=6371000,dLat=radians(b.latitude-a.latitude),dLon=radians(b.longitude-a.longitude),lat1=radians(a.latitude),lat2=radians(b.latitude),h=Math.sin(dLat/2)**2+Math.cos(lat1)*Math.cos(lat2)*Math.sin(dLon/2)**2;return earth*2*Math.atan2(Math.sqrt(h),Math.sqrt(1-h))
}
function handleWalkPosition(position){
  if(!state.walkCompanionId||!state.found.has(state.walkCompanionId)||!document.body.classList.contains('playing'))return;
  const current={latitude:position.coords.latitude,longitude:position.coords.longitude,accuracy:position.coords.accuracy,timestamp:position.timestamp||Date.now()};
  if(!Number.isFinite(current.latitude)||!Number.isFinite(current.longitude)||current.accuracy>80)return;
  const previous=state.lastWalkPosition;state.lastWalkPosition=current;if(!previous)return;
  const meters=haversineMeters(previous,current),seconds=Math.max(1,(current.timestamp-previous.timestamp)/1000),speed=meters/seconds;if(meters<2||meters>250||speed>8)return;
  const id=state.walkCompanionId,oldLevel=walkLevelFor(id);state.walkProgress[id]=walkDistanceFor(id)+meters;persistWalkProgress();updateWalkChip();const newLevel=walkLevelFor(id);if(newLevel>oldLevel){const creature=CREATURES.find(item=>item.id===id);toast(`${creature.name} reached level ${newLevel}!`);ping(920,.1)}
}
function startWalkTracking(){
  if(!navigator.geolocation||!state.walkCompanionId||state.walkWatchId!==null)return;
  state.walkWatchId=navigator.geolocation.watchPosition(handleWalkPosition,()=>{state.lastWalkPosition=null},{enableHighAccuracy:true,maximumAge:15000,timeout:20000})
}
function renderGuide(){
  const query=state.guideQuery.trim().toLowerCase(),visible=CREATURES.filter(c=>!query||c.name.toLowerCase().includes(query)||(SPECIES_LABELS[c.clue]||c.clue).toLowerCase().includes(query));
  $('#guide-result-count').textContent=`${visible.length} of ${CREATURES.length}`;
  $('#field-grid').innerHTML=visible.length?visible.map(c=>{const found=state.found.has(c.id),species=SPECIES_LABELS[c.clue]||c.clue,walking=state.walkCompanionId===c.id,status=found?`${c.rarity} · Lv ${walkLevelFor(c.id)}`:'Species clue';return`<article class="field-card ${found?'':'unknown'} ${walking?'walking':''}" aria-label="${found?c.name:`Unknown ${species} Wildling`}"><div class="mini-art" aria-hidden="true">${creatureArt(c,true)}</div><strong>${found?c.name:'Unknown'}</strong><small class="species-label">${species}</small><small class="profile-status">${status}</small>${c.regional?'<small class="regional-mark">Regional form</small>':''}${found?`<button class="walk-button" data-walk-id="${c.id}" ${walking?'disabled':''}>${walking?'Walking':'Walk together'}</button>`:''}</article>`}).join(''):'<p class="guide-empty">No Wildlings match that search.</p>'
}
function openSheet(id){if(state.catching){toast(`Catch ${state.active.name} first!`);return}document.querySelectorAll('.sheet').forEach(s=>s.classList.toggle('open',s.id===id));if(id==='guide-sheet')renderGuide()}
function closeSheets(){document.querySelectorAll('.sheet').forEach(s=>s.classList.remove('open'))}

function resetCatchState(){
  cancelAnimationFrame(state.catchFrame);clearTimeout(state.catchReadyTimer);state.catching=false;state.caught=false;state.catchHits=0;state.catchFrame=0;state.catchLastTime=0;state.catchDeadline=0;state.catchSecond=-1;document.body.classList.remove('catch-mode');$('#catch-progress')?.classList.remove('show');$('#catch-progress')?.querySelectorAll('i').forEach(mark=>mark.classList.remove('caught'))
}
function renderCatchProgress(){
  const progress=$('#catch-progress');progress.querySelectorAll('i').forEach((mark,index)=>mark.classList.toggle('caught',index<state.catchHits));progress.setAttribute('aria-label',`${state.catchHits} of 3 catch taps`)
}
function catchBounds(target){
  const halfWidth=target.offsetWidth/2,halfHeight=target.offsetHeight/2,minY=Math.max(270,Math.min(350,window.innerHeight*.42));
  return{minX:halfWidth+12,maxX:Math.max(halfWidth+12,window.innerWidth-halfWidth-12),minY,maxY:Math.max(minY,window.innerHeight-halfHeight-88)}
}
function animateCatch(time){
  if(!state.catching)return;if(time>=state.catchDeadline){escapeCatch();return}const target=$('#ar-target'),bounds=catchBounds(target),delta=state.catchLastTime?Math.min(.04,(time-state.catchLastTime)/1000):0;state.catchLastTime=time;state.catchX+=state.catchVX*delta;state.catchY+=state.catchVY*delta;
  if(state.catchX<=bounds.minX||state.catchX>=bounds.maxX){state.catchX=Math.max(bounds.minX,Math.min(bounds.maxX,state.catchX));state.catchVX*=-1}
  if(state.catchY<=bounds.minY||state.catchY>=bounds.maxY){state.catchY=Math.max(bounds.minY,Math.min(bounds.maxY,state.catchY));state.catchVY*=-1}
  target.style.left=`${state.catchX}px`;target.style.top=`${state.catchY}px`;const seconds=Math.max(0,Math.ceil((state.catchDeadline-time)/1000));if(seconds!==state.catchSecond){state.catchSecond=seconds;setVisionStatus(`${seconds}s left · ${3-state.catchHits} taps to catch`,'chase')}
  state.catchFrame=requestAnimationFrame(animateCatch)
}
function startCatch(){
  if(!state.discovered||state.caught)return;const target=$('#ar-target'),reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches,speed=reducedMotion?62:112,angle=(Math.random()*.7+.18)*Math.PI*(Math.random()<.5?1:-1);state.catching=true;state.catchHits=0;state.catchX=window.innerWidth/2;state.catchY=Math.max(300,window.innerHeight*.56);state.catchVX=Math.cos(angle)*speed;state.catchVY=Math.sin(angle)*speed;state.catchLastTime=0;state.catchDeadline=performance.now()+15000;state.catchSecond=-1;
  document.body.classList.add('catch-mode');target.classList.add('catching');target.setAttribute('aria-label',`Catch ${state.active.name}. Zero of three taps.`);$('#catch-progress').classList.add('show');renderCatchProgress();$('#search-copy').innerHTML=`<strong>Catch ${state.active.name}!</strong><span>Tap the running creature three times</span>`;state.catchFrame=requestAnimationFrame(animateCatch)
}
function attemptCatch(){
  if(!state.catching)return;state.catchHits+=1;renderCatchProgress();const target=$('#ar-target');target.classList.remove('tagged');void target.offsetWidth;target.classList.add('tagged');setTimeout(()=>target.classList.remove('tagged'),220);ping(710+state.catchHits*90,.08);
  if(state.catchHits>=3){completeCatch();return}const speed=(window.matchMedia('(prefers-reduced-motion: reduce)').matches?68:126)+state.catchHits*24,angle=Math.random()*Math.PI*2;state.catchVX=Math.cos(angle)*speed;state.catchVY=Math.sin(angle)*speed;target.setAttribute('aria-label',`Catch ${state.active.name}. ${state.catchHits} of three taps.`);$('#search-copy').innerHTML=`<strong>Good catch!</strong><span>${3-state.catchHits} more ${3-state.catchHits===1?'tap':'taps'} before it escapes</span>`
}
function completeCatch(){
  cancelAnimationFrame(state.catchFrame);state.catchFrame=0;state.catching=false;state.caught=true;const target=$('#ar-target');target.classList.remove('catching','tagged');target.classList.add('caught');target.style.left='50%';target.style.top='43%';target.setAttribute('aria-label',`${state.active.name} was caught and can now be befriended`);$('#catch-progress').classList.remove('show');$('#search-copy').innerHTML=`<strong>You caught ${state.active.name}!</strong><span>Now you can become friends</span>`;setVisionStatus('Caught · ready to befriend','seeing');burst();setTimeout(()=>$('#discovery-card').classList.add('show'),320)
}
function escapeCatch(){
  cancelAnimationFrame(state.catchFrame);state.catchFrame=0;state.catching=false;state.caught=false;document.body.classList.remove('catch-mode');const target=$('#ar-target');target.classList.remove('catching','tagged');target.classList.add('escaping');target.style.left=state.catchVX>=0?`${window.innerWidth+150}px`:'-150px';target.style.top=`${Math.max(160,Math.min(window.innerHeight-120,state.catchY+state.catchVY*.5))}px`;target.setAttribute('aria-label',`${state.active.name} escaped`);$('#catch-progress').classList.remove('show');$('#search-copy').innerHTML=`<strong>${state.active.name} got away!</strong><span>Show the clue again for another chance</span>`;setVisionStatus('Escaped · try the clue again','ready');toast('So close! It scampered away');setTimeout(spawnNext,1050)
}

async function startCamera(){
  if(!navigator.mediaDevices?.getUserMedia){toast('Camera unavailable — field demo is active');return}
  try{
    state.cameraReady=false;clearDetectedClue('Starting the camera','Keep the object zone clear','Camera is focusing');
    state.stream?.getTracks().forEach(track=>track.stop());
    state.stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:state.facing},width:{ideal:1920},height:{ideal:1080},frameRate:{ideal:30,max:30}},audio:false});
    const video=$('#camera'),track=state.stream.getVideoTracks()[0];video.srcObject=state.stream;await video.play();
    const capabilities=track?.getCapabilities?.()||{},advanced={};
    if(capabilities.focusMode?.includes('continuous'))advanced.focusMode='continuous';
    if(capabilities.exposureMode?.includes('continuous'))advanced.exposureMode='continuous';
    if(capabilities.whiteBalanceMode?.includes('continuous'))advanced.whiteBalanceMode='continuous';
    if(Object.keys(advanced).length)await track.applyConstraints({advanced:[advanced]}).catch(()=>{});
    state.cameraReady=true;document.body.classList.add('camera-ready');document.body.classList.toggle('front-camera',state.facing==='user')
  }
  catch{state.cameraReady=false;toast('Camera blocked — field demo is active')}
}
async function startMotion(){
  try{if(typeof DeviceOrientationEvent!=='undefined'&&typeof DeviceOrientationEvent.requestPermission==='function'){const permission=await DeviceOrientationEvent.requestPermission();if(permission!=='granted')throw new Error('denied')}
    window.addEventListener('deviceorientation',event=>{const compass=event.webkitCompassHeading;const next=Number.isFinite(compass)?compass:360-(event.alpha||0);if(event.alpha!==null){state.hasOrientation=true;state.heading=next}},true)}catch{toast('Drag the view to look around')}
}
function startLocation(){
  if(!navigator.geolocation){buildLocalField();return}
  navigator.geolocation.getCurrentPosition(pos=>buildLocalField(pos.coords.latitude,pos.coords.longitude),()=>buildLocalField(37.7749,-122.4194,'Demo field · local only'),{enableHighAccuracy:false,timeout:6000,maximumAge:300000})
}
function setVisionStatus(message,mode=''){
  const chip=$('#vision-status');chip.className=`vision-chip ${mode}`.trim();chip.querySelector('span').textContent=message
}
function creatureForClue(clue){
  const matches=CREATURES.filter(creature=>creature.clue===clue||(clue==='stone'&&creature.id==='pebble-pip'));
  const localMatch=state.queue.find(creature=>matches.includes(creature));
  return localMatch||matches[Math.abs(hashString(`${clue}-${state.trailSeed}`))%matches.length]||CREATURES[0]
}
function frameQuality(canvas){
  const {data}=canvas.getContext('2d',{willReadFrequently:true}).getImageData(0,0,canvas.width,canvas.height);let total=0,squared=0,edges=0,samples=0;
  for(let y=2;y<canvas.height;y+=3){for(let x=2;x<canvas.width;x+=3){const i=(y*canvas.width+x)*4,left=i-8,above=i-canvas.width*8;const lum=data[i]*.2126+data[i+1]*.7152+data[i+2]*.0722;const lumLeft=data[left]*.2126+data[left+1]*.7152+data[left+2]*.0722;const lumAbove=data[above]*.2126+data[above+1]*.7152+data[above+2]*.0722;total+=lum;squared+=lum*lum;edges+=(Math.abs(lum-lumLeft)+Math.abs(lum-lumAbove))/2;samples++}}
  const mean=total/samples,contrast=Math.sqrt(Math.max(0,squared/samples-mean*mean));return{mean,contrast,edge:edges/samples}
}
function drawCameraCrop(){
  const video=$('#camera'),canvas=$('#vision-canvas'),reticle=$('#reticle');if(video.readyState<2||!video.videoWidth)return null;
  const videoRect=video.getBoundingClientRect(),targetRect=reticle.getBoundingClientRect(),scale=Math.max(videoRect.width/video.videoWidth,videoRect.height/video.videoHeight);
  const renderedWidth=video.videoWidth*scale,renderedHeight=video.videoHeight*scale,offsetX=(renderedWidth-videoRect.width)/2,offsetY=(renderedHeight-videoRect.height)/2;
  let centerX=(targetRect.left+targetRect.width/2-videoRect.left+offsetX)/scale;const centerY=(targetRect.top+targetRect.height/2-videoRect.top+offsetY)/scale;
  if(state.facing==='user')centerX=video.videoWidth-centerX;
  const requestedSize=Math.max(targetRect.width,targetRect.height)*1.35/scale,size=Math.min(requestedSize,video.videoWidth,video.videoHeight);
  const sx=Math.max(0,Math.min(video.videoWidth-size,centerX-size/2)),sy=Math.max(0,Math.min(video.videoHeight-size,centerY-size/2));
  const context=canvas.getContext('2d',{willReadFrequently:true});context.clearRect(0,0,canvas.width,canvas.height);context.drawImage(video,sx,sy,size,size,0,0,canvas.width,canvas.height);return{canvas,quality:frameQuality(canvas)}
}
function showPossibleClue(clue){
  const name=CLUE_LABELS[clue]||clue;state.scan=Math.min(75,state.stableHits*25);$('#reticle').style.setProperty('--scan',`${state.scan}%`);$('#reticle').classList.add('reticle-checking');$('#reticle').classList.remove('reticle-lock');
  $('#search-copy').innerHTML=`<strong>Checking ${name}</strong><span>Keep only that object inside the circle</span>`;setVisionStatus(`${name} · ${state.stableHits} of 4 steady matches`,'checking')
}
function showDetectedClue(clue,score){
  state.active=creatureForClue(clue);
  const target=$('#ar-target');
  if(!target.dataset.clue||target.dataset.clue!==clue){target.dataset.clue=clue;target.innerHTML=`<div class="clue-art">${clueArt(clue)}</div><div class="creature-art">${creatureArt(state.active)}</div>`}
  target.className='ar-target visible';target.style.left='50%';target.style.top='50%';
  state.scan=100;$('#reticle').style.setProperty('--scan','100%');$('#reticle').classList.remove('reticle-checking');$('#reticle').classList.add('reticle-lock');
  const name=CLUE_LABELS[clue]||clue;$('#search-copy').innerHTML=`<strong>Real ${name} detected</strong><span>Hold still — something is waking</span>`;setVisionStatus(`${name} seen · ${Math.round(score*100)}%`,'seeing');
  reveal()
}
function clearDetectedClue(message='Center one outdoor object',detail='Fill the circle and hold still',status='Nature Lens is looking'){
  state.scan=0;state.stableClue=null;state.stableHits=0;state.stableScoreTotal=0;state.detectionHistory=[];$('#ar-target').classList.remove('visible');
  $('#reticle').style.setProperty('--scan','0%');$('#reticle').classList.remove('reticle-lock','reticle-checking');
  $('#search-copy').innerHTML=`<strong>${message}</strong><span>${detail}</span>`;setVisionStatus(status,'ready')
}
function showUncertainDetection(message='Not sure yet',detail='Keep one object centered',status='Checking the object'){
  state.detectionHistory.push(null);if(state.detectionHistory.length>5)state.detectionHistory.shift();
  state.scan=Math.max(0,state.scan-18);$('#reticle').style.setProperty('--scan',`${state.scan}%`);$('#reticle').classList.toggle('reticle-checking',state.scan>0);$('#reticle').classList.remove('reticle-lock');
  $('#search-copy').innerHTML=`<strong>${message}</strong><span>${detail}</span>`;setVisionStatus(status,state.scan>0?'checking':'ready')
}
function pickVisionTarget(results,targets,{minScore=.14,minMargin=.018,minDominance=1.16}={}){
  const best=results[0],runnerUp=results[1],target=targets.find(item=>item.label===best?.label),margin=best.score-(runnerUp?.score||0),dominance=best.score/Math.max(.001,runnerUp?.score||0);
  return target?.clue&&best.score>=minScore&&margin>=minMargin&&dominance>=minDominance?{target,score:best.score}:null
}
function pickGroupedVisionTarget(results,targets,{minScore=.08,minMargin=.01,minDominance=1.08}={}){
  const scores=new Map();for(const result of results){const target=targets.find(item=>item.label===result.label),key=target?.clue||'other';scores.set(key,(scores.get(key)||0)+result.score)}
  const ranked=[...scores.entries()].sort((a,b)=>b[1]-a[1]),[bestClue,bestScore]=ranked[0]||['other',0],[runnerClue,runnerScore]=ranked[1]||['other',0],margin=bestScore-runnerScore,dominance=bestScore/Math.max(.001,runnerScore);
  const poppySnapdragon=new Set([bestClue,runnerClue]);if(poppySnapdragon.has('poppy')&&poppySnapdragon.has('snapdragon')&&(margin<.018||dominance<1.16))return{ambiguous:true,bestClue,runnerClue,score:bestScore};
  const target=targets.find(item=>item.clue===bestClue);return bestClue!=='other'&&target&&bestScore>=minScore&&margin>=minMargin&&dominance>=minDominance?{target,score:bestScore,runnerClue}:null
}
function rememberDetectedClue(clue,score){
  state.detectionHistory.push({clue,score});if(state.detectionHistory.length>5)state.detectionHistory.shift();
  const matches=state.detectionHistory.filter(item=>item?.clue===clue);state.stableClue=clue;state.stableHits=matches.length;state.stableScoreTotal=matches.reduce((total,item)=>total+item.score,0);
  if(state.stableHits>=4)showDetectedClue(clue,state.stableScoreTotal/state.stableHits);else showPossibleClue(clue)
}
async function scanNatureFrame(){
  if(state.visionMode!=='active'||state.visionBusy||state.discovered||document.querySelector('.sheet.open'))return;
  const frame=drawCameraCrop();if(!frame)return;state.visionBusy=true;
  try{
    if(frame.quality.mean<18&&frame.quality.contrast<14){clearDetectedClue('The view is too dark','Find more light, then hold still','More light needed');return}
    if(frame.quality.mean>238){clearDetectedClue('Too much glare','Tilt the object away from bright light','Reduce glare');return}
    if(frame.quality.contrast<14||frame.quality.edge<4.8){clearDetectedClue('Move a little closer','Fill the circle with one clear object','Object not defined');return}
    const image=state.RawImage.fromCanvas(frame.canvas),labels=VISION_TARGETS.map(target=>target.label);
    const results=await state.classifier(image,labels,{hypothesis_template:'The object in the center is {}.'}),generalMatch=pickVisionTarget(results,VISION_TARGETS);
    if(!generalMatch){showUncertainDetection('Not sure yet','Show one leaf, rock, flower, or other clue','No clear match');return}
    let clue=generalMatch.target.clue,score=generalMatch.score;
    if(clue==='flower'){
      setVisionStatus('Flower seen · identifying species','checking');
      const flowerResults=await state.classifier(image,FLOWER_TARGETS.map(target=>target.label),{hypothesis_template:'The flower in the center is {}.'});
      const flowerMatch=pickGroupedVisionTarget(flowerResults,FLOWER_TARGETS);
      if(flowerMatch?.ambiguous){showUncertainDetection('Poppy or snapdragon?','Fill the circle with one flat bloom or one full flower stalk','Need a clearer flower shape');return}
      if(!flowerMatch){showUncertainDetection('Flower found','Move closer so one bloom or stalk fills the circle','Checking flower species');return}
      clue=flowerMatch.target.clue;score=(score+flowerMatch.score)/2
    }
    rememberDetectedClue(clue,score)
  }catch(error){console.warn('Nature Lens frame skipped',error);clearDetectedClue()}finally{state.visionBusy=false}
}
async function visionLoop(){
  if(state.visionMode!=='active')return;await scanNatureFrame();setTimeout(visionLoop,850)
}
async function startNatureLens(){
  if(!state.cameraReady){state.visionMode='fallback';setVisionStatus('Virtual trail · camera unavailable');return}
  state.visionMode='loading';$('#reticle').classList.add('vision-ready');setVisionStatus('Loading Nature Lens · first play');spawnNext();
  try{
    const module=await import('https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.7.3');state.RawImage=module.RawImage;
    state.classifier=await module.pipeline('zero-shot-image-classification','Xenova/clip-vit-base-patch32',{dtype:'q8',progress_callback:data=>{if(Number.isFinite(data.progress))setVisionStatus(`Learning nature · ${Math.round(data.progress)}%`)}});
    state.visionMode='active';setVisionStatus('Nature Lens is looking','ready');spawnNext();visionLoop()
  }catch(error){console.warn('Nature Lens unavailable',error);state.visionMode='fallback';$('#reticle').classList.remove('vision-ready');setVisionStatus('Virtual trail · lens offline');toast('Nature Lens could not load — virtual trail is active');if(state.queue.length)spawnNext()}
}
async function begin(){document.body.classList.add('playing');updateCount();updateWalkChip();startWalkTracking();await Promise.allSettled([startCamera(),startMotion()]);startLocation();startNatureLens()}
function toast(message){const el=$('#toast');el.textContent=message;el.classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove('show'),2600)}
function ping(freq,volume){try{state.audio||=new(window.AudioContext||window.webkitAudioContext)();const osc=state.audio.createOscillator(),gain=state.audio.createGain();osc.frequency.value=freq;osc.type='sine';gain.gain.setValueAtTime(volume,state.audio.currentTime);gain.gain.exponentialRampToValueAtTime(.001,state.audio.currentTime+.3);osc.connect(gain).connect(state.audio.destination);osc.start();osc.stop(state.audio.currentTime+.31)}catch{}}
function burst(){const rect=$('#ar-target').getBoundingClientRect();for(let i=0;i<18;i++){const spark=document.createElement('i');spark.className='spark';spark.style.left=`${rect.left+rect.width/2}px`;spark.style.top=`${rect.top+rect.height/2}px`;const angle=Math.random()*Math.PI*2,distance=40+Math.random()*100;spark.style.setProperty('--sx',`${Math.cos(angle)*distance}px`);spark.style.setProperty('--sy',`${Math.sin(angle)*distance}px`);document.body.append(spark);setTimeout(()=>spark.remove(),800)}}

$('#start-button').addEventListener('click',begin);$('#befriend').addEventListener('click',befriend);$('#ar-target').addEventListener('click',attemptCatch);
$('#guide-button').addEventListener('click',()=>openSheet('guide-sheet'));$('#info-button').addEventListener('click',()=>openSheet('info-sheet'));document.querySelectorAll('.close-sheet').forEach(button=>button.addEventListener('click',closeSheets));
$('#guide-search').addEventListener('input',event=>{state.guideQuery=event.target.value;renderGuide()});
$('#field-grid').addEventListener('click',event=>{const button=event.target.closest('.walk-button');if(button)selectWalkCompanion(button.dataset.walkId)});
$('#walk-chip').addEventListener('click',()=>openSheet('guide-sheet'));
$('#hint-button').addEventListener('click',()=>{if(state.visionMode==='active'||state.visionMode==='loading'){toast('Fill the circle with one real outdoor object and hold still for four matches');return}const diff=normalizeAngle(state.targetBearing-state.heading);toast(Math.abs(diff)<35?'Very close — hold the clue in the circle':diff>0?'Turn to your right':'Turn to your left')});
$('#flip-camera').addEventListener('click',async()=>{state.facing=state.facing==='environment'?'user':'environment';await startCamera()});
$('#new-trail').addEventListener('click',()=>{state.trailSeed=Date.now();try{localStorage.setItem('wildlings-trail-seed',state.trailSeed)}catch{}closeSheets();startLocation();toast('A new local trail has opened')});
window.addEventListener('pointerdown',event=>{if(event.target.closest('button,.sheet'))return;state.dragging=true;state.dragX=event.clientX});window.addEventListener('pointermove',event=>{if(!state.dragging||state.hasOrientation)return;state.heading=(state.heading-(event.clientX-state.dragX)*.38+360)%360;state.dragX=event.clientX});window.addEventListener('pointerup',()=>state.dragging=false);
window.addEventListener('keydown',event=>{if(event.key==='ArrowRight')state.heading=(state.heading+5)%360;if(event.key==='ArrowLeft')state.heading=(state.heading+355)%360;if(event.key==='Escape')closeSheets()});
setInterval(updateView,40);updateCount();
