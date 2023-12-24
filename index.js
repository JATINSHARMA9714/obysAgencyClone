//locomotive
function loco(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}

loco();


function loadingAnimation(){
    //loader animation
var tl = gsap.timeline();

//line coming from bottom
tl.from(".line h1",{
    y:200,
    stagger:0.2,
    opacity:0
})

//increasing number
tl.from("#numbers",{
    opacity:0,
    duration:1,
    // increasing number animation 
    onStart:function(){
        var num = document.querySelector("#numbers h5");
        var grow = 0;
        
        setInterval(function(){
            if(grow<100){
            num.textContent = grow++;
            }
            else{
                num.textContent = 100;
            }
        
        },30);
    }
})

// adding animation to now button
tl.to(".line h2",{
    opacity:1,
    animationName:"anime"
})

// disappearing loader
tl.to("#loader",{
    opacity:0,
    duration:0.4,
    delay:2,
})

// turning loader display none
tl.to("#loader",{
    display:"none"
})
// new page lift animation
tl.from("#page1",{
    y:1200,
    duration:0.8,
    opacity:0
})

tl.from("#nav",{
    opacity:0
})

//new page coming same as loader
tl.from("#hero1 h1,#hero2 h1,#hero3 h2 ,#hero4 h1,#video-container img,#video-cursor",{
    y:100,
    stagger:0.15,
    opacity:0,
})

tl.to(".hero",{
    overflow:"visible"
})

}

loadingAnimation();


//cursor animation

function cursorAnimation(){
    Shery.mouseFollower({
        skew: true,
        ease: "cubic-bezier(0.23, 1, 0.320, 1)",
        duration: 1,
      });
    //magnet effect using sheryjs
Shery.makeMagnet("#part2 h5,#part1 svg");
}
cursorAnimation();


// about page animation
function lineAnimation(){
gsap.from("#page4-content h1",{
    y:100,
    opacity:0,
    overflow:"hidden",
    scrollTrigger:{
        trigger:"#page4-content h1",
        scroller:"#main",
        // markers:true,
        start:"top 80%"
    }
})

gsap.from("#underline1",{
    x:2000,
    stagger:0.5,
    scrollTrigger:{
        trigger:"#underline1",
        scroller:"#main",
        // markers:true,
        start:"top 80%"
    }
})
gsap.from("#underline2",{
    x:2000,
    scrollTrigger:{
        trigger:"#underline2",
        scroller:"#main",
        // markers:true,
        start:"top 80%"
    }
})
}
lineAnimation();