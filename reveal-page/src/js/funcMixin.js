export { splitChars, getRandomLettersFrom, initPreloader }

import gsap from 'gsap';
import imagesLoaded from 'imagesloaded';

function splitChars(el) {
  let chars = el.textContent.split('');
  el.innerHTML = '';
  chars.forEach(item => {
      let span = document.createElement('span');
      if (item == ' ') span.innerHTML = '&nbsp;'
      else span.textContent = item;
      el.appendChild(span);
  })
}

function getRandomLettersFrom(el) {
  return [].filter.call(el.children, () => {
    return Math.random() > .5
  })
}

function initPreloader() {
  let items = document.querySelectorAll('.preloader .wrapper div');
  let startTime = performance.now();

  let tl = gsap.timeline({repeat: -1});
  tl
  .to(items, {
    duration: .5,
    scale: 3,
    stagger: .1
  })
  .to(items, {
    duration: .5,
    scale: 1,
    stagger: .1
  })

  window.onload = () =>  {
    imagesLoaded( document.body, function() {
      if (performance.now() - startTime > 2000) hidePreloader();
      else setTimeout(hidePreloader, 1500);
    });
  }

  function hidePreloader() {
    setTimeout(() => {
      tl.pause();
    }, 1500);
    let preloader = document.querySelector('.preloader');
    let wrapper = preloader.querySelector('.wrapper');
    gsap.to(preloader, {
      duration: 1.5,
      y: '100%',
      ease: "power3.inOut"
    })
    gsap.to(wrapper, {
      duration: 1.5,
      y: '-100%',
      ease: "power3.inOut"
    })
  }
}