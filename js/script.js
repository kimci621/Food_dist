'use strict';
// const { response } = require("express");
document.addEventListener('DOMContentLoaded', () => {
  const tabsArray = document.querySelectorAll('.tabheader__item'),
    tabsArrayParent = document.querySelector('.tabheader__items'),
    tabsContent = document.querySelectorAll('.tabcontent');

  //Hide tabs
  function hide() {
    for (let i = 0; i < tabsContent.length; i++) {
      tabsContent[i].style.display = 'none';
      tabsArray[i].classList.remove('tabheader__item_active');
    }
  }
  //Активный таб(по умолчанию первый)
  function showActiveTab(i = 0) {
    tabsContent[i].style.display = 'block';
    tabsContent[i].classList.add('fade');
    tabsArray[i].classList.add('tabheader__item_active');
  }
  //смена активного таба по клику
  function tabChange() {
    tabsArrayParent.addEventListener('click', (event) => {
      if (event.target.classList.contains('tabheader__item')) {
        tabsArray.forEach((item, index) => {
          if (event.target == item) {
            hide();
            showActiveTab(index);
          }
        });
      }
    });
  }

  hide();
  showActiveTab();
  tabChange();

  // Timer
  const deadLine = '2021-08-22';
  let daysDOM = document.getElementById('days'),
    hoursDOM = document.getElementById('hours'),
    minutesDOM = document.getElementById('minutes'),
    secondsDOM = document.getElementById('seconds');

  function timeOnPage(endTime) {
    const difference = Date.parse(endTime) - Date.parse(new Date());
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);
    return {
      'difference': difference,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }
  //insert new data to dom 
  function TimerNewData() {
    let newData = timeOnPage(deadLine);
    daysDOM.innerHTML = newData.days;
    hoursDOM.innerHTML = newData.hours;
    minutesDOM.innerHTML = newData.minutes;
    secondsDOM.innerHTML = newData.seconds;
  }
  // refresh timer
  function updateDOMTimer(whatUpdate) {
    let update = setInterval(whatUpdate, 1000);
    if (timeOnPage.difference <= 0) {
      clearInterval(update);
    }
  }

  TimerNewData();
  updateDOMTimer(TimerNewData);
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  let modalBtn = document.querySelectorAll('.btn-modal');
  let modalContent = document.querySelector('.modal');
  let modalClose = document.querySelector('.modal__close');

  // функция убирающая модальное окно
  function closeModal(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
  // активное модальное окно
  function openModal(modal = modalContent) {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    clearInterval(TimerModal); //обнуление  таймера если модалтное окно было активировано ранее
  }

  modalBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
      openModal();
    });
  });

  // закрытие при клике на фон, x
  modalContent.addEventListener('click', (e) => {
    if (e.target == modalContent || e.target == modalClose) {
      closeModal(modalContent);
    }
  });
  // закрытие при активном окне с Esc
  document.addEventListener('keydown', (e) => {
    if (e.code == 'Escape' && modalContent.style.display == 'block') {
      closeModal(modalContent);
    }
  });
  //timer на модальное окно
  let TimerModal = setTimeout(openModal, 500000);
  //появление модального окна при скролле
  function showModalInEnd() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal();
      window.removeEventListener('scroll', showModalInEnd);
    }
  }
  window.addEventListener('scroll', showModalInEnd);
  // Класс карточек меню
  class MenuCard {
    constructor(parentSelector, imgSrc, imgAlt, tittle, text, price) {
      this.parentSelector = document.querySelector(parentSelector);
      this.imgSrc = imgSrc;
      this.imgAlt = imgAlt;
      this.tittle = tittle;
      this.text = text;
      this.price = price;
    }

    addHTMl() {
      let div = document.createElement('div');
      div.innerHTML = `
      <div class="menu__item">
        <img src="${this.imgSrc}" alt="${this.imgAlt}">
        <h3 class="menu__item-subtitle">${this.tittle}</h3>
        <div class="menu__item-descr">${this.text}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>
      </div>
      `;
      this.parentSelector.append(div);
    }
  }
  // POST forms
  const forms = document.querySelectorAll('form');
  const messages = {
    loading: 'icons/spinner.svg',
    success: 'Спасибо! Скоро с вами свяжемся!',
    error: 'Что-то пошло не так...',
  };
  //перебор всех форм в документе
  forms.forEach((item) => {
    bindPostData(item);
  });

  //Функция с async/await для 'POST' fetch запроса
  const PostData = async (serverURL, dataOut) => {
    const response = await fetch(serverURL, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: dataOut
    });
    return await response.json();
  };
  //Функция с async/await для 'GET' fetch запроса
  const getData = async (serverURL) => {
    const response = await fetch(serverURL);
    if (!response.ok) {
      // new Error(текст); вывод ошибки с текстом 
      throw new Error(`Could not fetch ${serverURL}, status ${response.status}`);
      // throw - вывод, выпадание, отображение
    }
    return await response.json();
  };

  //карточки с товаром
  getData('http://localhost:3000/menu')
    .then(result => {
      // result.forEach(item => {
      //   new MenuCard(item.img, item.altimg, item.title, item.descr, item.price).addHTMl();
      // });
      // C помощью деструктуризации объекта
      result.forEach(({
        img,
        altimg,
        title,
        descr,
        price
      }) => {
        let convPrice = Math.round(price * 2.75);
        new MenuCard('.menu .container', img, altimg, title, descr, convPrice).addHTMl();
      });
    });
  //библиотека axios 
  // axios.get('http://localhost:3000/menu')
  //   .then(result => result.data.forEach(({img, altimg, title, descr, price}) => {
  //     //result в дате тк приходит объект с датой(вложенность)
  //     let convPrice = Math.round(price * 2.75);
  //     new MenuCard('.menu .container', img, altimg, title, descr, convPrice).addHTMl();
  //   }));
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //альтернативный метод добавления контента без классов
  /*function createCart(item){
      item.forEach(({ img, altimg, title, descr, price}) => {
        const element = document.createElement('div');
        element.classList.add('menu__item');
        element.innerHTML = `
        <div class="menu__item">
        <img src="${img}" alt="${altimg}">
        <h3 class="menu__item-subtitle">${title}</h3>
        <div class="menu__item-descr">${descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${price}</span> грн/день</div>
        </div>
      </div>`;
        document.querySelector('.menu .container').append(element);
      });
    }
    getData('http://localhost:3000/menu')
    .then(result => createCart(result));*/
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  function bindPostData(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      //Сообщение для пользователя о статусе
      let statusMessage = document.createElement('img');
      statusMessage.src = messages.loading;
      statusMessage.style.cssText = `
      display: block;
      margin: 0 auto;
      `;
      form.insertAdjacentElement('afterend', statusMessage);
      // Запрос
      /*
      Объекты FormData позволяют вам легко конструировать наборы пар ключ-значение, 
      которые в дальнейшем можно отправить с помощью метода send().
      */
      const formData = new FormData(form);
      //Каждая formData->obj->formJSON->array->obj->JSON
      const formJSON = JSON.stringify(Object.fromEntries(formData.entries()));
      //formData() в JSON методом forEach
      // let PersonalInfo = {};
      // formData.forEach(function (value, key) {
      //   PersonalInfo[key] = value;
      // });
      // Запрос
      PostData('http://localhost:3000/requests', formJSON)
        .then(resolve => {
          console.log('POST ok');
          //модальное окно с успехом
          SuccesModal(messages.success);
          statusMessage.remove();
        }).catch(() => {
          statusMessage.textContent = messages.error;
          form.append(statusMessage);
        }).finally(() => {
          form.reset();
        });
    });
  }
  //модальное окно с успехом
  function SuccesModal(message) {
    document.querySelector('.modal__content').classList.add('hide');
    //Родитель модального окна .modal
    openModal();

    let newModal = document.createElement('div');
    newModal.classList.add('modal__content');
    newModal.innerHTML = `<div class="modal__title">${message}</div>`;
    document.querySelector('.modal__dialog').append(newModal);
    setTimeout(() => {
      newModal.remove();
      closeModal(modalContent);
      document.querySelector('.modal__content').classList.remove('hide');
    }, 3000);
  }

  fetch('http://localhost:3000/menu')
    .then(response => response.json());

  //slider
  const slider = document.querySelector('.offer__slider');
  const slides = document.querySelectorAll('.offer__slide');
  const prev = document.querySelector('.offer__slider-prev');
  const next = document.querySelector('.offer__slider-next');
  const counter = document.getElementById('current');
  const total = document.getElementById('total');
  const sliderWrapper = document.querySelector('.offer__slider-wrapper');
  const sliderInner = document.querySelector('.offer__slider-wrapper__inner');
  const width = window.getComputedStyle(sliderInner).width;
  //delete px from 650px
  const widthInt = +width.replace(/\D/g, '');
  let step = 0;
  let slideNum = 1;
  //total count of slides
  if (slides.length > 9) {
    total.textContent = `${slides.length}`;
    counter.textContent = `${slideNum}`;
  } else {
    total.textContent = `0${slides.length}`;
    counter.textContent = `0${slideNum}`;
  }
  ///////////////////////////////////////////////////////////////////////////////
  // // slider on click without animation
  // // show active slide call
  // activeSlide(slideNum);
  // // show active slide with params
  // function activeSlide(num) {
  //   slides.forEach(item => {
  //     item.style.display = 'none';
  //   });
  //   if (num > slides.length) {
  //     slideNum = 1;
  //   }
  //   if (num < 1) {
  //     slideNum = slides.length;
  //   }
  //   slides[slideNum - 1].classList.add('fade');
  //   slides[slideNum - 1].style.display = 'block';
  // }
  // // active slide mover
  // function moveSlide(num) {
  //   activeSlide(slideNum += num);
  //   //count of slides
  //   if (slides.length > 9) {
  //     counter.textContent = `${slideNum}`;
  //   } else {
  //     counter.textContent = `0${slideNum}`;
  //   }
  // }
  // // prev slide
  // prev.addEventListener('click', () => {
  //   moveSlide(-1);
  // });
  // // next slide
  // next.addEventListener('click', () => {
  //   moveSlide(+1);
  // });
  ///////////////////////////////////////////////////////////////////////////////
  //slider карусель
  sliderInner.style.width = slides.length * 100 + '%';
  sliderInner.style.display = 'flex';
  sliderWrapper.style.overflow = 'hidden';
  sliderInner.style.transition = '0.5s all';


  slides.forEach(slide => {
    slide.style.width = width;
  });

  prev.addEventListener('click', () => {
    //Прокрутка
    if (step == 0) {
      step = widthInt * (slides.length - 1);
    } else {
      step -= widthInt;
    }
    sliderInner.style.transform = `translateX(-${step}px)`;
    //номер слайда
    if (slideNum == 1) {
      slideNum = slides.length;
    } else {
      slideNum--;
    }
    //Присвоение
    if (slideNum < 10) {
      counter.textContent = `0${slideNum}`;
    } else {
      counter.textContent = `${slideNum}`;
    }
    //dots active
    dots.forEach((dot) => {
      dot.style.opacity = '.5';
    });
    dots[slideNum - 1].style.opacity = '1';

  });

  next.addEventListener('click', () => {
    //Прокрутка
    if (step == (widthInt * (slides.length - 1))) {
      step = 0;
    } else {
      step += widthInt;
    }
    sliderInner.style.transform = `translateX(-${step}px)`;
    //номер слайда
    if (slideNum == slides.length) {
      slideNum = 1;
    } else {
      slideNum++;
    }
    //Присвоение
    if (slideNum < 10) {
      counter.textContent = `0${slideNum}`;
    } else {
      counter.textContent = `${slideNum}`;
    }
    //dots active
    dots.forEach((dot) => {
      dot.style.opacity = '.5';
    });
    dots[slideNum - 1].style.opacity = '1';
  });

  //Навигация для слайдов 
  slider.style.position = 'relative';
  const indicators = document.createElement('ol');
  indicators.classList.add('carousel-indicators');
  indicators.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
    `;
  slider.append(indicators);

  let dots = [];
  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    //индикация пар слайд==точка с помощью атрибута data-*,index
    dot.setAttribute('data-slide-to', i + 1);
    dot.style.cssText = `
      box-sizing: content-box;
      flex: 0 1 auto;
      width: 30px;
      height: 6px;
      margin-right: 3px;
      margin-left: 3px;
      cursor: pointer;
      background-color: #fff;
      background-clip: padding-box;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      opacity: .5;
      transition: opacity .6s ease;
    `;
    if (i == 0) {
      dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
    //слайды по клику на навигацию
    dots.forEach(dot => {
      dot.addEventListener('click', (event) => {
        const slideTo = event.target.getAttribute('data-slide-to');
        slideNum = slideTo;
        step = (widthInt * (slideTo - 1));
        sliderInner.style.transform = `translateX(-${step}px)`;

        dots.forEach((dot) => {
          dot.style.opacity = '.5';
        });
        dots[slideNum - 1].style.opacity = '1';
      });
    });
  }

  //calcutor
  const resultCalc = document.querySelector('.calculating__result');
  let gender,
    height, weight, age, activity;
  //общий расчет и отображение на странице
  function CalcData(param = gender) {
    if (!gender || !height || !weight || !age || !activity) {
      resultCalc.textContent = '0 Ккал';
    } else {
      switch (param) {
        case 'man':
          resultCalc.textContent = (Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * activity)) + ' Ккал';
          break;
        case 'woman':
          resultCalc.textContent = (Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * activity)) + ' Ккал';
          break;
      }
    }
  }

  CalcData();

  // передача input.value в общий расчет
  function inputData(selector) {
    const input = document.querySelector(selector);

    input.addEventListener('input', () => {
      switch (selector) {
        case '#height':
          height = +input.value;
          break;
        case '#weight':
          weight = +input.value;
          break;
        case '#age':
          age = +input.value;
          break;
      }
      CalcData();
    });
  }

  inputData('#height');
  inputData('#weight');
  inputData('#age');

  //передача data-active в общий расчет

  function activityData(parent) {
    let elements = parent.querySelectorAll('.calculating__choose-item');
    parent.addEventListener('click', (e) => {
      if (e.target.getAttribute('data-activity')) {
        activity = +e.target.getAttribute('data-activity');
        elements.forEach(item => {
          item.classList.remove('calculating__choose-item_active');
        });
        e.target.classList.add('calculating__choose-item_active');
        CalcData();
      }
    });
  }

  activityData(document.querySelector('.calculating__choose_big'));

  //передача пола пользователя в общий расчет

  function genderChange(parent) {
    let elems = parent.querySelectorAll('.calculating__choose-item');
    parent.addEventListener('click', (e) => {
      elems.forEach(item => {
        item.classList.remove('calculating__choose-item_active');
      });
      if (e.target.id === 'man') {
        e.target.classList.add('calculating__choose-item_active');
        gender = 'man';
      }
      if (e.target.id === 'woman') {
        e.target.classList.add('calculating__choose-item_active');
        gender = 'woman';
      }
      CalcData();
    });
  }

  genderChange(document.getElementById('gender'));

});
