class CarA {
  name;
  constructor(name) {
    this.name = name;
  }
  sayHell() {
    console.log(this.name);
  }
}

const Car = {
  name: "myCar",
};
const CarB = {
  myName: "CarB",
};
Object.assign(Car, CarB);

console.log(Car);

const myCar = new CarA("hello");

myCar.sayHell();
console.log(myCar);

const myMap = new Map();
myMap.set("A", 1);
myMap.set("B", 2);
myMap.set("C", 3);
const keys = myMap.keys();
const arrKeys = [...keys];
for (const key of keys) {
  console.log(key);
}

console.log(arrKeys.length);
console.log(Array.isArray(arrKeys));
for (const key of arrKeys) {
  console.log(key);
}
//const arrKeys =...keys;
let s = new Set();
s.add("1");
s.add("2");
