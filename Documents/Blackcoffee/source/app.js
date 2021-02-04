// import { TodoApp } from "./component/TodoApp.js"

// function test(){
//     console.log(this);
// }
// const $div = document.querySelector('.todoapp');
// new TodoApp($div).render();
// test();

const idx = newGuid();

const item = {
    contents: '안녕',
    completed: ''
};

localStorage.setItem(idx, JSON.stringify(item));
// console.log(localStorage.getItem(idx));

const idx2 = newGuid();
const item2 = {
    contents: 'hi',
    completed: ''
};

localStorage.setItem(idx2, JSON.stringify(item2));

let arr = [];

for(let i = 0; i < localStorage.length; i++){
    let key = localStorage.key(i);
    arr.push(JSON.parse(localStorage.getItem(key)));
}
console.log(arr);

// 로컬스토리지에 저장된 속성 바꾸는 법 🌟
//
// const newValue = JSON.parse(localStorage.getItem(idx));
// newValue.contents = 'new';
// localStorage.setItem(idx, JSON.stringify(newValue));

function newGuid() {
    var hexValues = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];

    // c.f. rfc4122 (UUID version 4 = xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx)
    var oct = "", tmp;
    for (var a = 0; a < 4; a++) {
        tmp = (4294967296 * Math.random()) | 0;
        oct += hexValues[tmp & 0xF] + hexValues[tmp >> 4 & 0xF] + hexValues[tmp >> 8 & 0xF] + hexValues[tmp >> 12 & 0xF] + hexValues[tmp >> 16 & 0xF] + hexValues[tmp >> 20 & 0xF] + hexValues[tmp >> 24 & 0xF] + hexValues[tmp >> 28 & 0xF];
    }

    // "Set the two most significant bits (bits 6 and 7) of the clock_seq_hi_and_reserved to zero and one, respectively"
    var clockSequenceHi = hexValues[8 + (Math.random() * 4) | 0];
    return oct.substr(0, 8) + "-" + oct.substr(9, 4) + "-4" + oct.substr(13, 3) + "-" + clockSequenceHi + oct.substr(16, 3) + "-" + oct.substr(19, 12);
}

