// Dependency-free validation of original CRASH LAB WAV export (Node 18+)
import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
const manifest=JSON.parse(readFileSync('audio/manifest.json','utf8'));
if(manifest.sounds.length!==24)throw new Error('Expected 24 sounds, got '+manifest.sounds.length);
const seen=new Set();let bytesTotal=0;
for(const spec of manifest.sounds){
 if(seen.has(spec.name))throw new Error('Duplicate clip: '+spec.name);seen.add(spec.name);
 const path='audio/wav/'+spec.name+'.wav';if(!existsSync(path))throw new Error('Missing: '+path);
 const wav=readFileSync(path);const head=wav.toString('ascii',0,4),format=wav.toString('ascii',8,12);
 if(head!=='RIFF'||format!=='WAVE'||wav.toString('ascii',12,16)!=='fmt '||wav.toString('ascii',36,40)!=='data')throw new Error('Not PCM WAV: '+path);
 if(wav.readUInt32LE(4)!==wav.length-8||wav.readUInt32LE(40)!==wav.length-44)throw new Error('Broken sizes: '+path);
 if(wav.readUInt16LE(20)!==1||wav.readUInt16LE(22)!==1||wav.readUInt32LE(24)!==22050||wav.readUInt16LE(34)!==16)throw new Error('Wrong format: '+path);
 const frames=(wav.length-44)/2;const seconds=frames/22050;if(Math.abs(seconds-spec.duration)>.002)throw new Error('Wrong duration: '+path);
 let peak=0,sum=0,first=0,last=0;
 for(let i=0;i<frames;i++){const x=wav.readInt16LE(44+2*i)/32768;peak=Math.max(peak,Math.abs(x));sum+=x*x;if(i<80)first=Math.max(first,Math.abs(x));if(i>=frames-80)last=Math.max(last,Math.abs(x));}
 const rms=Math.sqrt(sum/frames);
 if(rms<.003||peak>.90||first>.15||last>.15)throw new Error('Bad envelope / silence / clipping: '+path+' '+JSON.stringify({rms,peak,first,last}));
 const sha=createHash('sha256').update(wav).digest('hex').slice(0,12);console.log(spec.name.padEnd(22),Math.round(seconds*1000)+'ms', 'rms',rms.toFixed(3),'peak',peak.toFixed(3),'sha',sha);
 bytesTotal+=wav.length;
}
console.log('PASS:',seen.size,'original WAVs,',bytesTotal,'bytes, PCM16 mono @22.05kHz');
