[문서 목록으로 돌아가기](README.md)

> # STEP 19
>
> 💡질의응답은 <https://github.com/pul8219/TIL> `Issues` 탭의 알맞은 step 이슈안에 남겨주세요. ➡️ [Issue탭으로 이동](https://github.com/pul8219/TIL/issues)
>
> - 작성자: Wol-dan (@pul8219)
> - 스터디 주제: FrontEnd 면접 스터디 <https://gitlab.com/siots-study/topics/-/wikis/home>
> - 공부 범위: [이벤트 위임](https://ko.javascript.info/event-delegation)
> - 기한: 12/19(토) ~ 12/22(화)

# 보충 필요

- this, dataset 관련 참고자료

  https://ko.javascript.info/dom-attributes-and-properties#ref-439
  https://ko.javascript.info/object-methods
  https://ko.javascript.info/bind
  https://ko.javascript.info/constructor-new
  https://ko.javascript.info/arrow-functions

# 목차

- [이벤트 위임이란?](#이벤트-위임이란?)
- [References](#References)
- [팀원들 결과물](#팀원들-결과물)

# 이벤트 위임

## 이벤트 위임이란?

하위 요소에 각각마다 이벤트를 붙이지 않고 상위 요소에서 하위 요소의 이벤트를 제어하는 방법

간단한 TODO LIST 코드를 통해 이벤트 위임을 알아보자

(예제 참고한 출처: [이벤트 위임 - Event Delegation](https://joshua1988.github.io/web-development/javascript/event-propagation-delegation/#%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EC%9C%84%EC%9E%84---event-delegation))

```html
<h1>TODO LIST</h1>
<ul class="itemList">
  <li>
    <input type="checkbox" id="item1" />
    <label for="item1">스트레칭 및 요가</label>
  </li>
  <li>
    <input type="checkbox" id="item2" />
    <label for="item2">자바스크립트 공부</label>
  </li>
</ul>
```

```js
let inputs = document.querySelectorAll('input');
inputs.forEach(function (input) {
  input.addEventListener('click', function (event) {
    alert('clicked');
  });
});
```

![image](https://user-images.githubusercontent.com/33214449/102910255-9c7ede80-44bd-11eb-8244-5f83f1a42ba7.png)

![image](https://user-images.githubusercontent.com/33214449/102910290-ab659100-44bd-11eb-8113-7ac6ca6618b6.png)

input 태그에 이벤트를 걸었기 때문에 체크박스를 클릭하면 'clicked'라는 텍스트의 경고창이 뜬다. (물론 input태그와 연결된 label의 텍스트를 클릭해도 이 예제에선 이벤트가 발생한다.)

그런데 만약 해야할 일이 동적으로 추가된 상황이 온다면 어떻게 될까?

```js
// 아까 봤던 자바스크립트 코드에 아래 코드를 추가

// 새로운 할 일 리스트 추가
let itemList = document.querySelector('.itemList');

let li = document.createElement('li');
let input = document.createElement('input');
let label = document.createElement('label');
let labelText = document.createTextNode('은행 업무 보기');

input.setAttribute('type', 'checkbox');
input.setAttribute('id', 'item3');
label.setAttribute('for', 'item3');
label.appendChild(labelText);
li.appendChild(input);
li.appendChild(label);
itemList.appendChild(li);
```

(물론 동적으로 리스트를 추가할 때는 이런 방식 말고 어떤 이벤트를 눌렀을 때 요소가 추가되는, 더 효율적으로 작성된 코드를 쓸 것이다. 그러나 여기서는 일단 코드를 간단하게 작성해보자)

![image](https://user-images.githubusercontent.com/33214449/102911354-3eeb9180-44bf-11eb-813c-8f756f00d05e.png)

추가된 리스트를 클릭했을 때는 어떤 이벤트도 발생하지 않는 걸 볼 수 있다. 왜일까?
클릭하면 경고창을 띄우는 이벤트 리스너를 추가하는 시점에서 리스트 아이템은 두 개이기 때문이다.(지금 추가된 3번째 리스트는 이 때 없었으니) 새롭게 추가된 리스트에는 이벤트가 등록되지 않아서 그런 것이다.
이렇게 추가되는 리스트마다 일일이 이벤트를 등록해주는 일은 번거로울 것이다.
=> 이를 해결할 수 있는 방법이 `이벤트 위임` ❗

코드를 고쳐보자

```js
let itemList = document.querySelector('.itemList');
itemList.addEventListener('click', function (event) {
  alert('clicked');
});

// 새로운 할 일 리스트 추가
// ...
```

input 태그에 일일이 이벤트 리스너를 추가하는 것이 아니라,
input 태그의 상위 요소인 ul 태그, 즉 `.itemList`에 이벤트 리스너를 달아 하위 태그에서 발생한 클릭 이벤트를 감지하도록 코드를 수정했다.
이벤트가 상위 요소들로 전달되어가는 특성인, step18에서 배운 이벤트 버블링을 이용한 것!

![image](https://user-images.githubusercontent.com/33214449/102913375-04372880-44c2-11eb-9570-a210478c690a.png)

새로 추가됐던 item3인 세번째 리스트를 클릭해도 이벤트가 잘 발생하도록 바뀐 것을 확인할 수 있다.

---

💡 TODO

data-toggle-id
data-counter
이런거..

this, class 부분 생성자 다시 복습 필요

그리고 아래 링크 이해할 것

https://ko.javascript.info/event-delegation

# References

https://ko.javascript.info/event-delegation

https://joshua1988.github.io/web-development/javascript/event-propagation-delegation/#%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EC%9C%84%EC%9E%84---event-delegation

# 팀원들 결과물

- [@pul8219](https://github.com/pul8219/TIL/blob/master/Documents/FrontEnd-Study/step19.md)
- [@eyabc](https://eyabc.github.io/Doc/dev/core-javascript/Browser_Event_Delegation.html#%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EC%9C%84%EC%9E%84)
- [@khw970421](https://velog.io/@khw970421/event-delegationstep-19)
- [@JeongShin](https://www.notion.so/DOM-Event-e620a1cd2c4543979ab01dabf7a1e543)
