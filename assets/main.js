(()=>{const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches,button=document.querySelector('.logo'),rotor=document.querySelector('.rotor'),cursor=document.querySelector('.cursor');let hover=false,angle=0,last=0,settle=null,ready=performance.now()+3000;button.addEventListener('pointerenter',()=>{hover=true;settle=null});button.addEventListener('pointerleave',()=>{hover=false;const rest=Math.round(angle/360)*360;settle={from:angle,to:rest,start:performance.now()}});button.addEventListener('click',()=>{if(reduced)return;angle=0;settle=null;rotor.style.transform='rotate(0deg)';ready=performance.now()+3000;document.querySelectorAll('.piece').forEach(el=>{el.style.animation='none';void el.offsetWidth;el.style.animation=''})});addEventListener('pointermove',e=>{if(e.pointerType!=='mouse')return;cursor.classList.add('visible');cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px'});document.documentElement.addEventListener('pointerleave',()=>cursor.classList.remove('visible'));function tick(t){const dt=last?Math.min(t-last,50):0;last=t;if(t>ready&&!reduced){if(hover||(matchMedia('(max-width:650px)').matches)){angle+=dt*360/7000}else if(settle){const progress=Math.min(1,(t-settle.start)/220);const eased=1-Math.pow(1-progress,3);angle=settle.from+(settle.to-settle.from)*eased;if(progress===1){angle=0;settle=null}}rotor.style.transform=`rotate(${angle}deg)`}if(!reduced)requestAnimationFrame(tick)}requestAnimationFrame(tick)})();
(()=>{
const page=document.querySelector('.page');
document.querySelectorAll('.project').forEach(card=>{
 let active=null,offset=0,offsetY=0;
 card.querySelector('img').draggable=false;
 card.addEventListener('pointerdown',e=>{
  if(e.button!==0||active)return;
  active={id:e.pointerId,start:e.clientX,startY:e.clientY,offset,offsetY};
  card.setPointerCapture(e.pointerId);card.classList.add('dragging');
  e.preventDefault();
 });
 card.addEventListener('pointermove',e=>{
  if(!active||active.id!==e.pointerId)return;
  const base=card.getBoundingClientRect().left-offset;
  const min=12-base,max=page.clientWidth-card.offsetWidth-12-base;
  offset=Math.max(min,Math.min(max,active.offset+e.clientX-active.start));
  const baseY=card.getBoundingClientRect().top-offsetY;offsetY=Math.max(12-baseY,Math.min(page.clientHeight-card.offsetHeight-12-baseY,active.offsetY+e.clientY-active.startY));card.style.transform=`translate(${offset}px,${offsetY}px)`;
 });
 function release(e){if(!active||active.id!==e.pointerId)return;active=null;card.classList.remove('dragging');if(card.hasPointerCapture(e.pointerId))card.releasePointerCapture(e.pointerId)}
 card.addEventListener('pointerup',release);card.addEventListener('pointercancel',release);card.addEventListener('lostpointercapture',()=>{active=null;card.classList.remove('dragging')});
 card.tabIndex=0;card.setAttribute('aria-label',card.querySelector('img').alt+' — ok tuşlarıyla taşıyabilirsiniz');
 card.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key))return;e.preventDefault();const rect=card.getBoundingClientRect(),base=rect.left-offset,baseY=rect.top-offsetY;if(e.key==='ArrowLeft'||e.key==='ArrowRight')offset=Math.max(12-base,Math.min(page.clientWidth-card.offsetWidth-12-base,offset+(e.key==='ArrowRight'?20:-20)));else offsetY=Math.max(12-baseY,Math.min(page.clientHeight-card.offsetHeight-12-baseY,offsetY+(e.key==='ArrowDown'?20:-20)));card.style.transform=`translate(${offset}px,${offsetY}px)`});
});
})();

(()=>{const page=document.querySelector('.page'),logo=document.querySelector('.logo'),cards=[...document.querySelectorAll('.project')];logo.addEventListener('pointerenter',()=>page.classList.add('logo-hover'));logo.addEventListener('pointerleave',()=>page.classList.remove('logo-hover'));cards.forEach(card=>{card.addEventListener('pointerenter',()=>{page.classList.add('project-hover');card.classList.add('is-hovered')});card.addEventListener('pointerleave',()=>{card.classList.remove('is-hovered');if(!cards.some(c=>c.classList.contains('is-hovered')))page.classList.remove('project-hover')})});})();
