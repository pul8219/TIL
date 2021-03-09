export default는 {} 이런식으로 import 못 한다.

html script 태그에 type="module"

객체에 프로퍼티와 값의 네이밍이 같은경우
name: name
을
name으로 줄여쓸 수 있다

자바스크립트 객체<->json 변환 필요

fetch()는 Promise 객체를 반환
이 반환되는 것에 대해 사용법과 .then등 학습해야함
json() 서버가 주는 json데이터를 사용하고 싶으면 써야함
(axios를 쓸 경우 이는 생략되지만 우리는 vanilla js 로 구현하는 것이기 때문에 fetch() 사용)

map() 쓰고 join() 이거 자세히

- input 태그에 입력한 텍스트는 input 태그의 value속성에 저장되므로 요소.value로 접근해야한다. 닫는 태그가 없고 그래서 당연히 사이에 text가 없기 때문에 textContent 했을 때 계속 빈 문자열이 나오는 것임

- innerHTML 말고 다른거 쓸 수 없을지 생각해보기

- api.js 에서

request 함수에서 .then 써야하나? 안써도 작동하는 이유는 뭐지

    // 웹로딩시 아무 유저도 안 보일 때 어떤 걸 보여줄 것인지도 적어줘야 함
    // 어떤 유저를 눌렀다가 다시 눌렀을 때 선택해제되고 기본 유저를 보여줘야함

# 주석 기록

- `api.js`

```js
// const request = async (url, option = {}) => { // 여기서 ={} 이건 뭐지 디폴트 매개변수 표현방법중에 이렇게 중괄호로 표현하면 뭐지!
// GET 요청은 option이 생략되어도 되는 이유는?
```

- `loadTodos.js`

```js
// priority는 0인 경우 옵션을 선택할 수 있도록 , 1인 경우는 1순위라고 뜨도록? 그럼 1순위일 때 혹시 수정은 어떻게 하나
// priority 옵션이 3개니까 checked랑은 다르게 접근해야할 듯

// 요소 선택
// '#user-title strong' 은 되고 '#user-title > strong'은 안되는 이유는?
```

## 참고

fetch()

- MDN - Using Fetch https://js-todo-list-9ca3a.df.r.appspot.com

- https://wooooooak.github.io/javascript/2018/11/25/fetch&json()/

json()

- https://developer.mozilla.org/ko/docs/Web/API/Body/json

- https://github.com/next-step/js-todo-list-step2/pull/16
