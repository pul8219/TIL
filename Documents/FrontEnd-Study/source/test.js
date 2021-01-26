// const hi = para => {
//     console.log(para);
// }

// hi("hello");

// document.addEventListener('click', function(event){
//     console.log(event);
// });

// const checking = document.querySelector(".todo-list");
// console.dir(checking);

// // 구조 분해 할당 예시 (배열)

// const arr = [10, 20]

// // bad👎
// // let a = arr[0];
// // let b = arr[1];

// // good👍
// let [a, b] = arr;
// console.log(a); // output: 10

// [a, b, ...rest] = [10, 20, 30, 40, 50];
// console.log(rest); // output: [30, 40, 50]

// map()
// const arr = ['tiger', 'rabbit', 'mouse'];
// const newArr = arr.map((elem) => 'Animal: ' + elem);
// console.log(newArr);

// // 객체 다중프로퍼티 사용 destructing

// let person1 = {
//     firstName: 'Suyeon',
//     lastName: 'Park',
//     hobby: 'game'
// }

// // bad👎
// function getFullName(user){
//     const firstName = user.firstName;
//     const lastName = user.lastName;
//     return `${lastName} ${firstName}`;
// }

// // good👍
// function getFullName(user){
//     const {firstName, lastName} = user;
//     return `${lastName} ${firstName}`;
// }

// // best👍👍
// function getFullName({firstName, lastName}){
//     return `${lastName} ${firstName}`;
// }

// console.log(getFullName(person1));

// =========================================

// 블랙커피스터디

// class todo{
//     constructor(todo){
        
//     }
// }

// function TodoApp(){
//     const $todoList = document.querySelector('todo-list');
//     this.todoItems = [];

//     this.setState
// }

// live-server 깔기

// type="module" 로 script 불러오면 defer로 불러온대(근데 브라우저에서 허용하는 범위가 적대 그래서 현실적으론 body 아래에 놓는대)

// can i use 사이트 - 브라우저 에서 허용하는거 알려주는, 검색할 수 있는

// event target? 

// uuid - unique 값을 만들어주는 라이브러리

// map
// 매핑한다.

// keyed id 
// redux nomalize
// `const todoList` 관련 이슈
// 현업에선 redux nomalize 많이 쓴대

// 코드 클린업하면서 작성하는게 좋음
// 부분부분 비슷한걸로 모아놓고

// 공백이 있는 문자열은 '    '
// truthy한 값
//!이 변수 -> false

// ''
// falsy한 값

// Truthy or Falsy

// 여기서 todo는 뭐지. todoList 배열의 요소를 하나하나 담은건가
    // 그리고 findIndex 안에 들어간건 판별식형태라고 하던데 그게 맞는 index를 찾는 것인듯?
    //const idx = todoList.findIndex((todo) => todo.id === id);

// todo list 더블클릭했을 때 수정할 수 있는 상태로 전환되도록
// todo list를 더블클릭했을 때 input 모드로 변경(li 태그에 editing class 추가하면됨) 단 이때 수정을 완료하지 않은 상태에서 esc키를 누르면 수정되지 않은 채로 다시 view 모드로 복귀

// let list = document.getElementById('todo-list');
// let input = document.querySelector('#new-todo-title');

// input.addEventListener("keydown", function(e){
//     if(e.keyCode == 13){ // enter key
//         // code for enter
//         let li = document.createElement('li');
//         //console.dir(li);
//         li.innerHTML = input.value;
//         list.appendChild(li);
//     }
// });

// 210123 은영언니 설명
// 관행적으로 태그를 선택할 때 변수에 앞에 $를 붙여줌
// window는 브라우저 통째를 의미
// window.document 문서의 태그들을 다 가지고 있음

// 태그 찾기
// 1. 태그이름 2. .class이름 3. #id 이름
// window.document.querySelector("");

// 2. 사용자의 Enter 이벤트 감지하기 -> 핸들러(사용자가 이벤트를 발생시키고 감지하는 함수라 핸들러라는 이름 붙여짐) 추가
// addEventListener // 자동으로 event 객체를 전달해준다.

// event.target -> 요소겠지 -> value라는 프로퍼티에 입력한 문자가 있을것!

// <ol>보단 <ul> 많이 씀

// Node란 body 이런 태그를 노드라그러고 태그 안의 텍스트들도 노드라고 할 수 있음. 각각의 요소를 모두 

//li 노드 생성 -> ul의 자식에 추가
// const content = event.target.value;
// const $ul = window.document.querySelector("#todo-list");
// const li = window.document.createElement("li");
// innerHTML 1.text를 넣어줄 수도 있다 2. 태그를 넣어줄 수도 있다. // $ul.innerHTML = '<li>' + content + '<li>'; 도 가능
// $ul.innerHTML = '<li>${content}<li>' //backtick 사용도 가능. 템플릿 리터럴
// $li.innerHTML = content;

// vue 이런 프레임워크에서는 요소 createElement 이런거 안하고 이미 만들어진 라이브러리로 가져다 쓸 수 있음


//TodoItem추가시 아래 템플릿 활용

// `<li>
//     <div class="view">
//       <input class="toggle" type="checkbox"/>
//       <label class="label">새로운 타이틀</label>
//       <button class="destroy"></button>
//     </div>
//     <input class="edit" value="새로운 타이틀" />
//   </li>
//   <li class="editing">
//     <div class="view">
//       <input class="toggle" type="checkbox" />
//       <label class="label">수정중인 타이틀</label>
//       <button class="destroy"></button>
//     </div>
//     <input class="edit" value="수정중인 타이틀" />
//   </li>
//   <li class="completed">
//     <div class="view">
//       <input class="toggle" type="checkbox" checked/>
//       <label class="label">완료된 타이틀</label>
//       <button class="destroy"></button>
//     </div>
//     <input class="edit" value="완료된 타이틀" />
//   </li>`