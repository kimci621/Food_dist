'use strict';

// work with prototypes (функции-конструкторы и их экзмеляры объекта(наследники))

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

new testCL(['L','A'], 'P').addNew();
