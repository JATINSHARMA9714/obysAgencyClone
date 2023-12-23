
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
    duration:0.8
})

tl.from("#nav",{
    opacity:0
})

//new page coming same as loader
tl.from("#hero1 h1,#hero2 h1,#hero3 h2 ,#hero4 h1",{
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
    document.addEventListener("mousemove",(dets)=>{
        gsap.to("#cursor",{
            left:dets.clientX,
            top:dets.clientY,
        })
    })
    //magnet effect using sheryjs
Shery.makeMagnet("#part2 h5,#part1 svg");
}
cursorAnimation();

