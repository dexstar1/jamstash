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

(function(){"use strict";var a={initAll(){const a=document.querySelectorAll(".wp-block-kadence-advancedgallery .kt-blocks-carousel-init");this.bootstrapSliders(a);const b=document.querySelectorAll(".wp-block-kadence-testimonials .kt-blocks-carousel-init");this.bootstrapSliders(b);const c=document.querySelectorAll(".kb-blocks-bg-slider > .kt-blocks-carousel-init");this.bootstrapSliders(c)},bootstrapSliders(a){if(a&&0!==a.length)for(let c=0;c<a.length;c++){const d=a[c];if(!d||!d.children||d.classList.contains("is-initialized"))continue;d.classList.add("kb-splide");const e=this.createSplideElements(d),f=this.parseDataset(d.dataset),g=!!d.closest(".kadence-menu-mega-enabled");f.sliderDirection=document.querySelector("html[dir=\"rtl\"]")?"rtl":"ltr",d.addEventListener("load",function(a){a.classList.remove("kt-post-carousel-loading")});const h=this.getSplideOptions(f);d.classList.add("splide-initialized"),d.classList.add("splide-slider");const{sliderType:i}=f;if(i&&"fluidcarousel"===i){a[c].querySelectorAll(".kb-slide-item").forEach(function(b){b.style.maxWidth=a[c].clientWidth?Math.floor(80/100*a[c].clientWidth)+"px":"100%"});const e=a[c].querySelectorAll(".kb-slide-item").length,g=new Splide(d,{...h,focus:!1===f.sliderCenterMode?0:"center",autoWidth:!0,preloadPages:1>=e?0:Math.floor(e/2),arrows:!!(1<e)&&h.arrows,pagination:!!(1<e)&&h.pagination,drag:!!(1<e)&&h.drag,clones:1<e?void 0:0});g.mount();var b;window.addEventListener("resize",function(){clearTimeout(b),b=setTimeout(function(){a[c].querySelectorAll(".kb-slide-item").forEach(function(b){b.style.maxWidth=Math.floor(80/100*a[c].clientWidth)+"px"})},10)})}else if(i&&"slider"===i){h.type=void 0===f.sliderFade?"fade":f.sliderFade?"fade":"slide",h.rewind=!0;const a=new Splide(d,h);a.on("overflow",function(){a.options={arrows:1!==e&&h.arrows,pagination:1!==e&&h.pagination,drag:1!==e&&h.drag}}),a.mount()}else if(i&&"thumbnail"===i){const a=f.sliderNav,b=document.querySelector("#"+a);this.createSplideElements(b);const c=this.parseDataset(b.dataset),e=this.getSplideOptions(c),g=h;g.isNavigation=!0,g.pagination=!1,g.type="loop",g.arrows=!0,e.type=c.sliderFade||null==c.sliderFade?"fade":"slide",e.rewind=!0,e.pagination=!1,e.direction=g.direction,b.classList.add("slick-initialized"),b.classList.add("slick-slider"),b.classList.add("kb-splide");const i=new Splide(d,e),j=new Splide(b,g);j.on("overflow",function(a){j.go(0),j.options={arrows:!!g.arrows&&a,pagination:!!g.pagination&&a,drag:!!g.drag&&a,rewind:!a,type:a?g.type:"slide",clones:a?void 0:0}}),i.sync(j),i.mount(),j.mount()}else if(i&&"rewind"===i){h.type="slide",h.rewind=!0;const a=new Splide(d,h);g||a.on("overflow",function(b){a.go(0),a.options={arrows:!!h.arrows&&b,pagination:!!h.pagination&&b,drag:!!h.drag&&b,clones:b?void 0:0}}),a.mount()}else{const a=new Splide(d,h);g||a.on("overflow",function(b){a.go(0),a.options={arrows:!!h.arrows&&b,pagination:!!h.pagination&&b,drag:!!h.drag&&b,clones:b?void 0:0}}),a.mount()}}},parseDataset(a){return Object.keys(a).reduce((b,c)=>{const d=parseInt(a[c]);return Number.isNaN(d)?"true"===a[c]||"false"===a[c]?{...b,[c]:JSON.parse(a[c])}:{...b,[c]:a[c]}:{...b,[c]:d}},{})},createSplideElements(a){const b=a.children.length;for(const b of a.children)b.classList.add("splide__slide"),b.classList.contains("last")&&b.classList.remove("last");const c=document.createElement("div");c.classList.add("splide__track");const d=document.createElement("div");return d.classList.add("splide__list"),d.innerHTML=a.innerHTML,c.innerHTML=d.outerHTML,a.innerHTML=c.outerHTML,a.classList.add("splide"),b},getSplideOptions(a){const b=1===a.sliderScroll&&1,c={trimSpace:!0,drag:!0,perPage:a.columnsXxl||1,type:a.sliderFade?"fade":"loop",easing:a.sliderAnimSpeed&&1e3<a.sliderAnimSpeed?"linear":"cubic-bezier(0.25, 1, 0.5, 1)",lazyLoad:"nearby",autoplay:a.sliderAuto||!1,interval:a.sliderSpeed||7e3,speed:a.sliderAnimSpeed||400,arrows:a.sliderArrows||!1,pagination:a.sliderDots||!1,direction:a.sliderDirection,pauseOnHover:a.sliderPauseHover||!1,gap:a.sliderGap||0,breakpoints:{543:{perPage:a.columnsSs||1,perMove:b||a.scrollSs,gap:a.sliderGapMobile||0},767:{perPage:a.columnsXs||1,perMove:b||a.columnsXs,gap:a.sliderGapMobile||0},991:{perPage:a.columnsSm||1,perMove:b||a.columnsSm,gap:a.sliderGapTablet||0},1199:{perPage:a.columnsMd||1,perMove:b||a.columnsMd,gap:a.sliderGapTablet||0},1499:{perPage:a.columnsXl||1,perMove:b||a.columnsXl,gap:a.sliderGap||0}},classes:{prev:"splide__arrow--prev slick-prev",next:"splide__arrow--next slick-next"}};return(1===c.perPage||b)&&(c.focus=0,c.perMove=b||a.columnsXxl||1),c},init(){if("function"==typeof Splide)a.initAll();else var b=setInterval(function(){"function"==typeof Splide?(a.initAll(),clearInterval(b)):console.log("No Splide found")},200)}};"loading"===document.readyState?document.addEventListener("DOMContentLoaded",a.init):a.init(),document.addEventListener("kadenceJSInitReload",function(){a.init()})})();

}
/*
     FILE ARCHIVED ON 21:41:00 Apr 08, 2025 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 06:44:01 Sep 08, 2025.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.395
  exclusion.robots: 0.013
  exclusion.robots.policy: 0.007
  esindex: 0.008
  cdx.remote: 14.964
  LoadShardBlock: 570.137 (3)
  PetaboxLoader3.datanode: 476.965 (4)
  PetaboxLoader3.resolve: 77.084
  load_resource: 62.522
*/