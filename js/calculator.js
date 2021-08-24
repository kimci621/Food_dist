function calculator() {
  //calcutor
  const resultCalc = document.querySelector('.calculating__result');
  const storage = window.localStorage;
  let gender, height, weight, age, activity;

  if (storage.getItem('activity')) {
    activity = storage.getItem('activity');
  } else {
    activity = 1.375;
    activity = storage.setItem('activity', 1.375);
  }

  if (storage.getItem('gender')) {
    gender = storage.getItem('gender');
  } else {
    gender = 'woman';
    gender = storage.setItem('gender', 'woman');
  }

  //переключение класса активности
  function classChanger(selector, activeClass) {

    let elements = document.querySelectorAll(selector);

    elements.forEach(item => {
      item.classList.remove(activeClass);
      if (item.getAttribute('data-activity') === storage.getItem('activity')) {
        item.classList.add(activeClass);
      }
      if (item.getAttribute('id') === storage.getItem('gender')) {
        item.classList.add(activeClass);
      }
    });
  }

  classChanger('#gender div', 'calculating__choose-item_active');
  classChanger('.calculating__choose_big div', 'calculating__choose-item_active');


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
      //check correct data
      if (input.value.match(/\D/g)) {
        input.style.border = '1px solid red';
      } else {
        input.style.border = 'none';
      }

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
        storage.setItem('activity', `${+e.target.getAttribute('data-activity')}`);
        if (storage.getItem('activity')) {
          activity = storage.getItem('activity');
        } else {
          activity = +e.target.getAttribute('data-activity');
        }
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
      storage.setItem('gender', `${e.target.getAttribute('id')}`);
      if (storage.getItem('gender')) {
        gender = storage.getItem('gender');
      } else {
        gender = 'woman';
      }
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
}

module.exports = calculator;