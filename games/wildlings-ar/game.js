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

const ADDITIONAL_ROSTER_GROUPS = [
  {template:'maple-mote',parentClue:'leaf',names:['Amber Sprig','Copper Canopy','Ruby Rustle','Golden Frond','Silver Vein'],clues:['oak-leaf','copper-beech-leaf','red-maple-leaf','fern-frond','eucalyptus-leaf']},
  {template:'mosskin',parentClue:'moss',names:['Velvet Mossling','Ferny Cushion','Emerald Nap','Lichen Loaf','Dewy Tuft'],clues:['sphagnum-moss','fiddlehead','fallen-log','lichen','dew-grass']},
  {template:'pebble-pip',parentClue:'stone',names:['Granite Skip','Quartz Nibble','Slate Scoot','Jasper Jot','Marble Munch'],clues:['granite','quartz','slate','jasper','marble']},
  {template:'barkback',parentClue:'bark',names:['Cedar Crinkle','Birch Bouncer','Oak Knurl','Willow Rind','Redwood Ruffle'],clues:['cedar-bark','birch-bark','oak-bark','willow-bark','redwood-bark']},
  {template:'puddle-purl',parentClue:'water',names:['Ripple Rollo','Brook Bubble','Rainy Rill','Lagoon Loop','Drizzle Drop'],clues:['pond-ripple','brook-water','raindrop','lagoon-water','morning-dew']},
  {template:'mooncap',parentClue:'mushroom',names:['Chanterelle Chuckle','Porcini Pounce','Inkcap Wink','Morel Muddle','Truffle Trot'],clues:['chanterelle','porcini','inkcap','morel','truffle']},
  {template:'clover-skip',parentClue:'clover',names:['Lucky Lilt','Shamrock Shuffle','Meadow Trefoil','Clover Curl','Greenwish'],clues:['red-clover','white-clover','birdsfoot-trefoil','wood-sorrel','four-leaf-clover']},
  {template:'pinecone-pal',parentClue:'cone',names:['Spruce Tumble','Fir Fidget','Cedar Conekin','Larch Loper','Sequoia Scale'],clues:['spruce-cone','fir-cone','cedar-cone','larch-cone','sequoia-cone']},
  {template:'tide-twill',parentClue:'shell',names:['Coral Coil','Pearl Paddle','Whelk Whirl','Scallop Skim','Nautilus Nod'],clues:['coral','oyster-shell','whelk-shell','scallop-shell','nautilus-shell']},
  {template:'cloudlet',parentClue:'cloud',names:['Nimbus Nudge','Cirrus Scoot','Cumulus Cuddle','Misty Mallow','Raincloud Roll'],clues:['storm-cloud','cirrus-cloud','cumulus-cloud','fog','mammatus-cloud']},
  {template:'acorn-orbit',parentClue:'acorn',names:['Oaklet Orbit','Chestnut Chuck','Hazel Hop','Bur Oak Bounce','Woodland Nutkin'],clues:['oak-acorn','chestnut','hazelnut','bur-oak-acorn','walnut']},
  {template:'reed-whistle',parentClue:'reed',names:['Cattail Cadence','Rush Ripple','Bulrush Beat','Sedge Song','Marsh Piper'],clues:['cattail','rush-grass','bulrush','sedge-grass','horsetail-reed']},
  {template:'brickbit',parentClue:'brick',names:['Terracotta Tuck','Clay Click','Mortar Mite','Ember Brickle','Cobble Kiln'],clues:['terracotta-tile','clay-brick','mortar','kiln-brick','cobblestone']},
  {template:'frost-fleck',parentClue:'snow',names:['Powder Pounce','Crystal Kip','Flurry Floof','Glacier Glint','Icicle Skip'],clues:['powder-snow','snowflake','snowball','glacier-ice','icicle']},
  {template:'cinderfinch',parentClue:'ash',names:['Sooty Spark','Charcoal Chirp','Ember Ashling','Cinder Swoop','Campfire Fleck'],clues:['soot','charcoal','wood-ember','burnt-leaf','campfire-ash']}
];
const ADDITIONAL_RARITIES=['Common','Common','Uncommon','Uncommon','Rare'];
const slugifyName=name=>name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
const ADDITIONAL_CREATURES=ADDITIONAL_ROSTER_GROUPS.flatMap(group=>{
  const habitatTemplate=BASE_CREATURES.find(creature=>creature.id===group.template);
  return group.names.map((name,variantIndex)=>({
    ...habitatTemplate,
    id:`regional-${slugifyName(name)}`,
    name,
    clue:group.clues[variantIndex],
    rarity:ADDITIONAL_RARITIES[variantIndex],
    bio:`A one-of-a-kind Wildling that wakes for ${group.clues[variantIndex].replaceAll('-',' ')}.`
  }))
});
const NEW_CREATURES=[
  {id:'quillkip',name:'Quillkip',clue:'barred-owl-feather',rarity:'Rare',bio:'Bounds through the bracken with one magnificent feather held high.',habitat:'woodland'},
  {id:'craggle',name:'Craggle',clue:'sunburst-lichen',rarity:'Rare',bio:'Carries a tiny golden garden across its patient stone back.',habitat:'dry'},
  {id:'podkin',name:'Podkin',clue:'milkweed-pod',rarity:'Uncommon',bio:'Keeps every wandering seed tucked safely aboard.',habitat:'meadow'},
  {id:'bramblebum',name:'Bramblebum',clue:'blackberry',rarity:'Uncommon',bio:'Polishes each berry on its shell before breakfast.',habitat:'woodland'},
  {id:'tide-twig',name:'Tide Twig',clue:'driftwood',rarity:'Rare',bio:'Side-steps along the tide line collecting wave-smoothed knots.',habitat:'coast'},
  {id:'dewloom',name:'Dewloom',clue:'dew-spiderweb',rarity:'Legendary',bio:'Spins the roundest morning webs and wears one like a crown.',habitat:'woodland'}
];
const CREATURES=[...BASE_CREATURES,...ADDITIONAL_CREATURES,...NEW_CREATURES];

const SPECIFIC_CLUES = [
  {clue:'oak-leaf',parent:'leaf',label:'Oak Leaf',camera:'an oak leaf with clearly shaped lobes'},
  {clue:'copper-beech-leaf',parent:'leaf',label:'Copper Beech Leaf',camera:'a dark copper or purple oval beech leaf'},
  {clue:'red-maple-leaf',parent:'leaf',label:'Red Maple Leaf',camera:'a red maple leaf with pointed lobes'},
  {clue:'fern-frond',parent:'leaf',label:'Fern Frond',camera:'a long feather-shaped green fern frond'},
  {clue:'eucalyptus-leaf',parent:'leaf',label:'Eucalyptus Leaf',camera:'a long smooth silver-green eucalyptus leaf'},
  {clue:'sphagnum-moss',parent:'moss',label:'Sphagnum Moss',camera:'a soft wet clump of pale sphagnum moss'},
  {clue:'fiddlehead',parent:'leaf',label:'Fiddlehead',camera:'a tightly curled young fern fiddlehead'},
  {clue:'fallen-log',parent:'bark',label:'Fallen Log',camera:'a small fallen log covered with plants'},
  {clue:'lichen',parent:'moss',label:'Lichen',camera:'a flat crusty patch of pale green lichen'},
  {clue:'dew-grass',parent:'leaf',label:'Dewy Grass',camera:'grass blades covered with round dew drops'},
  {clue:'granite',parent:'stone',label:'Granite',camera:'a rough salt-and-pepper granite rock with visible black white and pink mineral grains'},
  {clue:'quartz',parent:'stone',label:'Quartz Crystal',camera:'a clear or white pointed quartz crystal'},
  {clue:'slate',parent:'stone',label:'Slate',camera:'a thin flat layered blue-gray slate slab'},
  {clue:'jasper',parent:'stone',label:'Jasper',camera:'a smooth polished opaque solid-red jasper gemstone without visible crystal grains'},
  {clue:'marble',parent:'stone',label:'Marble',camera:'a smooth white marble stone with long flowing gray veins'},
  {clue:'cedar-bark',parent:'bark',label:'Cedar Bark',camera:'stringy reddish cedar tree bark'},
  {clue:'birch-bark',parent:'bark',label:'Birch Bark',camera:'white peeling birch bark with dark marks'},
  {clue:'oak-bark',parent:'bark',label:'Oak Bark',camera:'deeply ridged gray-brown oak tree bark'},
  {clue:'willow-bark',parent:'bark',label:'Willow Bark',camera:'rough gray willow tree bark with narrow ridges'},
  {clue:'redwood-bark',parent:'bark',label:'Redwood Bark',camera:'thick soft red fibrous redwood bark'},
  {clue:'pond-ripple',parent:'water',label:'Pond Ripple',camera:'circular ripples spreading across pond water'},
  {clue:'brook-water',parent:'water',label:'Brook Water',camera:'clear shallow moving brook water over pebbles'},
  {clue:'raindrop',parent:'water',label:'Raindrop',camera:'a large round raindrop resting on a surface'},
  {clue:'lagoon-water',parent:'water',label:'Lagoon Water',camera:'still turquoise lagoon or pond water'},
  {clue:'morning-dew',parent:'water',label:'Morning Dew',camera:'a single bright dew drop on a leaf'},
  {clue:'chanterelle',parent:'mushroom',label:'Chanterelle',camera:'a golden trumpet-shaped chanterelle mushroom'},
  {clue:'porcini',parent:'mushroom',label:'Porcini',camera:'a stout porcini mushroom with a thick pale stem and brown cap'},
  {clue:'inkcap',parent:'mushroom',label:'Inkcap',camera:'a tall dark inkcap mushroom with a narrow cap'},
  {clue:'morel',parent:'mushroom',label:'Morel',camera:'a morel mushroom with a honeycomb-textured cap'},
  {clue:'truffle',parent:'mushroom',label:'Truffle',camera:'a round knobbly dark truffle fungus'},
  {clue:'red-clover',parent:'clover',label:'Red Clover',camera:'a red clover plant with a round pink flower head'},
  {clue:'white-clover',parent:'clover',label:'White Clover',camera:'a white clover plant with a round white flower head'},
  {clue:'birdsfoot-trefoil',parent:'clover',label:'Bird’s-foot Trefoil',camera:'birds-foot trefoil with small yellow pea-shaped flowers'},
  {clue:'wood-sorrel',parent:'clover',label:'Wood Sorrel',camera:'wood sorrel with three heart-shaped leaflets'},
  {clue:'four-leaf-clover',parent:'clover',label:'Four-leaf Clover',camera:'one clover leaf with exactly four leaflets'},
  {clue:'spruce-cone',parent:'cone',label:'Spruce Cone',camera:'a long papery spruce cone'},
  {clue:'fir-cone',parent:'cone',label:'Fir Cone',camera:'an upright compact fir cone'},
  {clue:'cedar-cone',parent:'cone',label:'Cedar Cone',camera:'a small round woody cedar cone shaped like a rosette'},
  {clue:'larch-cone',parent:'cone',label:'Larch Cone',camera:'a small oval larch cone among soft needles'},
  {clue:'sequoia-cone',parent:'cone',label:'Sequoia Cone',camera:'a small hard oval sequoia cone with thick scales'},
  {clue:'coral',parent:'shell',label:'Coral',camera:'a branching piece of coral'},
  {clue:'oyster-shell',parent:'shell',label:'Oyster Shell',camera:'a rough irregular layered oyster shell'},
  {clue:'whelk-shell',parent:'shell',label:'Whelk Shell',camera:'a tall pointed spiral whelk shell'},
  {clue:'scallop-shell',parent:'shell',label:'Scallop Shell',camera:'a fan-shaped ridged scallop shell'},
  {clue:'nautilus-shell',parent:'shell',label:'Nautilus Shell',camera:'a smooth cream spiral nautilus shell'},
  {clue:'storm-cloud',parent:'cloud',label:'Storm Cloud',camera:'a dark towering storm cloud'},
  {clue:'cirrus-cloud',parent:'cloud',label:'Cirrus Cloud',camera:'thin wispy feather-like cirrus clouds'},
  {clue:'cumulus-cloud',parent:'cloud',label:'Cumulus Cloud',camera:'a bright white puffy cumulus cloud'},
  {clue:'fog',parent:'cloud',label:'Fog',camera:'a low blanket of mist or fog'},
  {clue:'mammatus-cloud',parent:'cloud',label:'Mammatus Cloud',camera:'a cloud with many rounded pouch shapes underneath'},
  {clue:'oak-acorn',parent:'acorn',label:'Oak Acorn',camera:'a smooth oak acorn with a shallow scaly cap'},
  {clue:'chestnut',parent:'acorn',label:'Chestnut',camera:'a glossy brown chestnut with a pointed tip'},
  {clue:'hazelnut',parent:'acorn',label:'Hazelnut',camera:'a small round hazelnut partly inside a leafy husk'},
  {clue:'bur-oak-acorn',parent:'acorn',label:'Bur Oak Acorn',camera:'an acorn with a large shaggy fringed cap'},
  {clue:'walnut',parent:'acorn',label:'Walnut',camera:'a deeply wrinkled walnut shell'},
  {clue:'cattail',parent:'reed',label:'Cattail',camera:'a tall reed with a brown sausage-shaped cattail head'},
  {clue:'rush-grass',parent:'reed',label:'Rush Grass',camera:'a clump of round upright green rush stems'},
  {clue:'bulrush',parent:'reed',label:'Bulrush',camera:'a tall bulrush with a loose brown flower cluster'},
  {clue:'sedge-grass',parent:'reed',label:'Sedge Grass',camera:'a triangular-stem sedge with narrow arching leaves'},
  {clue:'horsetail-reed',parent:'reed',label:'Horsetail Reed',camera:'a segmented green horsetail plant with jointed stems'},
  {clue:'terracotta-tile',parent:'brick',label:'Terracotta Tile',camera:'a curved orange terracotta roof tile'},
  {clue:'clay-brick',parent:'brick',label:'Clay Brick',camera:'a rectangular red clay brick'},
  {clue:'mortar',parent:'brick',label:'Mortar',camera:'rough pale mortar between bricks'},
  {clue:'kiln-brick',parent:'brick',label:'Kiln Brick',camera:'a pale heat-scorched refractory kiln brick'},
  {clue:'cobblestone',parent:'stone',label:'Cobblestone',camera:'a rounded worn cobblestone paving rock'},
  {clue:'powder-snow',parent:'snow',label:'Powder Snow',camera:'a loose mound of fresh powder snow'},
  {clue:'snowflake',parent:'snow',label:'Snowflake',camera:'one visible six-point snowflake crystal'},
  {clue:'snowball',parent:'snow',label:'Snowball',camera:'a compact round handmade snowball'},
  {clue:'glacier-ice',parent:'snow',label:'Glacier Ice',camera:'dense blue translucent glacier ice'},
  {clue:'icicle',parent:'snow',label:'Icicle',camera:'a long clear hanging icicle'},
  {clue:'soot',parent:'ash',label:'Soot',camera:'fine black soot coating a surface'},
  {clue:'charcoal',parent:'ash',label:'Charcoal',camera:'a black porous lump of wood charcoal'},
  {clue:'wood-ember',parent:'ash',label:'Wood Ember',camera:'a safe glowing red wood ember'},
  {clue:'burnt-leaf',parent:'leaf',label:'Burnt Leaf',camera:'a blackened curled burnt leaf'},
  {clue:'campfire-ash',parent:'ash',label:'Campfire Ash',camera:'a cold pale pile of campfire ash'},
  {clue:'barred-owl-feather',parent:'feather',label:'Barred Owl Feather',camera:'one brown and cream feather with bold horizontal bars'},
  {clue:'sunburst-lichen',parent:'lichen',label:'Sunburst Lichen',camera:'a flat golden-orange rosette of sunburst lichen growing on rock'},
  {clue:'milkweed-pod',parent:'seedpod',label:'Milkweed Pod',camera:'one dry split milkweed seed pod with rows of flat brown seeds'},
  {clue:'blackberry',parent:'berry',label:'Blackberry',camera:'one ripe blackberry made of many glossy dark purple round lobes'},
  {clue:'driftwood',parent:'driftwood',label:'Driftwood',camera:'one pale weathered branch of wave-smoothed driftwood'},
  {clue:'dew-spiderweb',parent:'web',label:'Dew-covered Spiderweb',camera:'a complete circular spiderweb covered with bright round dew drops'}
];
const SPECIFIC_CLUE_BY_ID=new Map(SPECIFIC_CLUES.map(item=>[item.clue,item]));

const CLUE_LABELS={leaf:'tree leaf',moss:'patch of moss',stone:'small rock',flower:'flower',dandelion:'dandelion',sunflower:'sunflower',rose:'rose',daisy:'daisy',poppy:'poppy',bluebell:'bluebell',lotus:'lotus',snapdragon:'snapdragon',bark:'tree bark',water:'rain puddle',mushroom:'mushroom',clover:'clover',cone:'pinecone',shell:'seashell',cloud:'cloud',acorn:'acorn',reed:'river reed',brick:'brick',snow:'snow',ash:'wood ash',starlight:'pinprick of light',feather:'bird feather',lichen:'golden lichen',seedpod:'seed pod',berry:'dark berry',driftwood:'driftwood branch',web:'spiderweb',...Object.fromEntries(SPECIFIC_CLUES.map(item=>[item.clue,item.label.toLowerCase()]))};
const SPECIES_LABELS={leaf:'Tree Leaf',moss:'Moss Patch',stone:'Small Rock',dandelion:'Dandelion',sunflower:'Sunflower',rose:'Rose',daisy:'Daisy',poppy:'Poppy',bluebell:'Bluebell',lotus:'Lotus',snapdragon:'Snapdragon',bark:'Tree Bark',water:'Rain Puddle',mushroom:'Mushroom',clover:'Clover',cone:'Pinecone',shell:'Seashell',cloud:'Cloud',acorn:'Acorn',reed:'River Reed',brick:'Brick',snow:'Snow',ash:'Wood Ash',starlight:'Starlight',feather:'Bird Feather',lichen:'Lichen',seedpod:'Seed Pod',berry:'Berry',driftwood:'Driftwood',web:'Spiderweb',...Object.fromEntries(SPECIFIC_CLUES.map(item=>[item.clue,item.label]))};
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
  {label:'one bird feather',clue:'feather'},
  {label:'a crusty patch of yellow or orange lichen on a rock',clue:'lichen'},
  {label:'one dry seed pod',clue:'seedpod'},
  {label:'one dark berry fruit',clue:'berry'},
  {label:'one weathered piece of driftwood',clue:'driftwood'},
  {label:'one visible circular spider web',clue:'web'},
  {label:'a bright star or small point of light',clue:'starlight'},
  {label:'only a human hand',clue:null},
  {label:'only a person\'s face',clue:null},
  {label:'an indoor room',clue:null},
  {label:'an empty outdoor scene',clue:null},
  {label:'blurry camera motion',clue:null},
  {label:'plain grass or soil with no centered object',clue:null}
];
const REFINEMENT_TARGETS_BY_PARENT=Object.fromEntries([...new Set(SPECIFIC_CLUES.map(item=>item.parent))].map(parent=>[parent,SPECIFIC_CLUES.filter(item=>item.parent===parent).flatMap(item=>[
  {label:item.camera,clue:item.clue},
  {label:`one clearly visible ${item.label.toLowerCase()} centered in a close-up nature photo`,clue:item.clue}
])]));
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
  {label:'a pink Antirrhinum snapdragon flower with a two-lipped dragon-mouth shape',clue:'snapdragon'},
  {label:'several pink Antirrhinum snapdragon blossoms growing along a tall upright stem',clue:'snapdragon'},
  {label:'a snapdragon plant with narrow leaves and hooded tubular dragon-mouth flowers',clue:'snapdragon'},
  {label:'a different kind of flower not described here',clue:null},
  {label:'only green leaves with no visible flower',clue:null},
  {label:'a hand or background rather than one flower',clue:null}
];
const CAMERA_VIEWS=[
  {key:'tight',label:'tight',scale:1.05},
  {key:'natural',label:'natural',scale:1.35},
  {key:'context',label:'context',scale:1.7}
];
const $=query=>document.querySelector(query);
const storedFound=()=>{try{return JSON.parse(localStorage.getItem('wildlings-found')||'[]')}catch{return []}};
const storedTrailSeed=()=>{try{return Number(localStorage.getItem('wildlings-trail-seed'))||20260802}catch{return 20260802}};
const storedWalkProgress=()=>{try{return JSON.parse(localStorage.getItem('wildlings-walk-progress')||'{}')}catch{return {}}};
const storedWalkCompanion=()=>{try{return localStorage.getItem('wildlings-walk-companion')||''}catch{return ''}};
const state={heading:0,targetBearing:110,hasOrientation:false,dragging:false,dragX:0,scan:0,discovered:false,active:null,queue:[],queueIndex:0,found:new Set(storedFound()),trailSeed:storedTrailSeed(),facing:'environment',stream:null,habitat:'meadow',audio:null,cameraReady:false,visionMode:'idle',classifier:null,RawImage:null,visionBusy:false,photoMode:false,photoRequested:false,stableClue:null,stableHits:0,stableViewCount:0,stableScoreTotal:0,detectionHistory:[],cropIndex:0,catching:false,caught:false,catchHits:0,catchX:0,catchY:0,catchVX:0,catchVY:0,catchFrame:0,catchLastTime:0,catchStartTime:0,catchDeadline:0,catchSecond:-1,catchNextDodge:0,catchNextTrail:0,catchNextBoost:0,catchSlowUntil:0,catchBoosts:0,catchBoostVisible:false,catchReadyTimer:0,guideQuery:'',walkCompanionId:storedWalkCompanion(),walkProgress:storedWalkProgress(),walkWatchId:null,lastWalkPosition:null};

function seeded(seed){let value=seed>>>0;return()=>{value+=0x6d2b79f5;let mixed=value;mixed=Math.imul(mixed^(mixed>>>15),mixed|1);mixed^=mixed+Math.imul(mixed^(mixed>>>7),mixed|61);return((mixed^(mixed>>>14))>>>0)/4294967296}}
function hashString(value){let h=2166136261;for(const char of value){h^=char.charCodeAt(0);h=Math.imul(h,16777619)}return h>>>0}
function normalizeAngle(angle){return((angle+540)%360)-180}
function shuffle(items,random){const copy=[...items];for(let index=copy.length-1;index>0;index--){const other=Math.floor(random()*(index+1));[copy[index],copy[other]]=[copy[other],copy[index]]}return copy}

function creatureArt(c,mini=false){
  const alt=mini?c.name:'';
  const loading=mini?' loading="lazy"':'';
  return `<img class="wildling-sprite" src="assets/creatures/${c.id}.png" alt="${alt}"${loading}>`
}

function clueArt(type){
  type=SPECIFIC_CLUE_BY_ID.get(type)?.parent||type;
  const line=`stroke="#172019" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"`;
  if(type==='leaf'||type==='clover')return`<svg viewBox="0 0 160 160"><path d="M80 137V69" ${line}/><path d="M79 82C50 68 28 42 31 22c14 8 29 6 42 23 8-14 17-22 28-29 1 16 9 25 26 31-7 20-23 37-48 35Z" fill="${type==='leaf'?'#c85a39':'#5d995e'}" ${line}/>${type==='clover'?'<circle cx="61" cy="48" r="19" fill="#69a769"/><circle cx="91" cy="45" r="19" fill="#69a769"/><circle cx="79" cy="67" r="19" fill="#69a769"/>':''}</svg>`;
  if(type==='flower'||FLOWER_CLUES.has(type)){const colors={dandelion:'#efe1a1',sunflower:'#e9b52d',rose:'#cf493d',daisy:'#f4f0e5',poppy:'#df4d37',bluebell:'#587fc2',lotus:'#f0d79f',snapdragon:'#e89a31'};return`<svg viewBox="0 0 160 160"><path d="M80 137V77" ${line}/><g fill="${colors[type]||'#f1d56e'}" ${line}><circle cx="80" cy="47" r="18"/><circle cx="55" cy="63" r="18"/><circle cx="105" cy="63" r="18"/><circle cx="66" cy="89" r="18"/><circle cx="94" cy="89" r="18"/></g><circle cx="80" cy="69" r="15" fill="${type==='daisy'?'#e3a82f':'#8a613c'}"/></svg>`}
  if(type==='feather')return`<svg viewBox="0 0 160 160"><path d="M40 132c25-43 47-75 83-105" fill="none" ${line}/><path d="M52 111C28 62 64 25 124 24c2 44-20 79-72 87Z" fill="#d7bf92" ${line}/><path d="m61 92 48-43M68 78 46 68m39-6L65 48m32 2L82 35" fill="none" ${line}/></svg>`;
  if(type==='lichen')return`<svg viewBox="0 0 160 160"><path d="m29 116 15-67 46-25 40 34-3 59-51 20Z" fill="#6d716c" ${line}/><g fill="#e2a92e" stroke="#172019" stroke-width="2"><circle cx="64" cy="67" r="22"/><circle cx="93" cy="56" r="20"/><circle cx="102" cy="88" r="25"/><circle cx="61" cy="104" r="19"/></g></svg>`;
  if(type==='seedpod')return`<svg viewBox="0 0 160 160"><path d="M28 91q47-74 104-31-12 62-90 60Z" fill="#b99058" ${line}/><path d="M35 91q47 7 90-26M44 104q44 1 68-24" fill="none" ${line}/><g fill="#ead9b7"><ellipse cx="65" cy="85" rx="8" ry="4"/><ellipse cx="83" cy="81" rx="8" ry="4"/><ellipse cx="101" cy="73" rx="8" ry="4"/></g></svg>`;
  if(type==='berry')return`<svg viewBox="0 0 160 160"><path d="M82 38q15-22 34-18-5 18-24 27" fill="#6d8759" ${line}/><g fill="#4e3868" ${line}><circle cx="63" cy="60" r="20"/><circle cx="91" cy="58" r="21"/><circle cx="113" cy="76" r="20"/><circle cx="47" cy="85" r="20"/><circle cx="77" cy="87" r="22"/><circle cx="101" cy="104" r="21"/><circle cx="59" cy="117" r="19"/></g></svg>`;
  if(type==='driftwood')return`<svg viewBox="0 0 160 160"><path d="M25 113q43-19 58-53 14-31 46-34-23 30-15 49 7 18 22 37-31-14-54 2-29 20-57-1Z" fill="#bda783" ${line}/><path d="M70 79 44 54m39 7 8-34m21 49 26-12" fill="none" ${line}/></svg>`;
  if(type==='web')return`<svg viewBox="0 0 160 160"><g fill="none" ${line}><circle cx="80" cy="79" r="58"/><circle cx="80" cy="79" r="39"/><circle cx="80" cy="79" r="20"/><path d="M80 21v116M22 79h116M39 38l82 82m0-82-82 82"/></g><g fill="#d6eef0"><circle cx="39" cy="38" r="6"/><circle cx="121" cy="79" r="5"/><circle cx="80" cy="21" r="5"/></g></svg>`;
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
  resetCatchState();state.photoMode=false;state.photoRequested=false;document.body.classList.remove('photo-captured','photo-flashing');const capture=$('#capture-photo');capture.hidden=false;capture.disabled=state.visionMode!=='active';capture.querySelector('span').textContent='Take photo';
  if(state.visionMode==='loading'||state.visionMode==='active'){
    state.active=null;state.discovered=false;state.scan=0;state.stableClue=null;state.stableHits=0;state.stableViewCount=0;state.stableScoreTotal=0;state.detectionHistory=[];
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
  if(state.discovered)return;state.discovered=true;state.caught=false;$('#capture-photo').hidden=true;const target=$('#ar-target');target.classList.add('visible','discovered');target.setAttribute('aria-label',`${state.active.name} is getting ready to run`);$('#reticle').classList.remove('reticle-lock','reticle-checking');$('#edge-arrow').classList.remove('show');$('#discovery-card').classList.remove('show');
  const identified=SPECIES_LABELS[state.active.clue]||state.active.clue;if(state.photoMode){$('#search-copy').innerHTML=`<strong>Photo identified: ${identified}</strong><span>${state.active.name} is waking up</span>`;setVisionStatus(`Photo match · ${identified}`,'seeing')}else{$('#search-copy').innerHTML=`<strong>${state.active.name} spotted you!</strong><span>Get ready to catch it</span>`;setVisionStatus(state.visionMode==='active'?`Confirmed · ${state.stableHits} matches · ${state.stableViewCount} views`:'Creature found · chase starting','seeing')}
  $('#discovery-rarity').textContent=`${state.active.rarity} · ${identified} wildling`;$('#discovery-name').textContent=state.active.name;$('#discovery-copy').textContent=state.active.bio;ping(620,.08);setTimeout(()=>ping(880,.1),90);state.catchReadyTimer=setTimeout(startCatch,state.photoMode?950:520)
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
  $('#field-grid').innerHTML=visible.length?visible.map(c=>{const found=state.found.has(c.id),species=SPECIES_LABELS[c.clue]||c.clue,walking=state.walkCompanionId===c.id,status=found?`${c.rarity} · Lv ${walkLevelFor(c.id)}`:'Species clue';return`<article class="field-card ${found?'':'unknown'} ${walking?'walking':''}" aria-label="${found?c.name:`Unknown ${species} Wildling`}"><div class="mini-art" aria-hidden="true">${creatureArt(c,true)}</div><strong>${found?c.name:'Unknown'}</strong><small class="species-label">${species}</small><small class="profile-status">${status}</small>${found?`<button class="walk-button" data-walk-id="${c.id}" ${walking?'disabled':''}>${walking?'Walking':'Walk together'}</button>`:''}</article>`}).join(''):'<p class="guide-empty">No Wildlings match that search.</p>'
}
function openSheet(id){if(state.catching){toast(`Catch ${state.active.name} first!`);return}document.querySelectorAll('.sheet').forEach(s=>s.classList.toggle('open',s.id===id));if(id==='guide-sheet')renderGuide()}
function closeSheets(){document.querySelectorAll('.sheet').forEach(s=>s.classList.remove('open'))}

function resetCatchState(){
  cancelAnimationFrame(state.catchFrame);clearTimeout(state.catchReadyTimer);state.catching=false;state.caught=false;state.catchHits=0;state.catchFrame=0;state.catchLastTime=0;state.catchStartTime=0;state.catchDeadline=0;state.catchSecond=-1;state.catchNextDodge=0;state.catchNextTrail=0;state.catchNextBoost=0;state.catchSlowUntil=0;state.catchBoosts=0;state.catchBoostVisible=false;document.body.classList.remove('catch-mode');$('#catch-progress')?.classList.remove('show');$('#catch-progress')?.querySelectorAll('i').forEach(mark=>mark.classList.remove('caught'));$('#catch-meter')?.classList.remove('show','hurry');$('#chase-boost')?.classList.remove('show','collected');document.querySelectorAll('.chase-trail').forEach(trail=>trail.remove())
}
function renderCatchProgress(){
  const progress=$('#catch-progress');progress.querySelectorAll('i').forEach((mark,index)=>mark.classList.toggle('caught',index<state.catchHits));progress.setAttribute('aria-label',`${state.catchHits} of 3 catch taps`)
}
function catchBounds(target){
  const halfWidth=target.offsetWidth/2,halfHeight=target.offsetHeight/2,minY=Math.max(270,Math.min(350,window.innerHeight*.42));
  return{minX:halfWidth+12,maxX:Math.max(halfWidth+12,window.innerWidth-halfWidth-12),minY,maxY:Math.max(minY,window.innerHeight-halfHeight-88)}
}
function dropCatchTrail(target){
  const rect=target.getBoundingClientRect(),trail=document.createElement('i');trail.className='chase-trail';trail.style.left=`${rect.left+rect.width/2}px`;trail.style.top=`${rect.top+rect.height/2}px`;document.body.append(trail);setTimeout(()=>trail.remove(),500)
}
function dodgeCatch(time){
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;if(reduced)return;const target=$('#ar-target'),angle=Math.random()*Math.PI*2,speed=154+state.catchHits*32+Math.random()*30;state.catchVX=Math.cos(angle)*speed;state.catchVY=Math.sin(angle)*speed;state.catchNextDodge=time+850+Math.random()*850;target.classList.add('dashing');setTimeout(()=>target.classList.remove('dashing'),260);setVisionStatus(`Dodge! · ${3-state.catchHits} taps left`,'chase');ping(430,.035)
}
function placeCatchBoost(){
  if(!state.catching||state.catchBoostVisible||state.catchBoosts>=2)return;const boost=$('#chase-boost'),margin=55,minY=Math.max(280,window.innerHeight*.38),maxY=Math.max(minY+20,window.innerHeight-175);boost.style.left=`${margin+Math.random()*Math.max(20,window.innerWidth-margin*2)}px`;boost.style.top=`${minY+Math.random()*(maxY-minY)}px`;boost.classList.add('show');state.catchBoostVisible=true
}
function collectCatchBoost(){
  if(!state.catching||!state.catchBoostVisible)return;const now=performance.now(),boost=$('#chase-boost');state.catchBoostVisible=false;state.catchBoosts+=1;state.catchDeadline+=2000;state.catchSlowUntil=now+1800;state.catchVX*=.48;state.catchVY*=.48;state.catchNextBoost=state.catchBoosts<2?now+3200:Infinity;boost.classList.add('collected');boost.classList.remove('show');setTimeout(()=>boost.classList.remove('collected'),360);setVisionStatus('Calm leaf! · +2s and slow','chase');ping(980,.085)
}
function animateCatch(time){
  if(!state.catching)return;if(time>=state.catchDeadline){escapeCatch();return}const target=$('#ar-target'),bounds=catchBounds(target),delta=state.catchLastTime?Math.min(.04,(time-state.catchLastTime)/1000):0,pace=time<state.catchSlowUntil?.48:1;state.catchLastTime=time;if(time>=state.catchNextDodge)dodgeCatch(time);if(time>=state.catchNextTrail){dropCatchTrail(target);state.catchNextTrail=time+130}if(time>=state.catchNextBoost){placeCatchBoost();state.catchNextBoost=Infinity}state.catchX+=state.catchVX*delta*pace;state.catchY+=state.catchVY*delta*pace;
  if(state.catchX<=bounds.minX||state.catchX>=bounds.maxX){state.catchX=Math.max(bounds.minX,Math.min(bounds.maxX,state.catchX));state.catchVX*=-1}
  if(state.catchY<=bounds.minY||state.catchY>=bounds.maxY){state.catchY=Math.max(bounds.minY,Math.min(bounds.maxY,state.catchY));state.catchVY*=-1}
  target.style.left=`${state.catchX}px`;target.style.top=`${state.catchY}px`;const seconds=Math.max(0,Math.ceil((state.catchDeadline-time)/1000)),total=Math.max(1,state.catchDeadline-state.catchStartTime),timePercent=Math.max(0,Math.min(100,(state.catchDeadline-time)/total*100)),meter=$('#catch-meter');meter.style.setProperty('--chase-time',`${timePercent}%`);meter.classList.toggle('hurry',seconds<=5);if(seconds!==state.catchSecond){state.catchSecond=seconds;setVisionStatus(`${seconds}s left · ${3-state.catchHits} taps to catch`,'chase')}
  state.catchFrame=requestAnimationFrame(animateCatch)
}
function startCatch(){
  if(!state.discovered||state.caught)return;const target=$('#ar-target'),reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches,speed=reducedMotion?62:118,angle=(Math.random()*.7+.18)*Math.PI*(Math.random()<.5?1:-1),now=performance.now();state.catching=true;state.catchHits=0;state.catchX=window.innerWidth/2;state.catchY=Math.max(300,window.innerHeight*.56);state.catchVX=Math.cos(angle)*speed;state.catchVY=Math.sin(angle)*speed;state.catchLastTime=0;state.catchStartTime=now;state.catchDeadline=now+15000;state.catchSecond=-1;state.catchNextDodge=reducedMotion?Infinity:now+800;state.catchNextTrail=reducedMotion?Infinity:now+120;state.catchNextBoost=now+1800;state.catchSlowUntil=0;state.catchBoosts=0;state.catchBoostVisible=false;
  document.body.classList.add('catch-mode');target.classList.add('catching');target.setAttribute('aria-label',`Catch ${state.active.name}. Zero of three taps.`);$('#catch-progress').classList.add('show');$('#catch-meter').classList.add('show');$('#catch-meter').style.setProperty('--chase-time','100%');renderCatchProgress();$('#search-copy').innerHTML=`<strong>Catch ${state.active.name}!</strong><span>Tap three times · grab a golden calm leaf</span>`;state.catchFrame=requestAnimationFrame(animateCatch)
}
function attemptCatch(){
  if(!state.catching)return;state.catchHits+=1;renderCatchProgress();const target=$('#ar-target');target.classList.remove('tagged');void target.offsetWidth;target.classList.add('tagged');setTimeout(()=>target.classList.remove('tagged'),220);ping(710+state.catchHits*90,.08);
  if(state.catchHits>=3){completeCatch();return}const speed=(window.matchMedia('(prefers-reduced-motion: reduce)').matches?68:132)+state.catchHits*28,angle=Math.random()*Math.PI*2;state.catchVX=Math.cos(angle)*speed;state.catchVY=Math.sin(angle)*speed;state.catchNextDodge=performance.now()+500;target.setAttribute('aria-label',`Catch ${state.active.name}. ${state.catchHits} of three taps.`);$('#search-copy').innerHTML=`<strong>${state.catchHits===1?'Nice tag!':'Almost yours!'}</strong><span>${3-state.catchHits} more ${3-state.catchHits===1?'tap':'taps'} · watch the next dodge</span>`
}
function completeCatch(){
  cancelAnimationFrame(state.catchFrame);state.catchFrame=0;state.catching=false;state.caught=true;const elapsed=(performance.now()-state.catchStartTime)/1000,rating=elapsed<5?'Lightning catch!':elapsed<9?'Swift catch!':'Great catch!',target=$('#ar-target');target.classList.remove('catching','tagged','dashing');target.classList.add('caught');target.style.left='50%';target.style.top='43%';target.setAttribute('aria-label',`${state.active.name} was caught and can now be befriended`);$('#catch-progress').classList.remove('show');$('#catch-meter').classList.remove('show','hurry');$('#chase-boost').classList.remove('show');state.catchBoostVisible=false;document.querySelectorAll('.chase-trail').forEach(trail=>trail.remove());$('#search-copy').innerHTML=`<strong>${rating}</strong><span>You caught ${state.active.name} · now become friends</span>`;setVisionStatus(`${rating.replace('!','')} · ${elapsed.toFixed(1)}s`,'seeing');burst();setTimeout(()=>$('#discovery-card').classList.add('show'),320)
}
function escapeCatch(){
  cancelAnimationFrame(state.catchFrame);state.catchFrame=0;state.catching=false;state.caught=false;state.catchBoostVisible=false;document.body.classList.remove('catch-mode');const target=$('#ar-target');target.classList.remove('catching','tagged','dashing');target.classList.add('escaping');target.style.left=state.catchVX>=0?`${window.innerWidth+150}px`:'-150px';target.style.top=`${Math.max(160,Math.min(window.innerHeight-120,state.catchY+state.catchVY*.5))}px`;target.setAttribute('aria-label',`${state.active.name} escaped`);$('#catch-progress').classList.remove('show');$('#catch-meter').classList.remove('show','hurry');$('#chase-boost').classList.remove('show');document.querySelectorAll('.chase-trail').forEach(trail=>trail.remove());$('#search-copy').innerHTML=`<strong>${state.active.name} got away!</strong><span>Show the clue again for another chance</span>`;setVisionStatus('Escaped · try the clue again','ready');toast('So close! It scampered away');setTimeout(spawnNext,1050)
}

async function startCamera(){
  if(!navigator.mediaDevices?.getUserMedia){toast('Camera unavailable — field demo is active');return}
  try{
    state.cameraReady=false;$('#capture-photo').disabled=true;clearDetectedClue('Starting the camera','Keep the object zone clear','Camera is focusing');
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
async function refocusCamera(){
  const track=state.stream?.getVideoTracks?.()[0];if(!track){toast('Open the camera first');return}
  const capabilities=track.getCapabilities?.()||{},focusModes=capabilities.focusMode||[];
  try{
    if(focusModes.includes('single-shot')){
      await track.applyConstraints({advanced:[{focusMode:'single-shot'}]});toast('Refocusing on the object zone');
      if(focusModes.includes('continuous'))setTimeout(()=>track.applyConstraints({advanced:[{focusMode:'continuous'}]}).catch(()=>{}),900)
    }else if(focusModes.includes('continuous')){await track.applyConstraints({advanced:[{focusMode:'continuous'}]});toast('Continuous focus refreshed')}
    else toast('This camera focuses automatically')
  }catch{toast('This camera focuses automatically')}
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
  const {data}=canvas.getContext('2d',{willReadFrequently:true}).getImageData(0,0,canvas.width,canvas.height);let total=0,squared=0,edges=0,samples=0;const signature=[];
  for(let y=2;y<canvas.height;y+=3){for(let x=2;x<canvas.width;x+=3){const i=(y*canvas.width+x)*4,left=i-8,above=i-canvas.width*8;const lum=data[i]*.2126+data[i+1]*.7152+data[i+2]*.0722;const lumLeft=data[left]*.2126+data[left+1]*.7152+data[left+2]*.0722;const lumAbove=data[above]*.2126+data[above+1]*.7152+data[above+2]*.0722;total+=lum;squared+=lum*lum;edges+=(Math.abs(lum-lumLeft)+Math.abs(lum-lumAbove))/2;samples++}}
  for(let y=14;y<canvas.height;y+=28){for(let x=14;x<canvas.width;x+=28){const i=(y*canvas.width+x)*4;signature.push(data[i]*.2126+data[i+1]*.7152+data[i+2]*.0722)}}
  const mean=total/samples,contrast=Math.sqrt(Math.max(0,squared/samples-mean*mean));return{mean,contrast,edge:edges/samples,signature}
}
function frameMotion(first,second){
  if(!first?.length||first.length!==second?.length)return 0;return first.reduce((total,value,index)=>total+Math.abs(value-second[index]),0)/first.length
}
function drawCameraCrop(view=CAMERA_VIEWS[1],source=$('#camera')){
  const video=$('#camera'),canvas=$('#vision-canvas'),reticle=$('#reticle');if(video.readyState<2||!video.videoWidth)return null;
  const videoRect=video.getBoundingClientRect(),targetRect=reticle.getBoundingClientRect(),scale=Math.max(videoRect.width/video.videoWidth,videoRect.height/video.videoHeight);
  const renderedWidth=video.videoWidth*scale,renderedHeight=video.videoHeight*scale,offsetX=(renderedWidth-videoRect.width)/2,offsetY=(renderedHeight-videoRect.height)/2;
  let centerX=(targetRect.left+targetRect.width/2-videoRect.left+offsetX)/scale;const centerY=(targetRect.top+targetRect.height/2-videoRect.top+offsetY)/scale;
  if(state.facing==='user')centerX=video.videoWidth-centerX;
  const requestedSize=Math.max(targetRect.width,targetRect.height)*view.scale/scale,size=Math.min(requestedSize,video.videoWidth,video.videoHeight);
  const sx=Math.max(0,Math.min(video.videoWidth-size,centerX-size/2)),sy=Math.max(0,Math.min(video.videoHeight-size,centerY-size/2));
  const context=canvas.getContext('2d',{willReadFrequently:true});context.clearRect(0,0,canvas.width,canvas.height);context.drawImage(source,sx,sy,size,size,0,0,canvas.width,canvas.height);return{canvas,quality:frameQuality(canvas),view}
}
function requiredVisionMatches(){return state.photoMode?2:4}
function showPossibleClue(clue){
  const needed=requiredVisionMatches(),name=CLUE_LABELS[clue]||clue;state.scan=Math.min(92,state.stableHits*(68/needed)+state.stableViewCount*12);$('#reticle').style.setProperty('--scan',`${state.scan}%`);$('#reticle').classList.add('reticle-checking');$('#reticle').classList.remove('reticle-lock');
  $('#search-copy').innerHTML=`<strong>Checking ${name}</strong><span>${state.photoMode?'Reading the captured photo':'Keep only that object inside the circle'}</span>`;setVisionStatus(`${name} · ${state.stableHits}/${needed} matches · ${state.stableViewCount}/2 views`,'checking')
}
function showDetectedClue(clue,score,viewCount=state.stableViewCount){
  state.active=creatureForClue(clue);
  const target=$('#ar-target');
  if(!target.dataset.clue||target.dataset.clue!==clue){target.dataset.clue=clue;target.innerHTML=`<div class="clue-art">${clueArt(clue)}</div><div class="creature-art">${creatureArt(state.active)}</div>`}
  target.className='ar-target visible';target.style.left='50%';target.style.top='50%';
  state.scan=100;$('#reticle').style.setProperty('--scan','100%');$('#reticle').classList.remove('reticle-checking');$('#reticle').classList.add('reticle-lock');
  const name=CLUE_LABELS[clue]||clue;$('#search-copy').innerHTML=`<strong>Real ${name} detected</strong><span>Confirmed from more than one view</span>`;setVisionStatus(`${name} confirmed · ${viewCount} views`,'seeing');
  reveal()
}
function clearDetectedClue(message='Center one outdoor object',detail='Fill the circle and hold still',status='Nature Lens is looking'){
  state.scan=0;state.stableClue=null;state.stableHits=0;state.stableViewCount=0;state.stableScoreTotal=0;state.detectionHistory=[];$('#ar-target').classList.remove('visible');
  $('#reticle').style.setProperty('--scan','0%');$('#reticle').classList.remove('reticle-lock','reticle-checking');
  $('#search-copy').innerHTML=`<strong>${message}</strong><span>${detail}</span>`;setVisionStatus(status,'ready')
}
function showUncertainDetection(message='Not sure yet',detail='Keep one object centered',status='Checking the object'){
  state.detectionHistory.push(null);if(state.detectionHistory.length>6)state.detectionHistory.shift();
  state.scan=Math.max(0,state.scan-18);$('#reticle').style.setProperty('--scan',`${state.scan}%`);$('#reticle').classList.toggle('reticle-checking',state.scan>0);$('#reticle').classList.remove('reticle-lock');
  $('#search-copy').innerHTML=`<strong>${message}</strong><span>${detail}</span>`;setVisionStatus(status,state.scan>0?'checking':'ready')
}
function pickVisionTarget(results,targets,{minScore=.14,minMargin=.018,minDominance=1.16}={}){
  const best=results[0],runnerUp=results[1],target=targets.find(item=>item.label===best?.label),margin=best.score-(runnerUp?.score||0),dominance=best.score/Math.max(.001,runnerUp?.score||0);
  return target?.clue&&best.score>=minScore&&margin>=minMargin&&dominance>=minDominance?{target,score:best.score}:null
}
function pickGroupedVisionTarget(results,targets,{minScore=.08,minMargin=.01,minDominance=1.08}={}){
  const groups=new Map();for(const result of results){const target=targets.find(item=>item.label===result.label),key=target?.clue||'other',group=groups.get(key)||{total:0,count:0};group.total+=result.score;group.count+=1;groups.set(key,group)}
  const means=[...groups.entries()].map(([clue,group])=>[clue,group.total/group.count]),meanTotal=means.reduce((total,[,score])=>total+score,0)||1,ranked=means.map(([clue,score])=>[clue,score/meanTotal]).sort((a,b)=>b[1]-a[1]),[bestClue,bestScore]=ranked[0]||['other',0],[runnerClue,runnerScore]=ranked[1]||['other',0],margin=bestScore-runnerScore,dominance=bestScore/Math.max(.001,runnerScore);
  const poppySnapdragon=new Set([bestClue,runnerClue]);if(poppySnapdragon.has('poppy')&&poppySnapdragon.has('snapdragon')&&(margin<.018||dominance<1.16))return{ambiguous:true,bestClue,runnerClue,score:bestScore};
  const target=targets.find(item=>item.clue===bestClue);return bestClue!=='other'&&target&&bestScore>=minScore&&margin>=minMargin&&dominance>=minDominance?{target,score:bestScore,runnerClue}:null
}
function rememberDetectedClue(clue,score,viewKey='natural'){
  state.detectionHistory.push({clue,score,viewKey});if(state.detectionHistory.length>6)state.detectionHistory.shift();
  const matches=state.detectionHistory.filter(item=>item?.clue===clue);state.stableClue=clue;state.stableHits=matches.length;state.stableViewCount=new Set(matches.map(item=>item.viewKey)).size;state.stableScoreTotal=matches.reduce((total,item)=>total+item.score,0);
  if(state.stableHits>=requiredVisionMatches()&&state.stableViewCount>=2)showDetectedClue(clue,state.stableScoreTotal/state.stableHits,state.stableViewCount);else showPossibleClue(clue)
}
async function analyzeNatureFrame(frame){
  const {view}=frame;
  if(frame.quality.mean<18&&frame.quality.contrast<14){clearDetectedClue('The view is too dark','Find more light, then try again','More light needed');return}
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
  }else{
    const refinementTargets=REFINEMENT_TARGETS_BY_PARENT[clue];
    if(refinementTargets?.length){
      const broadName=SPECIES_LABELS[clue]||clue;setVisionStatus(`${broadName} seen · identifying exact clue`,'checking');
      const refinementResults=await state.classifier(image,refinementTargets.map(target=>target.label),{hypothesis_template:'The exact outdoor object in the center is {}.'});
      const exactMatch=pickGroupedVisionTarget(refinementResults,refinementTargets,{minScore:.1,minMargin:.025,minDominance:1.12});
      if(!exactMatch){setVisionStatus(`Exact type unclear · checking ${broadName}`,'checking');rememberDetectedClue(clue,score*.8,view.key);return}
      clue=exactMatch.target.clue;score=(score+exactMatch.score)/2
    }
  }
  rememberDetectedClue(clue,score,view.key)
}
async function scanNatureFrame(){
  if(state.visionMode!=='active'||state.visionBusy||state.photoMode||state.discovered||document.querySelector('.sheet.open'))return;
  const view=CAMERA_VIEWS[state.cropIndex%CAMERA_VIEWS.length];state.cropIndex=(state.cropIndex+1)%CAMERA_VIEWS.length;const firstFrame=drawCameraCrop(view);if(!firstFrame)return;state.visionBusy=true;
  try{
    await new Promise(resolve=>setTimeout(resolve,90));const frame=drawCameraCrop(view);if(!frame)return;
    if(frameMotion(firstFrame.quality.signature,frame.quality.signature)>26){showUncertainDetection('Hold a little steadier','Pause the object inside the circle','Camera movement detected');return}
    await analyzeNatureFrame(frame)
  }catch(error){console.warn('Nature Lens frame skipped',error);clearDetectedClue()}finally{state.visionBusy=false;if(state.photoRequested&&!state.discovered){state.photoRequested=false;takeNaturePhoto()}}
}
function setCaptureButton(label,disabled=false){const button=$('#capture-photo');button.querySelector('span').textContent=label;button.disabled=disabled}
function resumeLiveCamera(){
  state.photoMode=false;state.photoRequested=false;document.body.classList.remove('photo-captured','photo-flashing');setCaptureButton('Take photo');clearDetectedClue('Center one outdoor object','Fill the circle, then take a photo','Ready for a photo')
}
async function takeNaturePhoto(){
  if(state.photoMode){resumeLiveCamera();return}
  if(!state.cameraReady){toast('Camera unavailable');return}
  if(state.visionMode==='loading'){toast('The precision lens is still loading');return}
  if(state.visionMode!=='active'){toast('The identification lens is offline');return}
  if(state.discovered){return}if(state.visionBusy){state.photoRequested=true;setCaptureButton('Taking photo…',true);return}
  const video=$('#camera'),preview=$('#photo-preview');if(video.readyState<2||!video.videoWidth){toast('Camera is still focusing');return}
  preview.width=video.videoWidth;preview.height=video.videoHeight;preview.getContext('2d').drawImage(video,0,0,preview.width,preview.height);
  state.photoMode=true;clearDetectedClue('Photo captured','Checking the object inside the circle','Reading captured photo');setCaptureButton('Reading photo…',true);document.body.classList.add('photo-captured','photo-flashing');setTimeout(()=>document.body.classList.remove('photo-flashing'),300);ping(520,.045);state.visionBusy=true;
  try{
    await new Promise(resolve=>setTimeout(resolve,80));
    for(const view of CAMERA_VIEWS){const frame=drawCameraCrop(view,preview);if(!frame)continue;setVisionStatus(`Checking ${view.label} photo view`,'checking');await analyzeNatureFrame(frame);if(state.discovered)break}
    if(!state.discovered){$('#search-copy').innerHTML='<strong>Photo needs another try</strong><span>Move closer or change the angle</span>';setVisionStatus('No two photo views agreed','ready');setCaptureButton('Retake photo')}
  }catch(error){console.warn('Nature Lens photo skipped',error);$('#search-copy').innerHTML='<strong>Could not read this photo</strong><span>Retake it with the object centered</span>';setVisionStatus('Photo identification paused','ready');setCaptureButton('Retake photo')}
  finally{state.visionBusy=false}
}
async function visionLoop(){
  if(state.visionMode!=='active')return;await scanNatureFrame();setTimeout(visionLoop,950)
}
async function startNatureLens(){
  if(!state.cameraReady){state.visionMode='fallback';setVisionStatus('Virtual trail · camera unavailable');return}
  state.visionMode='loading';$('#reticle').classList.add('vision-ready');setVisionStatus('Loading Nature Lens · first play');spawnNext();
  try{
    const module=await import('https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.7.3');state.RawImage=module.RawImage;
    state.classifier=await module.pipeline('zero-shot-image-classification','Xenova/clip-vit-base-patch16',{dtype:'q8',progress_callback:data=>{if(Number.isFinite(data.progress))setVisionStatus(`Learning precision lens · ${Math.round(data.progress)}%`)}});
    state.visionMode='active';setVisionStatus('Precision Lens is looking','ready');spawnNext();visionLoop()
  }catch(error){console.warn('Nature Lens unavailable',error);state.visionMode='fallback';$('#reticle').classList.remove('vision-ready');setVisionStatus('Virtual trail · lens offline');toast('Nature Lens could not load — virtual trail is active');if(state.queue.length)spawnNext()}
}
async function begin(){document.body.classList.add('playing');updateCount();updateWalkChip();startWalkTracking();await Promise.allSettled([startCamera(),startMotion()]);startLocation();startNatureLens()}
function toast(message){const el=$('#toast');el.textContent=message;el.classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove('show'),2600)}
function ping(freq,volume){try{state.audio||=new(window.AudioContext||window.webkitAudioContext)();const osc=state.audio.createOscillator(),gain=state.audio.createGain();osc.frequency.value=freq;osc.type='sine';gain.gain.setValueAtTime(volume,state.audio.currentTime);gain.gain.exponentialRampToValueAtTime(.001,state.audio.currentTime+.3);osc.connect(gain).connect(state.audio.destination);osc.start();osc.stop(state.audio.currentTime+.31)}catch{}}
function burst(){const rect=$('#ar-target').getBoundingClientRect();for(let i=0;i<18;i++){const spark=document.createElement('i');spark.className='spark';spark.style.left=`${rect.left+rect.width/2}px`;spark.style.top=`${rect.top+rect.height/2}px`;const angle=Math.random()*Math.PI*2,distance=40+Math.random()*100;spark.style.setProperty('--sx',`${Math.cos(angle)*distance}px`);spark.style.setProperty('--sy',`${Math.sin(angle)*distance}px`);document.body.append(spark);setTimeout(()=>spark.remove(),800)}}

$('#start-button').addEventListener('click',begin);$('#befriend').addEventListener('click',befriend);$('#ar-target').addEventListener('click',attemptCatch);
$('#chase-boost').addEventListener('click',collectCatchBoost);
$('#capture-photo').addEventListener('click',takeNaturePhoto);
$('#guide-button').addEventListener('click',()=>openSheet('guide-sheet'));$('#info-button').addEventListener('click',()=>openSheet('info-sheet'));document.querySelectorAll('.close-sheet').forEach(button=>button.addEventListener('click',closeSheets));
$('#guide-search').addEventListener('input',event=>{state.guideQuery=event.target.value;renderGuide()});
$('#field-grid').addEventListener('click',event=>{const button=event.target.closest('.walk-button');if(button)selectWalkCompanion(button.dataset.walkId)});
$('#walk-chip').addEventListener('click',()=>openSheet('guide-sheet'));
$('#hint-button').addEventListener('click',()=>{if(state.visionMode==='active'||state.visionMode==='loading'){toast('Fill the circle with one outdoor object, then tap Take photo');return}const diff=normalizeAngle(state.targetBearing-state.heading);toast(Math.abs(diff)<35?'Very close — hold the clue in the circle':diff>0?'Turn to your right':'Turn to your left')});
$('#flip-camera').addEventListener('click',async()=>{state.facing=state.facing==='environment'?'user':'environment';await startCamera()});
$('#refocus-camera').addEventListener('click',refocusCamera);
$('#new-trail').addEventListener('click',()=>{state.trailSeed=Date.now();try{localStorage.setItem('wildlings-trail-seed',state.trailSeed)}catch{}closeSheets();startLocation();toast('A new local trail has opened')});
window.addEventListener('pointerdown',event=>{if(event.target.closest('button,.sheet'))return;state.dragging=true;state.dragX=event.clientX});window.addEventListener('pointermove',event=>{if(!state.dragging||state.hasOrientation)return;state.heading=(state.heading-(event.clientX-state.dragX)*.38+360)%360;state.dragX=event.clientX});window.addEventListener('pointerup',()=>state.dragging=false);
window.addEventListener('keydown',event=>{if(event.key==='ArrowRight')state.heading=(state.heading+5)%360;if(event.key==='ArrowLeft')state.heading=(state.heading+355)%360;if(event.key==='Escape')closeSheets()});
setInterval(updateView,40);updateCount();
