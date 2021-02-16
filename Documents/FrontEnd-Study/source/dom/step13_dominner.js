const $divElem = document.querySelector('#user1');

console.log($divElem.innerHTML); // Hello my name is <strong>Wol-dan</strong><span style="display:none">editing...</span>
console.log($divElem.innerText); // Hello my name is Wol-dan
console.log($divElem.textContent); // Hello my name is Wol-dan editing...
console.log($divElem.outerHTML); // <div id="user1">Hello my name is <strong>Wol-dan</strong><span style="display:none">editing...</span></div>