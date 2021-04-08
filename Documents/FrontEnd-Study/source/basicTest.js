function Cat(name){
    this.name = name;
}

Cat.prototype.speak = function(){
    console.log(`${this.name} makes a noise`);
};

function Lion(name){
    Cat.call(this, name);
}

console.dir(Lion.prototype);

Lion.prototype = Object.create(Cat.prototype);

//console.log(Lion.prototype);
//console.log(Lion.prototype.__proto__);


Lion.prototype.constructor = Lion;

console.log(Lion.prototype);
console.log(Lion.prototype.__proto__);
