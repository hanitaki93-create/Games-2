// CRASH LAB — original procedural WAV generator, CC0-1.0
// Run from repo root with Node >= 18: node tools/generate-sfx.mjs
import {mkdirSync,writeFileSync} from "node:fs";
const defs=[{"name":"draw_touch","category":"Drawing","duration":0.12,"kind":"ink","variant":0},{"name":"draw_glide_a","category":"Drawing","duration":0.12,"kind":"ink","variant":1},{"name":"draw_glide_b","category":"Drawing","duration":0.12,"kind":"ink","variant":2},{"name":"ink_release_a","category":"Release","duration":0.23,"kind":"release","variant":0},{"name":"ink_release_b","category":"Release","duration":0.23,"kind":"release","variant":1},{"name":"soft_bonk_a","category":"Impacts","duration":0.17,"kind":"impact","variant":0},{"name":"soft_bonk_b","category":"Impacts","duration":0.17,"kind":"impact","variant":1},{"name":"spring_bounce_a","category":"Impacts","duration":0.26,"kind":"bounce","variant":0},{"name":"spring_bounce_b","category":"Impacts","duration":0.26,"kind":"bounce","variant":1},{"name":"metal_hit_a","category":"Impacts","duration":0.3,"kind":"metal","variant":0},{"name":"metal_hit_b","category":"Impacts","duration":0.3,"kind":"metal","variant":1},{"name":"pip_scared_a","category":"Pip","duration":0.35,"kind":"pipfear","variant":0},{"name":"pip_scared_b","category":"Pip","duration":0.35,"kind":"pipfear","variant":1},{"name":"pip_cheer","category":"Pip","duration":0.45,"kind":"pipjoy","variant":0},{"name":"pip_oops","category":"Pip","duration":0.42,"kind":"pipfail","variant":0},{"name":"pod_lock","category":"Machinery","duration":0.19,"kind":"impact","variant":2},{"name":"pod_whoosh","category":"Machinery","duration":0.36,"kind":"whoosh","variant":0},{"name":"near_miss","category":"Reactions","duration":0.4,"kind":"near","variant":0},{"name":"retry","category":"Reactions","duration":0.1,"kind":"ui","variant":0},{"name":"star_one","category":"Stars","duration":0.23,"kind":"star","variant":0},{"name":"star_two","category":"Stars","duration":0.23,"kind":"star","variant":1},{"name":"star_three","category":"Stars","duration":0.23,"kind":"star","variant":2},{"name":"victory","category":"Outcomes","duration":0.9,"kind":"victory","variant":0},{"name":"comic_loss","category":"Outcomes","duration":0.73,"kind":"loss","variant":0}];
function synth(r){
 const sr=22050,n=Math.floor(sr*r.duration),bytes=new Uint8Array(44+2*n),v=new DataView(bytes.buffer),wave=new Float32Array(n);
 const tau=2*Math.PI,sw=(t,a,b)=>Math.sin(tau*(a*t+(b-a)*t*t/(2*r.duration))),note=(t,start,f,d)=>{let x=t-start;return x<0?0:Math.min(1,130*x)*Math.exp(-x*d)*(Math.sin(tau*f*x)+.17*Math.sin(tau*2*f*x));};
 let seed=(1234567+r.variant*691+r.name.length*131)>>>0,noise=0,max=0,avg=0;
 for(let i=0;i<n;i++){
 let t=i/sr,x=t/r.duration;
 seed^=seed<<13;seed^=seed>>>17;seed^=seed<<5;let rand=(seed>>>0)/2147483648-1;
 noise+=(rand-noise)*.08;let s=0,k=r.variant;
 switch(r.kind){
 case "ink":s=Math.exp(-t*22)*(.68*sw(t,700+k*60,370+k*110)+.28*noise);break;
 case "release":s=Math.exp(-t*10)*(.73*sw(t,390+k*55,910+k*55)+.16*noise);break;
 case "impact":s=Math.exp(-t*25)*(.65*sw(t,160+k*90,65+k*20)+.28*rand+.2*noise);break;
 case "bounce":s=Math.exp(-t*10)*(.8*sw(t,460+k*60,160+k*40)+.2*noise);break;
 case "metal":s=Math.exp(-t*13)*(.46*Math.sin(tau*(560+k*80)*t)+.31*Math.sin(tau*(1280+k*90)*t)+.16*Math.sin(tau*2130*t))+Math.exp(-t*31)*rand*.2;break;
 case "pipfear":s=Math.exp(-t*5.2)*sw(t,920+k*80,540+k*90)*(1+.13*Math.sin(tau*15*t));break;
 case "pipjoy":s=.66*note(t,0,700,12)+.69*note(t,.14,990,9)+.48*note(t,.29,1160,12);break;
 case "pipfail":s=.65*note(t,0,590,8)+.59*note(t,.17,375,8)+.41*note(t,.31,240,9);break;
 case "whoosh":s=Math.sin(Math.PI*x)**2*(noise+.08*sw(t,400,145));break;
 case "near":s=.6*note(t,0,622,10)+.5*note(t,.16,740,10);break;
 case "ui":s=Math.exp(-t*38)*(.8*sw(t,970,640)+.11*rand);break;
 case "star":s=.8*note(t,0,[784,988,1175][k],14);break;
 case "victory":s=.45*note(t,0,523,5)+.52*note(t,.13,659,5)+.52*note(t,.27,784,5)+.65*note(t,.42,1046,4);break;
 case "loss":s=.54*note(t,0,392,7)+.48*note(t,.17,330,7)+.6*note(t,.4,196,7);break;
 }
 s*=Math.max(0,Math.min(1,t*170,(r.duration-t)*70));wave[i]=s;max=Math.max(max,Math.abs(s));avg+=s;
 }
 avg/=n;let pk=0,rs=0;for(let i=0;i<n;i++){let s=Math.max(-.89,Math.min(.89,(wave[i]-avg)*.78/(max||1)));v.setInt16(44+2*i,Math.round(s*32767),true);pk=Math.max(pk,Math.abs(s));rs+=s*s;}
 function str(o,s){for(let i=0;i<4;i++)bytes[o+i]=s.charCodeAt(i);}
 str(0,"RIFF");v.setUint32(4,bytes.length-8,true);str(8,"WAVE");str(12,"fmt ");v.setUint32(16,16,true);v.setUint16(20,1,true);v.setUint16(22,1,true);v.setUint32(24,sr,true);v.setUint32(28,2*sr,true);v.setUint16(32,2,true);v.setUint16(34,16,true);str(36,"data");v.setUint32(40,2*n,true);
 return {bytes,peak:Math.round(pk*1000)/1000,rms:Math.round(Math.sqrt(rs/n)*1000)/1000};
}
mkdirSync("audio/wav",{recursive:true});
for(const r of defs)writeFileSync("audio/wav/"+r.name+".wav",Buffer.from(synth(r).bytes));
console.log("Exported",defs.length,"WAV sounds");
