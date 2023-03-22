document.getElementById("hamsburger-icon").addEventListener("click", ()=>{
    const navItems = document.getElementsByClassName("navbar-nav");
    for (let i = 0; i < navItems.length; i++) {
        navItems[i].classList.toggle("hidden");
    }
})

const slides = document.getElementsByClassName("carousel-item")
let slidePosition = 0
const totalSlides = slides.length;


function moveToNext(){
    hideAllSlides()
    if (slidePosition === totalSlides - 1) {
        slidePosition = 0;
    }
    else{
        slidePosition++;
    }
    slides[slidePosition].classList.add("carousel-item-visible")
}


setInterval(moveToNext,6000)


function moveToPrev(){
    hideAllSlides()
    if (slidePosition === 0) {
        slidePosition = totalSlides - 1;
    }
    else{
        slidePosition--;
    }
    slides[slidePosition].classList.add("carousel-item-visible")
}


function hideAllSlides(){
    for (let slide of slides){
        slide.classList.remove("carousel-item-visible");
        slide.classList.add("carousel-item-hidden");
    }
}

let skillLevels = document.querySelectorAll(".skill-level");

skillLevels.forEach((skill) => {
  let level = skill.getAttribute("data-level");
  skill.style.width = level + "%";
});





  