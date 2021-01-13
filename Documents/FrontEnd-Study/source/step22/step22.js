// // mousedown 이벤트와 선택 막기
// let test1 = document.getElementById('test1');
// test1.addEventListener('mousedown', function(event){
 
//     event.preventDefault();
// });
// test1.addEventListener('dblclick', function(){
//     alert('dblclick');
// });

// // mousedown 테스트

// let newTest = document.getElementById('newTest');
// newTest.addEventListener('mousedown', function(){
//    alert('mousedown'); 
// });

// // e.button 테스트

// let button22 = document.querySelector('#button22');
// let log = document.querySelector('#log');
// button22.addEventListener('mouseup', logMouseButton);

// function logMouseButton(e) {
//     if (typeof e === 'object') {
//         log.textContent = `Unknown button code: ${e.button}`;
//     }
// }

// mouseover VS mouseenter

let test = document.getElementById("test");

// mouseenter 는 오직 한번 발생한다. 커서가 ul 으로 move over 할 때 
test.addEventListener("mouseenter", function( event ) {
  // highlight the mouseenter target
  event.target.style.color = "purple";

  // reset the color after a short delay
  setTimeout(function() {
    event.target.style.color = "";
  }, 500);
}, false);

// mouseover 는 매번 발생한다. 커서가 li 들로 move over 할 때마다.  
// mouseover 의 타겟은 (Element 나 Element 의 Child) 이 될 수 있기 때문이다.
test.addEventListener("mouseover", function( event ) {
  // highlight the mouseover target
  event.target.style.color = "orange";

  // reset the color after a short delay
  setTimeout(function() {
    event.target.style.color = "";
  }, 500);
}, false);