import tabs from './tabs';
import slider from './slider';
import modal from './modal';
import menuCards from './menuCards';
import calculator from './calculator';
import timer from './timer';

document.addEventListener('DOMContentLoaded', () => {
  tabs('.tabheader__item', '.tabheader__items', '.tabcontent', 'tabheader__item_active');
  slider({
    parentSelector: document.querySelector('.offer__slider'),
    sliderItemSelector: document.querySelectorAll('.offer__slide'),
    prevArrow: document.querySelector('.offer__slider-prev'),
    nextArrow: document.querySelector('.offer__slider-next'),
    counterSelector: document.getElementById('current'),
    totalCountSelector: document.getElementById('total'),
    sliderWrapperSelector: document.querySelector('.offer__slider-wrapper'),
    sliderParentSelector: document.querySelector('.offer__slider-wrapper__inner')
  });
  modal({
    buttonForModal: document.querySelectorAll('.btn-modal'),
    contentofModal: document.querySelector('.modal'),
    closeButtonInModal: document.querySelector('.modal__close'),
  });
  menuCards();
  calculator();
  timer({
    deadline: '2021-12-30',
    daySelector: document.getElementById('days'),
    hourSelector: document.getElementById('hours'),
    minuteSelector: document.getElementById('minutes'),
    secondSelector: document.getElementById('seconds')
  });
});