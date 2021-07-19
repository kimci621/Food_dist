'use strict';

let someArr = ['btn', 'btn', 'btn', 'btn', 'btn', 'btn'];

someArr.forEach((item, index)=>{
  // console.log(item);
  // console.log(index);
  console.log(`Я ${item} на позиции ${index}`);
  console.log('____________________________________________________');
});

someArr.forEach((item, index)=>{
  item += `-${index};`;
  console.log(item);
});
console.log(someArr);