// // 이벤트 버블링 bubbling
// let elems = document.querySelectorAll("div"); // 태그가 div인 모든 요소를 선택
// elems.forEach(function(div){
//     // 각 div 태그에 클릭이 일어나면 각자의 className을 출력하는 이벤트 등록
//     div.addEventListener("click", logEvent);
// });

// function logEvent(event){
//     //event.stopPropagation(); //이벤트 전파 중단 방법인 stopPropagation()
//     console.log(event.currentTarget.className);
// }


// event.target vs event.currentTarget
let form = document.querySelector("form");
form.addEventListener("click", logTarget);

function logTarget(event){
    alert("target: " + event.target.tagName + ", this: " + this.tagName);
}

// 이벤트 캡처링 capturing
let elems = document.querySelectorAll("div"); // 태그가 div인 모든 요소를 선택
elems.forEach(function(div){
    // 각 div 태그에 클릭이 일어나면 각자의 className을 출력하는 이벤트 등록
    // 캡처링 단계에서 이벤트를 실행하기 위해 capture 옵션을 true로 줌
    div.addEventListener("click", logEvent, true);

    //혹은
    // div.addEventListener("click", logEvent, { capture: true });
});

document.addEventListener("click", logEvent, true);

function logEvent(event){
    // event.stopPropagation();
    console.log(event.currentTarget.className);
}
