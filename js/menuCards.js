import {getData} from './services/services';

function menuCard() {
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

  fetch('http://localhost:3000/menu')
    .then(response => response.json());
}

export default menuCard;