# 🎯 1주차 미션 TodoList CRUD

## 🎯 요구사항

- [x] todo list에 todoItem을 키보드로 입력하여 추가하기
- [x] todo list의 체크박스를 클릭하여 complete 상태로 변경. (li tag 에 completed class 추가, input 태그에 checked 속성 추가)
- [x] todo list의 x버튼을 이용해서 해당 엘리먼트를 삭제
- [x] todo list를 더블클릭했을 때 input 모드로 변경. (li tag 에 editing class 추가) 단 이때 수정을 완료하지 않은 상태에서 esc키를 누르면 수정되지 않은 채로 다시 view 모드로 복귀
- [x] todo list의 item갯수를 count한 갯수를 리스트의 하단에 보여주기
- [x] todo list의 상태값을 확인하여, 해야할 일과, 완료한 일을 클릭하면 해당 상태의 아이템만 보여주기

## 🎯🎯 심화 요구사항

- [x] localStorage에 데이터를 저장하여, TodoItem의 CRUD를 반영하기. 따라서 새로고침하여도 저장된 데이터를 확인할 수 있어야 함

---

# TodoList CRUD(1주차 미션) 기록

# TodoItem 추가

**요구사항**

- 사용자가 텍스트를 입력하고 엔터를 누르면 TodoItem를 추가하기
- 공백 체크(아무것도 입력하지 않고 엔터를 눌렀거나 공백만 있는 문자열만을 입력한 후 엔터를 누르는 경우 TodoItem이 추가되지 않도록하기)

## TodoItem에 저장되는 데이터

- 식별가능케하는 고유값 (id) - newGuid()라는 함수를 이용해 유니크한 id값을 생성(구글링한 함수 이용함)
- 사용자가 입력한 TodoItem 내용(contents)
- 완료한 TodoItem인지 아닌지 값(completed)
- TodoItem을 생성한 시점의 timestamp 값

# TodoList 불러오기

**요구사항**

- TodoItem이 추가되거나 삭제되면 변경사항이 즉각 반영되도록 TodoList 업데이트하기

## TodoList를 불러올 때마다 아이템 순서가 뒤바뀌는 문제

- TodoList를 불러올 때마다 localStorage에 저장된 TodoItem들을 랜덤으로 불러온다. 추가된 순서대로 불러오려면 어떻게 해야할까?

### 적용한 방법

- 애초에 TodoList에 TodoItem을 추가할 때부터 추가한 시점의 timestamp 값도 localStorage에 같이 저장한다. 그리고 todoList를 불러올 때 localStorage의 데이터들을 timestamp 순서대로 정렬해 배열에 담고(먼저 저장된 아이템이 제일 먼저 저장되도록) 이를 DOM에 차례대로 뿌려준다. (정렬 때 `sort()` 함수 사용함)

## 여기서 `innerHTML`을 쓰지 않을 수 있는 방법은 없을까?

# TodoItem 체크

**요구사항**

- TodoItem의 체크박스를 클릭하면 해당 TodoItem을 complete 상태로 변경(완료) - `<li>`에 'completed' class 추가, `<input>`에 'checked' 속성 추가하기

# TodoItem 삭제

**요구사항**

- TodoItem의 x 버튼을 이용해 해당 요소를 삭제하기

# TodoItem 수정

**요구사항**

- TodoItem을 더블클릭했을 때 input 모드로 변경하기. (`<li>`에 'editing' class 추가) 단, 이때 수정을 완료하지 않은 상태에서 Esc키를 누르면 수정되지 않은 채로 다시 view 모드로 복귀하기
- 어떤거 수정중일 때 다른거 더블클릭하면 아예 작동하지 않게하거나 그거 수정할 수 있도록 모드 체인지

## 수정시 input 모드에서 문자열이 끊겨 출력되는 문제

![image](https://user-images.githubusercontent.com/33214449/109534033-3f775880-7afe-11eb-8b9a-6e91e94afae2.png)

'5 0' 이렇게 공백을 포함해 투두아이템을 추가하는 경우 투두리스트를 불러올 때 html에 `value='${contents}'` 이런식으로 홑따옴표로 감싸줘야 value중간이 끊기지 않고 잘 저장된다.

https://www.phpschool.com/gnuboard4/bbs/board.php?bo_table=qna_html&wr_id=270467

추가) 아예 공백 여러개는 저장되지 않게 추가할 때부터 trim을 쓰자
흠 근데 문제가... 이 기능을 도입을 안 하면 어차피 html은 보여줄때 연속 공백을 제거해버리는데 실제 값은 공백이 포함되어있어 수정할 때 잘만 보임
기능 구현하려면 다음 링크 참고 https://m.blog.naver.com/PostView.nhn?blogId=success87pch&logNo=220776190125&proxyReferer=https:%2F%2Fwww.google.co.kr%2F (연속 공백(여러개 공백)을 하나의 공백으로 줄이기)

## 요소 수정모드에서 다른 요소를 더블클릭하면 해당 요소가 수정모드로 전환되고 기존 요소는 수정모드 해제되도록

cancelEditMode() 함수 참고

어떤 요소를 수정모드로 전환할 때마다(더블클릭할 때마다) 기존에 어떤 요소가 수정모드였으면 해제하는 함수인 cancelEditMode를 구현했다.(더블클릭할 때마다 해제되니까 수정모드인거 하나만 찾으면됨. 어차피 하나밖에 없을테니까)
근데 모양만 바뀌고 입력하는 텍스트에서 문제발생
예를들어 어떤 요소에 더블클릭을해서 수정중이였다고 하자. 내용을 새로 입력해서 내용이 바뀌었는데 esc나 enter를 누르지 않고 다른 요소를 더블클릭해서 해당 요소가 수정모드로 바뀐다면? 그럼 다시 그 전 요소를 더블클릭했을 때 입력만 하고 저장하지 않았던 내용이 나타난다. 따라서 cancelEditMode에서도 수정모드 해제되는 요소가 변경 전 내용으로 텍스트가 초기화되는 과정이 필요하다.(label에 있는 원래 내용을 가져다 썼음)

# 기타 기능

**요구사항**

- TodoList의 TodoItem 갯수를 리스트 하단에 보여주기('전체보기', '해야할 일', '완료한 일' 버튼을 누를 때마다 바껴야함)
- TodoList의 상태값을 확인하여 '해야할 일'과 '완료한 일' 버튼을 클릭하면 해당 상태의 TodoItem만 보여주기

# 새로고침해도 데이터가 남아있도록 구현하기

**요구사항**

- localStorage에 데이터를 저장해서 페이지를 새로고침해도 데이터가 날라가지 않고 저장된 데이터를 확인할 수 있도록 하기

# 기타

## className 대신 classList 활용

```js
// className 사용했을 때
if (target.className !== 'toggle') return; // target 요소의 클래스가 여러개일 경우 오류가 발생할 수 있다.

// 아래와 같이 classList를 사용해 코드 수정하기
if (!target.classList.contains('toggle')) return;
```

## `||`, `&&`를 활용한 최적화(삼항연산자 대신 사용)

`js/checkTodo.js` 참고

`completed` 값이 `false`면 `true`를, `true`면 `false`를 저장하는 로직

```js
// 삼항연산자를 썼을 때
localVal.completed = localVal.completed ? false : true;

// 위 코드를 ||, && 최적화를 이용한 아래 코드로 대체
localVal.completed = localVal.completed === false || false;
```

`js/editTodo.js` 참고

```js
export const editTodo = ({ target, key }, originVal) => {
  const keyList = {
    Enter: editTodoItem,
    Escape: revertTodoItem,
  };
  return keyList[key] && keyList[key](target, originVal);
  // Enter, Escape 이외의 키에 대한 keyup 이벤트가 발생하면 false를 리턴할거고, key가 Enter이면 editTodoItem함수를, Escape이면 revertTodoItem 함수를 호출할 것이다.
};
```

---

# 미션 후기

- todoList라는 배열에 할일목록에 대한 정보를 저장하는 식으로 구현했습니다. app.js 한 파일에 js 코드가 모두 작성되어있고 모듈화는 되어있지않습니다.(앞으로 개선해보고싶어요!) 미션 문서에 나와있는 프론트엔드 상태관리 방식은 아직 이해하기가 어려워서 적용하지 못했습니다.
- 자바스크립트를 다루는 데에 부족한 점이 많습니다. 더 효율적이고 좋은 방법이 있을 것 같은데 미션을 진행할 때 적용하지 못한게 많아 아쉽네요. 많이 배워가고싶어요 피드백 부탁드립니다!

# 수정 필요

- '해야할 일', '완료한 일'을 눌렀을 때도 TodoList count(갯수)가 바뀔 수 있게 코드 수정하기 ok
- class 도입(TodoApp 이런 클래스 많은 분들이 만들어서 사용하셨던데) -> 전체보기 해야할일 완료한일 메뉴에 대한 코드도 적절하게 모듈화하고 겹치는 코드는 줄이고 싶음

# 피드백

- export{~~} 를 export 하려는 함수나 변수들 보다 상단에 둬도 에러가 안 나는 이유는?
- closest 자세히
- Element 객체 구조. textContent, value
- classList.toggle
- className

# 더 알아보기

- export default
- window.locaiton.hash
- class, constructor, this
- strict mode
- filter()
- 컴포넌트화 이게 도대체 멍미
- 자바스크립트의 중첩함수는 언제 사용해야할까? https://siyoon210.tistory.com/162

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

자료구조 Map

- MDN - Map https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Map

- Map 객체 https://velog.io/@vvee1253/JavaScript-Map-%EA%B0%9D%EC%B2%B4

```js
// ex 해야할 일 누른 상태에서 새로고침하면 주소창은 #active 이고 화면은 전체보기인 것 어떻게 해야하나?
```

# 온라인세션 3/2(화)

기능별로 파일을 나눠서 구현
생성자를 이용해서 코드를 좀 더 효율적으로 고칠 수 있을 것 같아서 아쉬움
오늘 올려서 코드리뷰 열심히 하면서 더 배울 것

---

상위 -> 하위 데이터를 내려주는
하위 -> 상위 이벤트를 올려주고

상위 컴포넌트에서 데이터르 ㄹ유일하게 변경하게 하는 setstate

데이터 변경이 여러곳에서 일어나면 복잡하고 효율적이지 않기 때문에
상위 컴포넌트에서 관리

클린코드 책보면
파라미터 많은 경우, 리팩토링 대상임
파라미터는 가능하면 0개가 좋은데... 1개나 최대 2개.
그 이상이라면 객체로 관리해서 데이터를 내려주는게 좋음

변수에 $ 표시에 의미

const $dom = document.querySelector("");
const $ = (selector) => document.querySelector("");

DOM 셀렉팅을 유틸함수를 만들어 간소화할 수 있음

$(".query").addEventListener("click", )

---

js 공부할 때
구현하면서 모르는 개념 왔다갔다하면서 공부
한책만 보는 것보단 두세권 사놓고 보는게 좋대(책마다 어떤 개념에 대해 설명한 정도가 풍부할 수도 부족할 수도 있기 때문)

---

인터넷이 오프라인일 때
를 위해 로컬스토리지에 임시데이터 저장 많이 하기도 한데
(임시 버퍼 공간처럼)
(사용자 경험상)
가장 최근의 사용자 성향(다크모드라던지) 최신 움직임들에 대해 저장

사실 이건 서비스 성격에 따라 천차만별

크기 자체도 크지 않아서 로컬스토리지에 많은 것을 담으려고 하지는 않는대

---

innerHTML
문자열 파싱하고 연산하는 작업이 많이 든대
복잡한 컴포넌트가 많은 경우에는 createElement 같은, 메모리 상에서 가상의 돔 엘리먼트를 만들어 마지막에 붙여주는 그런 방법이 많이 사용된대
이런 작은 투두리스트 프로젝트에서는 괜찮지만

---

this★
함수나 그런걸 호출하는 객체를 알고 있다는 뜻
this를 활용하지 않을 이유가 없다.
상태를 가지는 어떤 객체고 메시지를 주고 받는다면 this를 사용할 것을 권장
es6 class 문법 사용하기

---

컴포넌트로 모듈화 vs 디자인 패턴 적용해 모듈화(ex.mvc)
둘다로 짜보고 장단점 파악하는게 좋을 것

유명한 누구 : 디자인 패턴은 반만 완성된 것이다.

---

공통피드백
웬만하면 const 쓰기
관련)자바스크립트 데이터 타입 (참조형 참고)

더이상 쪼갤 수 없을 정도로 함수로 쪼개보기
함수 안의 내용이 15줄이 넘어간다면 최대한 분리할 수 있는 방법이 없나 확인해보기

자바스크립트에서 array객체?에서 제공하는 메서드 활용
ex. filter()

반복문보다는 파이프
filter()이용해 이렇게 한줄로 줄일 수 잇음
배열을 순회하거나 그럴 때 유용

7. 데이터 상태변경에 대한 추적 쉬움

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
