const CREATURES = [
  {id:'maple-mote',name:'Maple Mote',clue:'leaf',rarity:'Common',bio:'A tiny keeper of autumn color.',body:'#c85a39',belly:'#f0bc55',habitat:'woodland',form:'ears'},
  {id:'mosskin',name:'Mosskin',clue:'moss',rarity:'Common',bio:'Sleeps wherever the ground feels soft.',body:'#73905b',belly:'#c9d5a5',habitat:'woodland',form:'round'},
  {id:'pebble-pip',name:'Pebble Pip',clue:'stone',rarity:'Common',bio:'Collects the smallest stones for very serious reasons.',body:'#7f8b82',belly:'#d6d2bd',habitat:'urban',form:'ears'},
  {id:'dandy-drift',name:'Dandy Drift',clue:'flower',rarity:'Uncommon',bio:'Rides the breeze and never hurries home.',body:'#efe1a1',belly:'#fff7d4',habitat:'meadow',form:'wings'},
  {id:'barkback',name:'Barkback',clue:'bark',rarity:'Common',bio:'Knows every old tree by its wrinkles.',body:'#745540',belly:'#cba77d',habitat:'woodland',form:'horns'},
  {id:'puddle-purl',name:'Puddle Purl',clue:'water',rarity:'Uncommon',bio:'Appears just after rain and leaves no footprints.',body:'#4e92a1',belly:'#a8d6d2',habitat:'wetland',form:'fins'},
  {id:'sunseed',name:'Sunseed',clue:'flower',rarity:'Common',bio:'Carries a pocket of warm afternoon light.',body:'#e3a82f',belly:'#fae7a3',habitat:'meadow',form:'wings'},
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

const CLUE_LABELS={leaf:'maple leaf',moss:'patch of moss',stone:'small stone',flower:'wildflower',bark:'piece of bark',water:'rain puddle',mushroom:'mushroom cap',clover:'clover',cone:'pinecone',shell:'seashell',cloud:'small cloud',acorn:'acorn',reed:'river reed',brick:'warm brick',snow:'snow crystal',ash:'charcoal fleck',starlight:'pinprick of light'};
const VISION_TARGETS=[
  {label:'one leaf close to the camera',clue:'leaf'},
  {label:'a natural rock or stone close to the camera',clue:'stone'},
  {label:'a flower close to the camera',clue:'flower'},
  {label:'tree bark close to the camera',clue:'bark'},
  {label:'moss close to the camera',clue:'moss'},
  {label:'a pine cone close to the camera',clue:'cone'},
  {label:'an acorn close to the camera',clue:'acorn'},
  {label:'a mushroom close to the camera',clue:'mushroom'},
  {label:'a puddle or water close to the camera',clue:'water'},
  {label:'a hand close to the camera',clue:null},
  {label:'an empty outdoor background',clue:null}
];
const $=query=>document.querySelector(query);
const storedFound=()=>{try{return JSON.parse(localStorage.getItem('wildlings-found')||'[]')}catch{return []}};
const storedTrailSeed=()=>{try{return Number(localStorage.getItem('wildlings-trail-seed'))||20260802}catch{return 20260802}};
const state={heading:0,targetBearing:110,hasOrientation:false,dragging:false,dragX:0,scan:0,discovered:false,active:null,queue:[],queueIndex:0,found:new Set(storedFound()),trailSeed:storedTrailSeed(),facing:'environment',stream:null,habitat:'meadow',audio:null,cameraReady:false,visionMode:'idle',classifier:null,RawImage:null,visionBusy:false,stableClue:null,stableHits:0};

function seeded(seed){let value=seed>>>0;return()=>{value+=0x6d2b79f5;let mixed=value;mixed=Math.imul(mixed^(mixed>>>15),mixed|1);mixed^=mixed+Math.imul(mixed^(mixed>>>7),mixed|61);return((mixed^(mixed>>>14))>>>0)/4294967296}}
function hashString(value){let h=2166136261;for(const char of value){h^=char.charCodeAt(0);h=Math.imul(h,16777619)}return h>>>0}
function normalizeAngle(angle){return((angle+540)%360)-180}
function shuffle(items,random){const copy=[...items];for(let index=copy.length-1;index>0;index--){const other=Math.floor(random()*(index+1));[copy[index],copy[other]]=[copy[other],copy[index]]}return copy}

function creatureArt(c,mini=false){
  const extra=c.form==='ears'?`<path d="M50 52L42 22l25 20M110 52l9-30-26 20" fill="${c.body}" stroke="#172019" stroke-width="3"/>`
    :c.form==='wings'?`<path d="M47 78C16 59 13 96 49 103M113 78c31-19 34 18-2 25" fill="${c.belly}" stroke="#172019" stroke-width="3"/>`
    :c.form==='horns'?`<path d="M56 48C40 31 47 19 62 38M104 48c16-17 9-29-6-10" fill="none" stroke="${c.belly}" stroke-width="8" stroke-linecap="round"/>`
    :c.form==='fins'?`<path d="M43 81L16 65l18 34M117 81l27-16-18 34" fill="${c.belly}" stroke="#172019" stroke-width="3"/>`
    :c.form==='cap'?`<path d="M39 53C44 16 116 16 121 53c-22-8-60-8-82 0Z" fill="${c.belly}" stroke="#172019" stroke-width="3"/>`:'';
  return `<svg viewBox="0 0 160 160" role="img" aria-label="${mini?c.name:''}"><ellipse class="creature-shadow" cx="80" cy="137" rx="42" ry="9"/>${extra}<path d="M45 79C46 48 66 37 80 39c14-2 34 9 35 40 10 12 9 35-5 46-13 10-47 10-60 0-14-11-15-34-5-46Z" fill="${c.body}" stroke="#172019" stroke-width="3"/><ellipse cx="80" cy="101" rx="25" ry="26" fill="${c.belly}" opacity=".9"/><circle class="eye" cx="66" cy="76" r="6"/><circle class="eye" cx="94" cy="76" r="6"/><circle class="eye-glint" cx="68" cy="74" r="2"/><circle class="eye-glint" cx="96" cy="74" r="2"/><path d="M75 88q5 6 10 0" fill="none" stroke="#172019" stroke-width="2.5" stroke-linecap="round"/><path d="M55 123q-13 12-20 1M105 123q13 12 20 1" fill="none" stroke="#172019" stroke-width="5" stroke-linecap="round"/></svg>`
}

function clueArt(type){
  const line=`stroke="#172019" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"`;
  if(type==='leaf'||type==='clover')return`<svg viewBox="0 0 160 160"><path d="M80 137V69" ${line}/><path d="M79 82C50 68 28 42 31 22c14 8 29 6 42 23 8-14 17-22 28-29 1 16 9 25 26 31-7 20-23 37-48 35Z" fill="${type==='leaf'?'#c85a39':'#5d995e'}" ${line}/>${type==='clover'?'<circle cx="61" cy="48" r="19" fill="#69a769"/><circle cx="91" cy="45" r="19" fill="#69a769"/><circle cx="79" cy="67" r="19" fill="#69a769"/>':''}</svg>`;
  if(type==='flower')return`<svg viewBox="0 0 160 160"><path d="M80 137V77" ${line}/><g fill="#f1d56e" ${line}><circle cx="80" cy="47" r="18"/><circle cx="55" cy="63" r="18"/><circle cx="105" cy="63" r="18"/><circle cx="66" cy="89" r="18"/><circle cx="94" cy="89" r="18"/></g><circle cx="80" cy="69" r="15" fill="#8a613c"/></svg>`;
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
  if(state.visionMode==='loading'||state.visionMode==='active'){
    state.active=null;state.discovered=false;state.scan=0;state.stableClue=null;state.stableHits=0;
    const target=$('#ar-target');target.className='ar-target';target.innerHTML='';delete target.dataset.clue;
    $('#discovery-card').classList.remove('show');$('#reticle').style.setProperty('--scan','0%');
    $('#search-copy').innerHTML='<strong>Show me something real</strong><span>Hold a leaf or rock inside the circle</span>';
    return
  }
  state.active=state.queue[state.queueIndex++%state.queue.length];state.discovered=false;state.scan=0;
  state.targetBearing=(state.heading+65+Math.random()*185)%360;
  const target=$('#ar-target');target.className='ar-target';
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
  if(state.discovered)return;state.discovered=true;$('#ar-target').classList.add('visible','discovered');$('#reticle').classList.remove('reticle-lock');$('#edge-arrow').classList.remove('show');
  $('#search-copy').innerHTML=`<strong>${state.active.name}</strong><span>A new Wildling appeared</span>`;$('#discovery-rarity').textContent=`${state.active.rarity} wildling · ${state.habitat}`;$('#discovery-name').textContent=state.active.name;$('#discovery-copy').textContent=state.active.bio;
  setTimeout(()=>$('#discovery-card').classList.add('show'),430);ping(620,.08);setTimeout(()=>ping(880,.1),90)
}

function befriend(){
  if(!state.discovered)return;const isNew=!state.found.has(state.active.id);state.found.add(state.active.id);try{localStorage.setItem('wildlings-found',JSON.stringify([...state.found]))}catch{}updateCount();burst();toast(isNew?`${state.active.name} joined your field guide`:`${state.active.name} remembers you`);$('#discovery-card').classList.remove('show');$('#ar-target').classList.remove('visible');setTimeout(spawnNext,1000)
}
function updateCount(){$('#found-count').textContent=state.found.size}
function renderGuide(){$('#field-grid').innerHTML=CREATURES.map(c=>{const found=state.found.has(c.id);return`<article class="field-card ${found?'':'unknown'}"><div class="mini-art">${creatureArt(c,true)}</div><strong>${found?c.name:'Unknown'}</strong><small>${found?c.rarity:'Keep looking'}</small></article>`}).join('')}
function openSheet(id){document.querySelectorAll('.sheet').forEach(s=>s.classList.toggle('open',s.id===id));if(id==='guide-sheet')renderGuide()}
function closeSheets(){document.querySelectorAll('.sheet').forEach(s=>s.classList.remove('open'))}

async function startCamera(){
  if(!navigator.mediaDevices?.getUserMedia){toast('Camera unavailable — field demo is active');return}
  try{state.stream?.getTracks().forEach(track=>track.stop());state.stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:state.facing},width:{ideal:1280},height:{ideal:1920}},audio:false});$('#camera').srcObject=state.stream;state.cameraReady=true;document.body.classList.add('camera-ready');document.body.classList.toggle('front-camera',state.facing==='user')}
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
function drawCameraCrop(){
  const video=$('#camera'),canvas=$('#vision-canvas');if(video.readyState<2||!video.videoWidth)return null;
  const size=Math.min(video.videoWidth,video.videoHeight)*.56,sx=(video.videoWidth-size)/2,sy=(video.videoHeight-size)/2;
  const context=canvas.getContext('2d',{willReadFrequently:true});context.drawImage(video,sx,sy,size,size,0,0,canvas.width,canvas.height);return canvas
}
function showDetectedClue(clue,score){
  if(state.stableClue!==clue){state.stableClue=clue;state.stableHits=0;state.scan=Math.max(0,state.scan-28)}
  state.stableHits+=1;state.active=creatureForClue(clue);
  const target=$('#ar-target');
  if(!target.dataset.clue||target.dataset.clue!==clue){target.dataset.clue=clue;target.innerHTML=`<div class="clue-art">${clueArt(clue)}</div><div class="creature-art">${creatureArt(state.active)}</div>`}
  target.className='ar-target visible';target.style.left='50%';target.style.top='50%';
  state.scan=Math.min(100,state.scan+(score>.5?42:34));$('#reticle').style.setProperty('--scan',`${state.scan}%`);$('#reticle').classList.add('reticle-lock');
  const name=CLUE_LABELS[clue]||clue;$('#search-copy').innerHTML=`<strong>Real ${name} detected</strong><span>Hold still — something is waking</span>`;setVisionStatus(`${name} seen · ${Math.round(score*100)}%`,'seeing');
  if(state.scan>=100)reveal()
}
function clearDetectedClue(){
  state.scan=Math.max(0,state.scan-22);if(state.scan===0){state.stableClue=null;state.stableHits=0;$('#ar-target').classList.remove('visible')}
  $('#reticle').style.setProperty('--scan',`${state.scan}%`);$('#reticle').classList.remove('reticle-lock');
  $('#search-copy').innerHTML='<strong>Show me something real</strong><span>Hold a leaf or rock inside the circle</span>';setVisionStatus('Nature Lens is looking','ready')
}
async function scanNatureFrame(){
  if(state.visionMode!=='active'||state.visionBusy||state.discovered||document.querySelector('.sheet.open'))return;
  const canvas=drawCameraCrop();if(!canvas)return;state.visionBusy=true;
  try{
    const image=state.RawImage.fromCanvas(canvas);const labels=VISION_TARGETS.map(target=>target.label);
    const results=await state.classifier(image,labels,{hypothesis_template:'This is a photo of {}.'});
    const best=results[0],runnerUp=results[1];const target=VISION_TARGETS.find(item=>item.label===best?.label);
    if(target?.clue&&best.score>=.27&&best.score-(runnerUp?.score||0)>=.025)showDetectedClue(target.clue,best.score);else clearDetectedClue()
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
async function begin(){document.body.classList.add('playing');updateCount();await Promise.allSettled([startCamera(),startMotion()]);startLocation();startNatureLens()}
function toast(message){const el=$('#toast');el.textContent=message;el.classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove('show'),2600)}
function ping(freq,volume){try{state.audio||=new(window.AudioContext||window.webkitAudioContext)();const osc=state.audio.createOscillator(),gain=state.audio.createGain();osc.frequency.value=freq;osc.type='sine';gain.gain.setValueAtTime(volume,state.audio.currentTime);gain.gain.exponentialRampToValueAtTime(.001,state.audio.currentTime+.3);osc.connect(gain).connect(state.audio.destination);osc.start();osc.stop(state.audio.currentTime+.31)}catch{}}
function burst(){const rect=$('#ar-target').getBoundingClientRect();for(let i=0;i<18;i++){const spark=document.createElement('i');spark.className='spark';spark.style.left=`${rect.left+rect.width/2}px`;spark.style.top=`${rect.top+rect.height/2}px`;const angle=Math.random()*Math.PI*2,distance=40+Math.random()*100;spark.style.setProperty('--sx',`${Math.cos(angle)*distance}px`);spark.style.setProperty('--sy',`${Math.sin(angle)*distance}px`);document.body.append(spark);setTimeout(()=>spark.remove(),800)}}

$('#start-button').addEventListener('click',begin);$('#befriend').addEventListener('click',befriend);$('#ar-target').addEventListener('click',()=>state.discovered&&befriend());
$('#guide-button').addEventListener('click',()=>openSheet('guide-sheet'));$('#info-button').addEventListener('click',()=>openSheet('info-sheet'));document.querySelectorAll('.close-sheet').forEach(button=>button.addEventListener('click',closeSheets));
$('#hint-button').addEventListener('click',()=>{if(state.visionMode==='active'||state.visionMode==='loading'){toast('Fill the circle with one real leaf, rock, or flower and hold still');return}const diff=normalizeAngle(state.targetBearing-state.heading);toast(Math.abs(diff)<35?'Very close — hold the clue in the circle':diff>0?'Turn to your right':'Turn to your left')});
$('#flip-camera').addEventListener('click',async()=>{state.facing=state.facing==='environment'?'user':'environment';await startCamera()});
$('#new-trail').addEventListener('click',()=>{state.trailSeed=Date.now();try{localStorage.setItem('wildlings-trail-seed',state.trailSeed)}catch{}closeSheets();startLocation();toast('A new local trail has opened')});
window.addEventListener('pointerdown',event=>{if(event.target.closest('button,.sheet'))return;state.dragging=true;state.dragX=event.clientX});window.addEventListener('pointermove',event=>{if(!state.dragging||state.hasOrientation)return;state.heading=(state.heading-(event.clientX-state.dragX)*.38+360)%360;state.dragX=event.clientX});window.addEventListener('pointerup',()=>state.dragging=false);
window.addEventListener('keydown',event=>{if(event.key==='ArrowRight')state.heading=(state.heading+5)%360;if(event.key==='ArrowLeft')state.heading=(state.heading+355)%360;if(event.key==='Escape')closeSheets()});
setInterval(updateView,40);updateCount();
