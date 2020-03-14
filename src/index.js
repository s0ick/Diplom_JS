'use strict';

// Polyfills
import 'nodelist-foreach-polyfill';
import '@babel/polyfill';
import 'formdata-polyfill';
import 'fetch-polyfill';
import 'es6-promise/auto';
import elementClosest from 'element-closest';
elementClosest(window);

// Modules
import toggleMenu from './modules/toggleMenu';
import scroll from './modules/scroll';
import getSelectList from './modules/getSelectList';
import getDots from './modules/getDots';
import toggleModal from './modules/toggleModal';
import getSliders from './modules/getSlider';
import getCalc from './modules/getCalc';
import sendForm from './modules/sendForm';
import SliderCarousel from './modules/SliderCarousel';

const carousel = new SliderCarousel({
  main: '#services .wrapper',
  wrap: '.services-slider',
  next: '#services .arrow-right',
  prev: '#services .arrow-left',
  slidesToShow: 5,
  infinity: true,
});
carousel.init(); 

// Drop list
getSelectList();

// Modal window activation
toggleModal();

// Submission settings for each form
sendForm();

// Add dots for sliders
getDots();

// Submission settings for each slider
getSliders();

// Calc init
getCalc();

// Add smooth scroll and link scroll top
scroll();

// Menu
toggleMenu();