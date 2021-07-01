# 자바스크립트를 import

궁금함

`<script type="module" src="./src/main.js" defer></script>` 처럼 js를 불러오는 코드를 `<head>`에 작성하는 것과 `<body>`끝부분에 작성하는 것은 어떤 차이가 있는지? 일반적으로 `<head>`에 작성하지 않나?

# form 태그의 기본동작을 막기

form태그에서 `input`타입이 `submit`인 요소를 클릭하면 `action`속성에 지정된 서버(주소)로 폼 데이터가 전송되며 페이지 이동이 이루어진다.(새로고침됨) 이 기본동작을 막으려면 다음과 같은 방법을 쓴다.

(예전에 js스터디에서 공부했던 방법 복습하기. preventDefault 관련!)

form태그 자체가 enter를 누르면 저절로 submit 요소를 누른것처럼 동작한다.

궁금

`완료`버튼의 의미?

setEvent()를 먼저 실행한 후 render()가 실행되도록 함

render()후에 실행되는 mounted()로 todoApp의 state를 각 item(todoList, todoappender)에 넘겨준다.(bind 이용해 this를 지정) 모듈을 실행하면 각 모듈의 상태가 공유되므로 가능한 것 같음

state의 값을 바꿀 때는 setState로 꼭 바꾸도록 했음

# 디버깅 방법

- debugger for chrome 설치
- 디버거 탭에서 실행버튼을 누르며 launch.json 파일을 생성 및 수정 (내용은 아래 처럼)

```
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "type": "chrome",
            "request": "launch",
            "name": "Open index.html",
            "url": "http://localhost:5500/",
            // "file": "c:\\Users\\yurim\\Desktop\\git\\js-study-lv1\\step1\\index.html",
            "webRoot": "${workspaceFolder}"
        }
    ]
}
```

- 실행할 파일을 live-server로 실행시켜놓기
- 원하는 부분에 중단점(breakpoint) 걸기
- 디버거탭에서 실행 누르기(아님 파일에서 F5)
