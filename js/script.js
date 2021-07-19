'use strict';
document.addEventListener('DOMContentLoaded', () => {
  const tabsArray = document.querySelectorAll('.tabheader__item'),
    tabsArrayParent = document.querySelector('.tabheader__items'),
    tabsContent = document.querySelectorAll('.tabcontent');

  // 1.
  //функция которая скрывает все элементы и убирает дополнительный kласс у табов
  function hide() {
    for (let i = 0; i < tabsContent.length; i++) {
      tabsContent[i].style.display = 'none';
      tabsArray[i].classList.remove('tabheader__item_active');
    }
  }
  // 2.
  //функция которая показывает контент и таб по номеру, по умолчанию первые
  function showActiveTab(i = 0) {
    tabsContent[i].style.display = 'block';
    tabsContent[i].classList.add('fade');
    tabsArray[i].classList.add('tabheader__item_active');
  }
  // 3. 
  //При клике на таб добавлять ему доп класс убирая у остальных
  //Выводить контент с таким же номером
  function tabChange(){
    tabsArrayParent.addEventListener('click', (event) => {
      if (event.target.classList.contains('tabheader__item')) {
        //нужно определить номер кликнутого таба и по нему вызвать showActiveTab()
        //если элемент == элементу клика, берем его номер и передаем функции
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
});
// Скрипты и время их выполнения, setTimeout/setInterval
let setTimer = setTimeout(()=>{
  alert('3 seconds left ^-^');
}, 3000);

let setCicleTimer = setInterval(()=>{
  alert('Its me again. 3 seconds left ^-^');
}, 3000);
//так же передается функция в свойства setTimeout(foo,3000);
//запуск таймера после нажатия на кнопку


clearInterval(setTimer);
clearInterval(setCicleTimer);//останавливает setTimeout();
// Скрипты и время их выполнения, setTimeout/setInterval
