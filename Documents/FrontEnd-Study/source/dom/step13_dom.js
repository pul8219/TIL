// let newLi = document.createElement("li");
// newLi.innerHTML = "뉴욕"; 

// let tag_ul = document.querySelector('ul')
// tag_ul.appendChild(newLi);


// console.log(tag_ul)

// console.log(parent);

// window.onbeforeunload = function() {
//     return '작성 중인 메시지가 있습니다.'
// }

function onClickHandler(event) {
    console.log(event)
  }
  
  function onKeypressHandler(event) {
    console.log(event)
  }
  
  document.querySelector('#event-button').addEventListener('click', onClickHandler)
  
  document.querySelector('#event-input').addEventListener('keypress', onKeypressHandler)

