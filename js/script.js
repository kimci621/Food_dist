document.addEventListener('DOMContentLoaded', () => {
  const tabs = require('./tabs'),
    slider = require('./slider'),
    modal = require('./modal'),
    menuCards = require('./menuCards'),
    calculator = require('./calculator'),
    timer = require('./timer');

  tabs();
  slider();
  modal();
  menuCards();
  calculator();
  timer();
});