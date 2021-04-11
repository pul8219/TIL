// function Cat(name){
//     this.name = name;
// }

// Cat.prototype.speak = function(){
//     console.log(`${this.name} makes a noise`);
// };

// function Lion(name){
//     Cat.call(this, name);
// }

// console.log(Lion.prototype);

// Lion.prototype = Object.create(Cat.prototype);

// //console.log(Lion.prototype);
// //console.log(Lion.prototype.__proto__);


// Lion.prototype.constructor = Lion;

// console.log(Lion.prototype);
// console.log(Lion.prototype.__proto__);
// console.dir(Lion);

class Cat{
    constructor(name){
        this.name = name;
    }

    speak(){
        console.log(`${this.name} makes a noise`);
    }

}

class Lion extends Cat{
    speak(){
        super.speak();
        console.log(`${this.name} roars`);

    }
}

console.dir(Cat);
console.dir(Lion);

const lion = new Lion("Samba");
console.log(lion);
console.dir(lion);

lion.speak();