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
    leg : 42,
    top : 'xxl',
    colors : {
      favorite : 'black',
      unloved : 'white'
    }
  }
};


let copy = Object.assign(someObj);

copy.size.colors.normal = 'green';
console.log(someObj);
console.log(copy);
/////////////////////////////////////////////////////////////////////////////////