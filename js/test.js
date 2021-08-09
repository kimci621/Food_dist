'use strict';
// prototypes (функции-конструкторы и их экзмеляры объекта(наследники))

//функция конструктор
function User(id, name, lastname, old) {
  this.id = id;
  this.name = name;
  this.lastname = lastname;
  this.old = old;
}
//экземпляр объект (наследники)
let Ivan = new User(1, 'Ivan', 'Makeev', 22);
let Amir = new User(2, 'Amir', 'Bolshev', 19);
let Bob = new User(3, 'Bob', 'Marley', 33);

console.log(Ivan);
console.log(Amir);
console.log(Bob);

//Получаем доступ к конструктору с помощью prototype
console.log(`${User.prototype}- это объект функции конструктора`); // мы в консрукторе
//добавили новый метод в конструктор
User.prototype.userOut = function () {
  console.log(`${this.name},${this.lastname} вышел из системы`);
};

Ivan.userOut();
Amir.userOut();
Bob.userOut();

//rest 

class testCL {
  constructor(arr, ...newToArr) {
    this.arr = arr;
    this.newToArr = newToArr;
  }

  addNew() {
    this.arr.push(`${this.newToArr}`);
    console.log(...this.arr);
  }
}

new testCL(['L', 'A'], 'P').addNew();

/////////////////////////////////////////////////////////////////////////////////
let someArr = ['btn', 'btn', 'btn', 'btn', 'btn', 'btn'];

someArr.forEach((item, index) => {
  // console.log(item);
  // console.log(index);
  console.log(`Я ${item} на позиции ${index}`);
  console.log('____________________________________________________');
});

someArr.forEach((item, index) => {
  item += `-${index};`;
  console.log(item);
});
console.log(someArr);

/////////////////////////////////////////////////////////////////////////////////
function foo(first, second, ...rest) {
  let newArr = [];
  newArr.push(first);
  newArr.push(second);
  rest.forEach((item) => {
    newArr.push(item);
  });
  console.log(newArr[newArr.length - 1]);
}
foo('1-ARG', '2-ARG', '+1-Arg', '+2-Arg', '+3-Arg', '+4-Arg');

/////////////////////////////////////////////////////////////////////////////////

let someObj = {
  name: 'Ivan',
  size: {
    leg: 42,
    top: 'xxl',
    colors: {
      favorite: 'black',
      unloved: 'white',
      leg: 42,
      top: 'xxl',
    }
  }
};


let copy = Object.assign(someObj);

copy.size.colors.normal = 'green';
console.log(someObj);
console.log(copy);
/////////////////////////////////////////////////////////////////////////////////
// Promise(resolve, reject);

const req = new Promise(function (resolve, reject) {
  setTimeout(() => {
    console.log('loading goods...');

    const goods = {
      tv: 'В наличии.',
      videocart: 'Нет в наличии.',
      iphone: 'В наличии.',
    };

    resolve(goods);
  }, 2000);
});

req.then((goods) => {
  setTimeout(() => {
    console.log('loading comlete...');

    setTimeout(() => {
      console.log(goods);
    }, 2000);

  }, 2000);
});


let promise = new Promise(function (resolve, reject) {
  setTimeout(() => {
    resolve('success!');
  }, 1000);

  // setTimeout(() => {
  //   reject();
  // }, 1000);
});

promise.then((resolve) => {
  setTimeout(() => {
    console.log('loading...');
    setTimeout(() => {
      console.log(resolve);
    }, 1000);
  }, 1000);
}).catch(() => {
  console.log('testing reject');
});

/////////////////////////////////////////////////////////////////////////////////
// fetch()
// Запрос
let PersonalInfo = {};
let form = 'form from document';
fetch('server.php', { // сервер отправки(куда, откуда)
    method: 'POST', // метод get/post
    headers: { // заголовки для JSON
      'Content-type': 'application/json'
    },
    body: JSON.stringify(PersonalInfo), //объект отправки или (resolve)
  })
  .then(resolve => resolve.text()) //resolve-успешный ответ
  .then(resolve => {
    //вывод значения resolve
    console.log(resolve);
  }).catch(() => { // в случае ошибки
    console.log('ошибка');
  }).finally(() => { // выполнится в любом случае
    form.reset();
  });
//catch не воспринимает 404 как ошибку, resolve выпонится в любом случае
/////////////////////////////////////////////////////////////////////////////////

let obj = {
  lisa: 'people',
  Jerry: 'people',
  cat: 'animal',
  dog: 'animal',
};
console.log(obj);

let newobj = Object.entries(obj);
// console.log(newobj);
newobj = newobj.filter(item => item[1] === 'people');
// console.log(newobj);
newobj = newobj.map(item => item[0]);
// console.log(newobj);

let oneStringArray = Object.entries(obj).filter(item => item[1] === 'people').map(item => item[0]);
console.log(oneStringArray);

const PostData = async (serverURL, method, headers, data) => {
  const response = await fetch(serverURL, {
    method: method,
    headers: {
      headers
    },
    body: data
  });

  return response;
};

let objtest = {
  lisa: 'people',
  Jerry: 'people',
};
let newobjtest = Object.entries(objtest);
console.log(newobjtest);
console.log(Object.fromEntries(newobjtest));


//parser
//Принимать в себя информацию с HTML-> отбирать что именно нужно-> отправлять на сервер
