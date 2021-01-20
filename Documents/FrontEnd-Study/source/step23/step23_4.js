// // step23 Event delegation 관련 첫번째 예제
// table.onmouseover = function(event) {
//     let target = event.target;
//     target.classList.toggle('highlight');
//     // target.style.background = 'pink';

//     text.value += `over -> ${target.tagName}\n`;
//     text.scrollTop = text.scrollHeight;
//     // console.log(text.scrollTop);
//     // console.log(text.scrollHeight);
// };

// table.onmouseout = function(event) {
//     let target = event.target;
//     target.classList.toggle('highlight');
//     // target.style.background = '';

//     text.value += `out <- ${target.tagName}\n`;
//     text.scrollTop = text.scrollHeight;
// };

//===============================================


// 더 이해 필요(step23 맨 마지막 코드)
let currentElem = null;

table.onmouseover = function (event) {
  // 새로운 요소에 들어가기 전에, 마우스는 항상 이전 것을 떠난다.
  // (만약 currentElem이 지정됐다면, <td>를 떠난 것은 아니다.)
  // mouseover이 같은? <td>안에 있는 것이라는 거고 이벤트를 무시
  if (currentElem) return;

  // 이벤트가 발생한 엘리먼트에서 가장 가까운 조상인 td 반환(없다면 null값 반환)
  let target = event.target.closest('td');

  // <td> 안으로 이동한게 아니라면 무시(td나 td 더 내부로 이동한 것이 아니면 무시하는 것임)
  if (!target) return;

  // <td>로 이동했으나, 테이블 밖의 <td>인 경우(중첩 테이블에서 가능함) 무시 // td가 table의 자손이 아니라는 것 -> 중첩테이블일 수 있다는 것
  if (!table.contains(target)) return;

  // 드디어 새로운 <td>로 들어왔다는게 증명됐음!
  currentElem = target;
  onEnter(currentElem); // 해당 td 하이라이팅
};

table.onmouseout = function (event) {
  // (<td>밖에 있다면 무시 ex) tr->tr)
  if (!currentElem) return;

  // mouseout은 떠난거니까 향하는 곳은 relatedTarget 프로퍼티 안에 있을 것 // 마우스 떠나서 어디로 향하는가?
  let relatedTarget = event.relatedTarget;

  while (relatedTarget) {
    // 부모 체크 - 여전히 currentElem에 있는 거라면 무시하기 위해 // td->같은 td면 무시해야되니까
    if (relatedTarget == currentElem) return;
    
    relatedTarget = relatedTarget.parentNode;
  }

  // 현재 <td>를 완전히 떠나온 것이 really 확인된 것!
  onLeave(currentElem);
  currentElem = null;
};

function onEnter(elem) {
  elem.style.background = 'gray';

  // textarea에 출력하는 부분
  text.value += `over -> ${elem.tagName}.${elem.className}\n`;
  //text.scrollTop = text.scrollHeight;
  text.scrollTop = 1e6;
}

function onLeave(elem) {
  elem.style.background = '';

  // textarea에 출력하는 부분
  text.value += `out <- ${elem.tagName}.${elem.className}\n`;
  text.scrollTop = 1e6;
}