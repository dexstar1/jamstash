var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

import*as t from"@wordpress/interactivity";var e={d:(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)};const n=(t=>{var n={};return e.d(n,t),n})({getContext:()=>t.getContext,getElement:()=>t.getElement,store:()=>t.store});let o=!1,a=0;const{state:r,actions:i,callbacks:l}=(0,n.store)("core/image",{state:{currentImageId:null,get currentImage(){return r.metadata[r.currentImageId]},get overlayOpened(){return null!==r.currentImageId},get roleAttribute(){return r.overlayOpened?"dialog":null},get ariaModal(){return r.overlayOpened?"true":null},get enlargedSrc(){return r.currentImage.uploadedSrc||"data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="},get figureStyles(){return r.overlayOpened&&`${r.currentImage.figureStyles?.replace(/margin[^;]*;?/g,"")};`},get imgStyles(){return r.overlayOpened&&`${r.currentImage.imgStyles?.replace(/;$/,"")}; object-fit:cover;`},get imageButtonRight(){const{imageId:t}=(0,n.getContext)();return r.metadata[t].imageButtonRight},get imageButtonTop(){const{imageId:t}=(0,n.getContext)();return r.metadata[t].imageButtonTop},get isContentHidden(){const t=(0,n.getContext)();return r.overlayEnabled&&r.currentImageId===t.imageId},get isContentVisible(){const t=(0,n.getContext)();return!r.overlayEnabled&&r.currentImageId===t.imageId}},actions:{showLightbox(){const{imageId:t}=(0,n.getContext)();r.metadata[t].imageRef?.complete&&(r.scrollTopReset=document.documentElement.scrollTop,r.scrollLeftReset=document.documentElement.scrollLeft,r.overlayEnabled=!0,r.currentImageId=t,l.setOverlayStyles())},hideLightbox(){r.overlayEnabled&&(r.showClosingAnimation=!0,r.overlayEnabled=!1,setTimeout((function(){r.currentImage.buttonRef.focus({preventScroll:!0}),r.currentImageId=null}),450))},handleKeydown(t){if(r.overlayEnabled){if("Tab"===t.key){t.preventDefault();const{ref:e}=(0,n.getElement)();e.querySelector("button").focus()}"Escape"===t.key&&i.hideLightbox()}},handleTouchMove(t){r.overlayEnabled&&t.preventDefault()},handleTouchStart(){o=!0},handleTouchEnd(){a=Date.now(),o=!1},handleScroll(){r.overlayOpened&&!o&&Date.now()-a>450&&window.scrollTo(r.scrollLeftReset,r.scrollTopReset)}},callbacks:{setOverlayStyles(){if(!r.overlayEnabled)return;let{naturalWidth:t,naturalHeight:e,offsetWidth:n,offsetHeight:o}=r.currentImage.imageRef,{x:a,y:i}=r.currentImage.imageRef.getBoundingClientRect();const l=t/e;let g=n/o;if("contain"===r.currentImage.scaleAttr)if(l>g){const t=n/l;i+=(o-t)/2,o=t}else{const t=o*l;a+=(n-t)/2,n=t}g=n/o;let c=parseFloat("none"!==r.currentImage.targetWidth?r.currentImage.targetWidth:t),s=parseFloat("none"!==r.currentImage.targetHeight?r.currentImage.targetHeight:e),d=c/s,u=c,m=s,h=c,p=s;if(l.toFixed(2)!==d.toFixed(2)){if(l>d){const t=c/l;s-t>c?(s=t,c=t*l):s=c/l}else{const t=s*l;c-t>s?(c=t,s=t/l):c=s*l}h=c,p=s,d=c/s,g>d?(u=c,m=u/g):(m=s,u=m*g)}(n>h||o>p)&&(h=n,p=o);let f=0;window.innerWidth>480?f=80:window.innerWidth>1920&&(f=160);const y=Math.min(window.innerWidth-f,h),b=Math.min(window.innerHeight-80,p);g>y/b?(h=y,p=h/g):(p=b,h=p*g);const w=n/h,I=c*(h/u),x=s*(p/m);r.overlayStyles=`\n\t\t\t\t:root {\n\t\t\t\t\t--wp--lightbox-initial-top-position: ${i}px;\n\t\t\t\t\t--wp--lightbox-initial-left-position: ${a}px;\n\t\t\t\t\t--wp--lightbox-container-width: ${h+1}px;\n\t\t\t\t\t--wp--lightbox-container-height: ${p+1}px;\n\t\t\t\t\t--wp--lightbox-image-width: ${I}px;\n\t\t\t\t\t--wp--lightbox-image-height: ${x}px;\n\t\t\t\t\t--wp--lightbox-scale: ${w};\n\t\t\t\t\t--wp--lightbox-scrollbar-width: ${window.innerWidth-document.documentElement.clientWidth}px;\n\t\t\t\t}\n\t\t\t`},setButtonStyles(){const{imageId:t}=(0,n.getContext)(),{ref:e}=(0,n.getElement)();r.metadata[t].imageRef=e,r.metadata[t].currentSrc=e.currentSrc;const{naturalWidth:o,naturalHeight:a,offsetWidth:i,offsetHeight:l}=e;if(0===o||0===a)return;const g=e.parentElement,c=e.parentElement.clientWidth;let s=e.parentElement.clientHeight;const d=g.querySelector("figcaption");if(d){const t=window.getComputedStyle(d);["absolute","fixed"].includes(t.position)||(s=s-d.offsetHeight-parseFloat(t.marginTop)-parseFloat(t.marginBottom))}const u=s-l,m=c-i;let h=u+16,p=m+16;if("contain"===r.metadata[t].scaleAttr){const t=o/a;if(t>=i/l){h=(l-i/t)/2+u+16,p=m+16}else{h=u+16,p=(i-l*t)/2+m+16}}r.metadata[t].imageButtonTop=h,r.metadata[t].imageButtonRight=p},setOverlayFocus(){if(r.overlayEnabled){const{ref:t}=(0,n.getElement)();t.focus()}},initTriggerButton(){const{imageId:t}=(0,n.getContext)(),{ref:e}=(0,n.getElement)();r.metadata[t].buttonRef=e}}},{lock:!0});

}
/*
     FILE ARCHIVED ON 21:40:44 Apr 08, 2025 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 06:42:58 Sep 08, 2025.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 1.5 (2)
  exclusion.robots: 0.054 (2)
  exclusion.robots.policy: 0.022 (2)
  esindex: 0.032 (2)
  cdx.remote: 18.761 (2)
  LoadShardBlock: 846.917 (6)
  PetaboxLoader3.datanode: 1520.536 (8)
  load_resource: 1063.74 (2)
  PetaboxLoader3.resolve: 325.111 (4)
*/