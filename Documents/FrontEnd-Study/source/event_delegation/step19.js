// let inputs = document.querySelectorAll('input');
// inputs.forEach(function(input){
//     input.addEventListener('click', function(event){
//         alert('clicked');
//     });
// });

let itemList = document.querySelector('.itemList');
itemList.addEventListener('click', function(event){
    alert('clicked');
})


// 새로운 할 일 리스트 추가
let li = document.createElement('li');
let input = document.createElement('input');
let label = document.createElement('label');
let labelText = document.createTextNode('은행 업무 보기');

input.setAttribute('type', 'checkbox');
input.setAttribute('id', 'item3');
label.setAttribute('for', 'item3');
label.appendChild(labelText);
li.appendChild(input);
li.appendChild(label);
itemList.appendChild(li);
