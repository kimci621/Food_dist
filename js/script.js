'use strict';
document.addEventListener('DOMContentLoaded', () => {
  const tabsArray = document.querySelectorAll('.tabheader__item'),
    tabsArrayParent = document.querySelector('.tabheader__items'),
    tabsContent = document.querySelectorAll('.tabcontent');

  //1 часть
  //функция которая скрывает все элементы и убирает дополнительный kласс у табов
  function hide() {
    for (let i = 0; i < tabsContent.length; i++) {
      tabsContent[i].style.display = 'none';
      tabsArray[i].classList.remove('tabheader__item_active');
    }
  }
  //2 часть
  //функция которая показывает контент и таб(добавляю второй класс) по номеру, по умолчанию первые
  function showActiveTab(i = 0) {
    tabsContent[i].style.display = 'block';
    tabsContent[i].classList.add('fade');
    tabsArray[i].classList.add('tabheader__item_active');
  }
  //3 часть. необходимо при клике на таб добавлять ему доп класс убирая у остальных
  //и выводить контент с таким же номером
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

  hide(); //убрали весь контент
  showActiveTab(); //вывели контент и его таб
  tabChange();
});