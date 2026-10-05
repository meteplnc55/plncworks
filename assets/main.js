
(()=>{
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const canvas=document.querySelector('canvas'),ctx=canvas.getContext('2d'),page=document.querySelector('.page'),button=document.querySelector('.logo'),rotor=document.querySelector('.rotor'),cursor=document.querySelector('.cursor');
let w=innerWidth,h=innerHeight,hover=false,angle=0,last=0,start=performance.now(),burst=0,pointer={x:w/2,y:h/2},spin;
function resize(){w=innerWidth;h=innerHeight;const d=Math.min(devicePixelRatio,2);canvas.width=w*d;canvas.height=h*d;ctx.setTransform(d,0,0,d,0,0)}resize();addEventListener('resize',resize);
addEventListener('pointermove',e=>{pointer.x=e.clientX;pointer.y=e.clientY;page.style.setProperty('--px',(e.clientX/w-.5)*2);page.style.setProperty('--py',(e.clientY/h-.5)*2);if(e.pointerType==='mouse'){cursor.classList.add('visible');cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px'}});
document.documentElement.addEventListener('pointerleave',()=>cursor.classList.remove('visible'));
button.addEventListener('pointerenter',()=>{hover=true;cursor.classList.add('active')});button.addEventListener('pointerleave',()=>{hover=false;cursor.classList.remove('active')});
button.addEventListener('click',()=>{if(reduced)return;burst=performance.now();button.querySelectorAll('.piece').forEach(el=>{el.style.animation='none';void el.offsetWidth;el.style.animation='assemble 3s cubic-bezier(.7,0,.25,1) both'});if(spin)spin.cancel();rotor.style.transform='rotate(0deg)';angle=0;start=performance.now()});
function tick(now){const dt=Math.min(now-last,40);last=now;if(!reduced&&hover&&now-start>3300){angle+=dt*360/7000;rotor.style.transform=`rotate(${angle}deg)`}ctx.clearRect(0,0,w,h);const cx=w/2,cy=h*(w<600?.37:.4),elapsed=(now-start)/1000,appear=Math.max(0,Math.min(1,(elapsed-2.3)/2));
ctx.lineWidth=.6;const phase=reduced?0:now/14000;
for(let i=0;i<12;i++){const y=h*(.15+i*.058);const x=w*(.08+(i%4)*.02);ctx.strokeStyle=`rgba(30,30,30,${appear*(.025+(i%3)*.008)})`;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(w-x,y);ctx.stroke()}
for(let i=0;i<8;i++){const x=w*(.12+i*.11);ctx.strokeStyle=`rgba(30,30,30,${appear*.03})`;ctx.beginPath();ctx.moveTo(x,h*.13);ctx.lineTo(x,h*.87);ctx.stroke()}
for(let i=0;i<8;i++){const a=i*Math.PI/4+phase*.1;const r=Math.min(w*.32,300)*(1+.035*Math.sin(phase+i));const x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r*.65;const proximity=Math.max(0,1-Math.hypot(pointer.x-x,pointer.y-y)/180);ctx.strokeStyle=`rgba(30,30,30,${appear*(.12+proximity*.25)})`;ctx.beginPath();ctx.moveTo(x-4,y);ctx.lineTo(x+4,y);ctx.moveTo(x,y-4);ctx.lineTo(x,y+4);ctx.stroke();if(i%2===0){ctx.setLineDash([2,7]);ctx.strokeStyle=`rgba(30,30,30,${appear*.05})`;ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(x,y);ctx.stroke();ctx.setLineDash([])}}
if(burst&&now-burst<2000){const t=(now-burst)/2000;ctx.strokeStyle=`rgba(30,30,30,${(1-t)*.12})`;ctx.beginPath();ctx.arc(cx,cy,40+t*Math.min(w,h)*.7,0,Math.PI*2);ctx.stroke()}
if(!reduced)requestAnimationFrame(tick)}requestAnimationFrame(tick);
})();
