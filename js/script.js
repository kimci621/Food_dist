'use strict';
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

  new MenuCard(
    '.menu .container',
    'img/tabs/vegy.jpg',
    'vegy',
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежиховощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    229).addHTMl();

  new MenuCard(
    '.menu .container',
    'img/tabs/elite.jpg',
    'elite',
    'Меню "Премиум"',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    550).addHTMl();

  new MenuCard(
    '.menu .container',
    'img/tabs/post.jpg',
    'post',
    'Меню "Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    430).addHTMl();


  // POST forms
  const forms = document.querySelectorAll('form');
  const messages = {
    loading: 'icons/spinner.svg',
    success: 'Спасибо! Скоро с вами свяжемся!',
    error: 'Что-то пошло не так...',
  };
  //перебор всех форм в документе
  forms.forEach((item) => {
    postData(item);
  });

  function postData(form) {
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
      let formData = new FormData(form);
      //formData() в JSON
      let PersonalInfo = {};
      formData.forEach(function (value, key) {
        PersonalInfo[key] = value;
      });
      // Запрос
      fetch('server.php', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(PersonalInfo), //объект отправки
        })
        .then(resolve => resolve.text())
        .then(resolve => {
          //модальное окно с успехом
          SuccesModal(messages.success);
          statusMessage.remove();
          console.log(resolve);
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
});