# 🎯 1주차 미션 TodoList CRUD

## 🎯 요구사항

- [x] todo list에 todoItem을 키보드로 입력하여 추가하기
- [x] todo list의 체크박스를 클릭하여 complete 상태로 변경. (li tag 에 completed class 추가, input 태그에 checked 속성 추가)
- [x] todo list의 x버튼을 이용해서 해당 엘리먼트를 삭제
- [x] todo list를 더블클릭했을 때 input 모드로 변경. (li tag 에 editing class 추가) 단 이때 수정을 완료하지 않은 상태에서 esc키를 누르면 수정되지 않은 채로 다시 view 모드로 복귀
- [x] todo list의 item갯수를 count한 갯수를 리스트의 하단에 보여주기
- [x] todo list의 상태값을 확인하여, 해야할 일과, 완료한 일을 클릭하면 해당 상태의 아이템만 보여주기

## 🎯🎯 심화 요구사항

- [ ] localStorage에 데이터를 저장하여, TodoItem의 CRUD를 반영하기. 따라서 새로고침하여도 저장된 데이터를 확인할 수 있어야 함

# 미션 후기

- todoList라는 배열에 할일목록에 대한 정보를 저장하는 식으로 구현했습니다. app.js 한 파일에 js 코드가 모두 작성되어있고 모듈화는 되어있지않습니다.(앞으로 개선해보고싶어요!) 미션 문서에 나와있는 프론트엔드 상태관리 방식은 아직 이해하기가 어려워서 적용하지 못했습니다.
- 자바스크립트를 다루는 데에 부족한 점이 많습니다. 더 효율적이고 좋은 방법이 있을 것 같은데 미션을 진행할 때 적용하지 못한게 많아 아쉽네요. 많이 배워가고싶어요 피드백 부탁드립니다!

# 피드백

- export{~~} 를 export 하려는 함수나 변수들 보다 상단에 둬도 에러가 안 나는 이유는?
- closest 자세히
- Element 객체 구조. textContent, value
- classList.toggle
- className

# 더 알아보기

# 참고자료

localStorage

- [자바스크립트] 웹 스토리지 (localStorage, sessionStorage) 사용법 https://www.daleseo.com/js-web-storage/

- JavaScript LocalStorage 사용 방법과 쿠기와 차이점 https://ponyozzang.tistory.com/341

- Javascript 에서 Local Storage를 사용하는 방법 https://hasudoki.tistory.com/entry/JavaScript%EC%97%90%EC%84%9C-Local-Storage%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95

- local storage 를 이용한 데이터 저장 https://coding-restaurant.tistory.com/294

모듈

- 자바스크립트 모듈(Module) 학습 내용 간단 요약 https://velog.io/@takeknowledge/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EB%AA%A8%EB%93%88-%ED%95%99%EC%8A%B5-%EB%82%B4%EC%9A%A9-%EC%9A%94%EC%95%BD-lwk4drjnni

new Date()

- https://codingbroker.tistory.com/38
- 시간 정렬 https://stackoverflow.com/questions/10123953/how-to-sort-an-object-array-by-date-property

*

자료구조 Map

- MDN - Map https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Map

- Map 객체 https://velog.io/@vvee1253/JavaScript-Map-%EA%B0%9D%EC%B2%B4

```js
// ex 해야할 일 누른 상태에서 새로고침하면 주소창은 #active 이고 화면은 전체보기인 것 어떻게 해야하나?
```

# 주석

미션1

```js
// todoListRender()

// localStorage 로직 추가
// localStorage.clear() 이렇게 비우는 로직은 필요한가? 고민 필요
// localStorage에서 내용을 불러와 todoArr 배열에 저장
// id 속성은 중복으로 넣기 싫어서, id 속성을 애초에 목록추가할 때 key로 설정하고 이 key로 요소를 찾을 수 있도록 한 다음에, 전체를 불러올 땐 key로 찾아온다음에 배열에 id 요소 추가
// 아래 로직 수행하는 코드를 함수로 분리해야할 듯

// 🌟 localstorage에 저장한 값들이 새로고침되면 입력했던 투두 순서에 상관없이 뒤죽박죽 나오길래 timestamp라는 걸 목록 정보에 같이 저장해서 뿌려줄 때 timestamp(시간정보) 대로 정렬해서 들어간 순서대로 화면에 출력되도록 했다.

// todoArr 배열에 저장된 내용을 map으로 html요소를 만들어 뿌림

// ===============================

// addTodo()

// 사용자가 입력창에서 enter를 누를 때 실행되는 함수
// newGuid() // id 부여 (utils.js의 newGuid() 함수 참고)

// 입력창 초기화

// ================================

// checkTodo()

// 🌟 투두 목록 전체를 다 로드하는 함수는 필요없을 수도 있나?.. completed를 스토리지에 저장 안하고 수정, 삭제, 체크 등을 다룰 수 있는 방법이 있나 생각해보기!
// completed 값 localstorage에 저장할 땐 문자열이 아니라 true, false이 저장되는 걸로 하자(on/off) 그래야 공간을 덜 차지할 거 아니여
// true 이면 완료된거고, false이면 (falsy) 완료 안 된걸로 구분하면 될 듯

// 체크박스 클릭시 동작하는 이벤트 핸들러

// ================================

// deleteTodo()

// x 버튼 클릭시 이벤트 핸들러
// const idx = todoList.findIndex((todo) => todo.id === id);

// todoList.splice(idx, 1); // 해당 요소 삭제

// ==============================

// editTodo()

// 더블클릭시 수정모드로 전환
// 커서가 글자 끝에 가게 수정하자! //일단 나중 일

// 이미 수정하려고 더블클릭한 요소가 있었다면 해제

// ==============================

// onEdited()

// esc누르기 전에 작성된 내용이 더블클릭할시 다시 나타나는 오류를 방지

// ==============================

// 버튼들은 비슷한 로직이 반복되므로 묶어주기
// viewAll()
// viewTodo()
// viewDone()

// =============================

// editFilter()

// 아래 코드 처럼 짜려고 했는데 안됐음

// const editFilter = () => {
//     const filter = event.target.textContent;
//     const $filterList = $todoApp.querySelector('.filters');

//     $filterList.innerHTML = `
//         <li>
//             <a class=${filter==="전체보기"?"all selected":"all"} href="#">전체보기</a>
//         </li>
//         <li>
//             <a class="${filter==="해야할 일"?"active selected":"active"}" href="#active">해야할 일</a>
//         </li>
//         <li>
//             <a class="${filter==="완료한 일"?"completed selected":"completed"}" href="#completed">완료한 일</a>
//         </li>`;
// };

// 혹은

// // 수정
// const changeMode = ({ target }) => {
//     event.preventDefault();
//     console.log(event.target);
//     const filter = target.textContent;

//     const $allLi = $todoList.querySelectorAll('li');
//     console.log($allLi);
//     const $compLi = $todoList.querySelectorAll('li.completed');

//     if(filter == "전체보기"){
//         $allLi.forEach($item => {
//             $item.style.display = 'block';
//         });
//         todoListRender();
//         // todo list의 총 item 갯수 표시
//         $todoCount.innerText = localStorage.length;
//     }
//     // else if(filter == "해야할 일"){
//     //     $allLi.forEach($item => {
//     //         $item.style.display = $item.classList.contains('completed')? 'none' : 'block';
//     //     });
//     //     //$todoCount.innerText = $allLi.length - $compLi.length;
//     // }
//     // else if(filter == "완료한 일"){
//     //     $compLi.forEach($item => {
//     //         $item.style.display = 'block';
//     //     });
//     //     //$todoCount.innerText = $compLi.length;
//     // }

//     // switch(filter){
//     //     case '전체보기':
//     //         filter = 'all';
//     //         break;
//     //     case '해야할 일':
//     //         filter = 'active';
//     //         break;
//     //     case '완료한 일':
//     //         filter = 'completed';
//     //         break;
//     //     default:
//     //         break;
//     // }

//     const $filterList = $todoApp.querySelector('.filters');
//     console.log($filterList);
//     // 여기 ${}를 ""로 안 감싸면 동작하지 않는데 왜일까?
//     $filterList.innerHTML = `
//         <li>
//             <a class="${filter==="전체보기"?"all selected":"all"}" href="#">전체보기</a>
//         </li>
//         <li>
//             <a class="${filter==="해야할 일"?"active selected":"active"}" href="#active">해야할 일</a>
//         </li>
//         <li>
//             <a class="${filter==="완료한 일"?"completed selected":"completed"}" href="#completed">완료한 일</a>
//         </li>
//         `;

//     // if(filter==='completed'){

//     // }
//     // else if(filter==='active'){

//     // }
//     // else if(filter==='all'){

//     // }
// };

// $viewAllList.addEventListener('click', editFilter); // '전체보기'
// $viewTodoList.addEventListener('click', editFilter); // '해야할 일'
// $viewDoneList.addEventListener('click', editFilter); // '완료한 일'
```

```html
<!-- 템플릿 -->
<!-- 
<ul id="todo-list" class="todo-list">
  <li>
    <div class="view">
      <input class="toggle" type="checkbox"/>
      <label class="label">새로운 타이틀</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="새로운 타이틀" />
  </li>
  <li class="editing">
    <div class="view">
      <input class="toggle" type="checkbox" />
      <label class="label">수정중 타이틀</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="수정중 타이틀" />
  </li>
  <li class="completed">
    <div class="view">
      <input class="toggle" type="checkbox" checked/>
      <label class="label">완료된 타이틀</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="완료된 타이틀" />
  </li>
</ul> -->
```

# 추가

익명함수 쓰면 바로 리턴

소현님이 사용하시는 방법 -> 옵저버 패턴

분기분기 해서 핸들러에도 상황마다 다른 함수 실행시킬 수 있나봐

export default는 뭐지

어떤 함수를 쓸 때 그게 원본 변수를 변경하는지도 생각해보기
바꾸면 안되는 상황이 있을 수 있으니까!

어떤분이 드래그앤드롭으로 휴지통에 넣는거(삭제)기능 구현하셨대
