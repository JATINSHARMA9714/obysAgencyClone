//locomotive
function locomotive(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
  mobile: {
    smooth: true,
    inertia: 0.8,
    getDirection: true,
  }
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

//loading animation
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
//cursor animation
function cursorAnimation(){
    Shery.mouseFollower({
        skew: true,
        ease: "cubic-bezier(0.23, 1, 0.320, 1)",
        duration: 1,
      });
}
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
            start:"top 90%",
            end:"top 40%",
            scrub:true
        }
    })
    
    gsap.from("#underline1",{
        x:2000,
        stagger:0.5,
        scrollTrigger:{
            trigger:"#underline1",
            scroller:"#main",
            // markers:true,
            start:"top 90%",
            end:"top 40%",
            scrub:true
        }
    })
    gsap.from("#underline2",{
        x:2000,
        scrollTrigger:{
            trigger:"#underline2",
            scroller:"#main",
            // markers:true,
            start:"top 90%",
            end:"top 40%",
            scrub:true
        }
    })
}
//image wobble effect
function sheryAnimation() {
    Shery.imageEffect(".image-div", {
      style: 5,
      gooey: true,
    //   debug:true,
      config:{"a":{"value":2,"range":[0,30]},"b":{"value":-0.97,"range":[-1,1]},"zindex":{"value":-9996999,"range":[-9999999,9999999]},"aspect":{"value":0.8226458888580629},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":true},"infiniteGooey":{"value":false},"growSize":{"value":4,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":false},"maskVal":{"value":1,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":0},"noise_speed":{"value":0.46,"range":[0,10]},"metaball":{"value":0.34,"range":[0,2]},"discard_threshold":{"value":0.5,"range":[0,1]},"antialias_threshold":{"value":0,"range":[0,0.1]},"noise_height":{"value":0.5,"range":[0,2]},"noise_scale":{"value":10,"range":[0,100]}}
    });
        //magnet effect using sheryjs
Shery.makeMagnet("#nav #part2 h5,#nav #part1 svg");
}
//video cursor animation
function videoCursor(){
    var video_container = document.querySelector("#video-container")
    var video = document.querySelector("video")
    var flag = 0
    video_container.addEventListener("mouseenter",()=>{
        video_container.addEventListener("mousemove",(dets)=>{
            gsap.to("#video-cursor",{
                x:dets.x - 1260,
                y:dets.y - 150
            })
        })
        video_container.addEventListener("click",function(){
            if (flag == 0) {
                video.play()
                gsap.to("#video-container img",{
                    display:"none"
                })
                video.style.opacity = 1
                document.querySelector("#video-cursor").innerHTML = `<i class="ri-pause-mini-fill"></i>`
                gsap.to("#video-cursor", {
                  scale: 0.5
                })
                flag = 1
              } else {
                video.pause()
                gsap.to("#video-container img",{
                    display:"initial"
                })
                video.style.opacity = 0
                document.querySelector("#video-cursor").innerHTML = `<i class="ri-play-mini-fill"></i>`
                gsap.to("#video-cursor", {
                  scale: 1
                })
                flag = 0
              }
            })
        })
    video_container.addEventListener("mouseleave",()=>{
        gsap.to("#video-cursor",{
            y: "-12%",
            x: "70%"
        })
    })
}
//flag animation
function flagAnimation(){
    document.addEventListener("mousemove",(dets)=>{
        gsap.to("#flag",{
            x:dets.x,
            y:dets.y
        })
    })
    
    var flag = document.querySelector("#flag");
    var h1 = document.querySelector("#hero3")


        h1.addEventListener("mouseenter",()=>{
            gsap.to("#flag",{
                opacity:1
            })
        })


    h1.addEventListener("mouseleave",()=>{
        gsap.to("#flag",{
            opacity:0
        })
    })

}

function letsCreateAnimation(){
    var clutter = ""
  var clutter2 = ""
  document.querySelector("#footer h1").textContent.split("").forEach(function (elem) {
    clutter += `<span>${elem}</span>`
  })
  document.querySelector("#footer h1").innerHTML = clutter
  document.querySelector("#footer h2").textContent.split("").forEach(function (elem) {
    clutter2 += `<span>${elem}</span>`
  })
  document.querySelector("#footer h2").innerHTML = clutter2


  document.querySelector("#footer-text").addEventListener("mouseenter", function () {
    gsap.to("#footer h1 span", {
      opacity: 0,
      stagger: 0.05
    })
    gsap.to("#footer h1",{
        display:"none"
    })
    gsap.to("#footer h2",{
        opacity:1
    })
    gsap.to("#footer h2 span", {
      delay: 0.35,
      opacity: 1,
      stagger: 0.05
    })
  })
  document.querySelector("#footer-text").addEventListener("mouseleave", function () {
      gsap.to("#footer h2 span", {
          opacity: 0,
          stagger: 0.05
        })
    gsap.to("#footer h2",{
        opacity:0
    })
    gsap.to("#footer h1",{
        display:"initial"
    })
    gsap.to("#footer h1 span", {
      opacity: 1,
      stagger: 0.05,
    //   delay:0.35
    })
  })
}
letsCreateAnimation();



locomotive();
loadingAnimation();
cursorAnimation();
lineAnimation();
sheryAnimation();
videoCursor();
flagAnimation()