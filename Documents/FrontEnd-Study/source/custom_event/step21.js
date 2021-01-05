// dispatchEvent() 예시
//const myBtn = document.getElementById('myBtn');

// let evt = new Event('click');
// myBtn.dispatchEvent(evt);

// ===============================

// test1
// let evt2 = new CustomEvent('build', {detail: myBtn.dataset.time});
// myBtn.addEventListener('build', evtHandler, false);
// myBtn.dispatchEvent(evt2);

// function evtHandler(e){
//     console.log('The time is: ' + e.detail);
// }

//test2
// const myBtn2 = document.getElementById('myBtn2');
// const mouseleaveEvent = new Event('mouseleave', {bubbles: true, cancelable: true});
// myBtn2.addEventListener('mouseleave', evtHandler, false);
// myBtn2.dispatchEvent(mouseleaveEvent);

// function evtHandler(){
//     alert("mouseleave!");
// }

// =====================================

// // 커스텀 이벤트 버블링 예시
// const elem = document.getElementById('elem');

// // 문서에 hello 이벤트를 등록
// document.addEventListener('hello', function(event){
//     alert("Hello from " + event.target.tagName); // event.target은 실제 이벤트가 발생한 요소를 나타냄
// });

// // hello라는 이벤트를 만들고 elem에서 이벤트 디스패치
// let evt = new Event('hello', {bubbles: true}); // 버블링 명시
// elem.dispatchEvent(evt);

// // elem.dispatchEvent(evt); 가 실행되고 이벤트가 상위 요소로 버블링되며 상위 요소에 할당된 이벤트 핸들러가 실행된다
// // 즉, document에 할당된 핸들러가 동작하게 되고 메시지가 경고창에 출력된다.

// ===================================

// // 커스텀 이벤트 (CustomEvent 생성자 관련)
// // 추가 정보는 이벤트와 함께 핸들러에 전달된다.
// const elem = document.getElementById('detailTest');

// elem.addEventListener("hello", function(event){ // 요소에 addEventListener를 이용, 이벤트 등록
//     alert(event.detail.name); // DKU-STUDY라는 메시지가 담긴 경고창이 뜬다.
// });

// elem.dispatchEvent(new CustomEvent("hello", {
//     detail: { name: "DKU-STUDY"} // detail 프로퍼티를 이용해 커스텀 정보를 이벤트에 전달
// }));

// ===================================

// // event.prventDefault() 관련
// // 토끼예제 🐰

// rabbit = document.getElementById('rabbit');

// function hide(){
//     let evt = new CustomEvent("hide", {
//         cancelable: true // cancelabel 속성을 true로 설정하지 않으면 preventDefault()가 동작하지 않는다.
//     });
//     if(!rabbit.dispatchEvent(evt)){ // preventDefault()가 실행되어 기본동작이 취소되었다면 dispatchEvent()의 반환값이 false일 것
//         alert('기본 동작이 핸들러에 의해 취소되었습니다.');
//     }
//     else{
//         rabbit.hidden = true; // 토끼를 숨김
//     }
// }

// rabbit.addEventListener('hide', function(event){
//     if(confirm("preventDefault()를 호출하시겠습니까?")){ // confirm창에서 확인 누를 경우
//         event.preventDefault();
//     }
// });

// ============================

// 이벤트 안의 이벤트

// menu = document.getElementById('menu');

// menu.onclick = function(){
//     alert(1);

//     // 이벤트가 버블링되어 document에 등록한 이벤트 핸들러가 동작하게 된다.
//     menu.dispatchEvent(new CustomEvent('menu-open', {
//         bubbles: true // 버블링 명시
//     }));

//     alert(2);
// };

// document.addEventListener('menu-open', () => alert('중첩 이벤트'));

// 중첩이벤트의 즉시 처리 막기

menu = document.getElementById('menu');

menu.onclick = function(){
    alert(1);

    setTimeout(() => menu.dispatchEvent(new CustomEvent('menu-open', {bubbles: true})));

    alert(2);
};

document.addEventListener('menu-open', () => alert('중첩 이벤트'));
