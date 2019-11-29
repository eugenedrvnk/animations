import { gsap } from "gsap";
import { CSSPlugin } from "gsap/CSSPlugin.js"

class Reveal {
  constructor(wrapper, deg, ) {
    this.wrapper = wrapper;
    this.rotated = wrapper.querySelector('.rotated');
    this.translated = wrapper.querySelector('.translated');
    this.reversed = wrapper.querySelector('.reversed');
    this.deg = deg;
    
    this.rotated.style.transform = `rotate(${deg}deg)`;
    this.translated.style.width = `calc(100vw * ${Math.abs(Math.cos(this.deg * Math.PI/180))} + 100vh * ${Math.abs(Math.sin(this.deg * Math.PI/180))})`;
    this.translated.style.height = `calc(100vw * ${Math.abs(Math.sin(this.deg * Math.PI/180))} + 100vh * ${Math.abs(Math.cos(this.deg * Math.PI/180))})`;
    
    gsap.set(this.reversed, {
      rotation: -deg
    })
  }
}


CSSPlugin.defaultForce3D = false; // prevent blur bug with text in chrome

let a = new Reveal(document.querySelector('.front_page'), -15)
// let b = new Reveal(document.querySelector('.transition'), 15)

setTimeout(() => {
  gsap.to(a.translated, {
    y: '-100%',
    duration: 1.5,
    ease: "expo.inOut"
  })
  gsap.to(a.reversed, {
    y: '100%',
    duration: 1.5,
    ease: "expo.inOut"
  })

}, 1000);

// setTimeout(() => {
//   gsap.to(b.translated, {
//     y: '-100%',
//     duration: 1.5,
//     ease: "expo.inOut"
//   })
//   gsap.to(b.reversed, {
//     y: '100%',
//     duration: 1.5,
//     ease: "expo.inOut"
//   })

// }, 1800);


