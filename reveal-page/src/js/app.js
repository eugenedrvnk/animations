import { gsap } from "gsap";
import { CSSPlugin } from "gsap/CSSPlugin.js";
import { splitChars, getRandomLettersFrom, initPreloader } from './funcMixin'

class Reveal {
  constructor(wrapper, deg, ) {
    this.wrapper = wrapper;
    this.rotated = wrapper.querySelector('.rotated');
    this.translated = wrapper.querySelector('.translated');
    this.reversed = wrapper.querySelector('.reversed');
    this.deg = deg;
    
    this.translated.style.width = `calc(100vw * ${Math.abs(Math.cos(this.deg * Math.PI/180))} + 100vh * ${Math.abs(Math.sin(this.deg * Math.PI/180))})`;
    this.translated.style.height = `calc(100vw * ${Math.abs(Math.sin(this.deg * Math.PI/180))} + 100vh * ${Math.abs(Math.cos(this.deg * Math.PI/180))})`;
    
    gsap.set(this.rotated, {
      rotation: deg
    })

    gsap.set(this.reversed, {
      rotation: -deg
    })
  }
}

let frontPage = {
  self: document.querySelector('.front_page'),
  centerTitle: document.querySelector('.front_page .center_title'),
  centerEnter: document.querySelector('.front_page .center_enter'),
  reveal: null
}

let animsStatus = {
  centerTitle: false,
}

initPreloader()

splitChars(frontPage.centerTitle)
frontPage.centerEnter.addEventListener('mouseenter', animateCenterTitle)

function animateCenterTitle() {

  if (animsStatus.centerTitle) return;
  animsStatus.centerTitle = true;

  let letters = getRandomLettersFrom(frontPage.centerTitle);
  gsap.to(letters, {
      duration: .4,
      y: -100,
      opacity: 0,
      ease: "power3.in",
      stagger: .05
    })

  gsap.to(letters, {
    duration: .4,
    y: 0,
    opacity: 1,
    delay: .6,
    ease: "power3.out",
    startAt: {
      y: 50
    },
    stagger: {
      each: .1,
    },
    onComplete: () => animsStatus.centerTitle = false
  })
}

let tl = gsap.timeline({defaults: {
  duration: 1.5,
  ease: "expo.inOut"
}});
tl.pause();

frontPage.reveal = new Reveal(document.querySelector('.front_page'), -15)
let transPage = new Reveal(document.querySelector('.transition'), 15)

frontPage.centerEnter.addEventListener('click', showBack)
  

function showBack() {

  let duration = tl.vars.defaults.duration;
  frontPage.reveal.wrapper.style.pointerEvents = 'none';

  tl.resume()
  tl
  .to(frontPage.reveal.translated, {y: '-100%',}, 0)
  .to(frontPage.reveal.reversed, {y: '100%',}, 0)
  .to(transPage.translated, {y: '-100%',}, duration/1.8)
  .to(transPage.reversed, {y: '100%',}, duration/1.8)
}

function showFront() {
  
}

document.ondblclick = () => {
  tl.reverse()
}