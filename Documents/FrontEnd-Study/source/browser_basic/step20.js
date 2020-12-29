// index.html 파일 관련

// let menu = document.querySelector(".menu");

// menu.onclick = function(event) {
//     if (event.target.nodeName != 'A') return;
  
//     let href = event.target.getAttribute('href');
//     alert( href ); // 서버에서 데이터를 읽어오거나, UI를 새로 만든다거나 하는 등 원하는 작업이 여기에 들어감
  
//     return false; // 브라우저 동작을 취소(URL로 넘어가지 않음)
//   };




// event.defaultPrevented
// index2.html 관련 
//(상단의 코드 주석처리하고 실행해야함)

elem = document.getElementById('elem');

elem.oncontextmenu = function(event){
    console.log(event.defaultPrevented);
    event.preventDefault();
    alert("버튼 컨텍스트 메뉴" + event.defaultPrevented);
};

document.oncontextmenu = function(event){
    // event.defaultPrevented 값이 true이면 return 
    if(event.defaultPrevented){
        console.log(event.defaultPrevented);
        return;
    } 
    console.log(event.defaultPrevented);
    event.preventDefault();
    alert("문서 컨텍스트 메뉴" + event.defaultPrevented);
};

