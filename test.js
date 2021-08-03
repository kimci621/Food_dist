'use strict';
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
<<<<<<< HEAD
    leg: 42,
    top: 'xxl',
    colors: {
      favorite: 'black',
      unloved: 'white'
=======
    leg : 42,
    top : 'xxl',
    colors : {
      favorite : 'black',
      unloved : 'white'
>>>>>>> 7899c1cb9b0d4b4793b3d79f8f27e1f090bba504
    }
  }
};


let copy = Object.assign(someObj);

copy.size.colors.normal = 'green';
console.log(someObj);
console.log(copy);
<<<<<<< HEAD
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


let newProm = new Promise(function (resolve, reject) {
  setTimeout(() => {
    resolve('success!');
  }, 1000);

  // setTimeout(() => {
  //   reject();
  // }, 1000);
});

newProm.then((resolve) => {
  setTimeout(() => {
    console.log('loading...');
    setTimeout(() => {
      console.log(resolve);
    }, 1000);
  }, 1000);
}).catch(() => {
  console.log('testing reject');
});
=======
/////////////////////////////////////////////////////////////////////////////////
>>>>>>> 7899c1cb9b0d4b4793b3d79f8f27e1f090bba504
