let test = document.getElementById('main');
console.log(test.innerText); // (1)
test.innerText = '안녕하세요<span>안녕</span>'; // 화면에 '안녕하세요<span>안녕</span>'가 문자열 그대로 출력된다.

console.log(test.innerHTML); // (2)
test.innerHTML = '안녕하세요<span>안녕</span>'; // 화면에 '안녕하세요안녕'이 출력된다.