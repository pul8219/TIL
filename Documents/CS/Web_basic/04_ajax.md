# AJAX

AJAX(Asynchronous JavaScript And XML)

AJAX는 자바스크립트를 사용해 비동기적으로 데이터를 받아와 동적으로 DOM을 갱신 및 조작하는 기법을 의미한다. **비동기적**으로 동작하기 때문에 서버와 통신할 때 페이지를 새로고침(리로드)하지 않고도 데이터 변경, 페이지 업데이트가 가능하다.약자에 XML이 있는 이유는 예전에 데이터 포맷으로 XML을 많이 사용했기 때문이다.

`XMLHttpRequest`(XHR) 객체를 이용해 서버와 데이터를 주고 받는다. `XML` 뿐만 아니라 `JSON`, `HTML`, 텍스트 파일 등 다양한 포맷의 파일을 주고 받을 수 있다. `HTTP` 이외의 프로토콜도 지원한다.(`file`, `ftp` 등)

`XMLHttpRequest` 말고 `fetch API`를 사용할 수도 있다. (IE에선 지원하지 않는다.) ES2015에서 표준이 되었고 Promise를 리턴한다.

# XMLHttpRequest

# References

- [AJAX - MDN](https://developer.mozilla.org/en-US/docs/Web/Guide/AJAX/Getting_Started)
- [XMLHttpRequest - MDN](https://developer.mozilla.org/ko/docs/Web/API/XMLHttpRequest)
- [AJAX - 취준생이 반드시 알아야 할 프론트엔드 지식들](https://github.com/baeharam/Must-Know-About-Frontend/blob/main/Notes/javascript/ajax.md)
- [AJAX란? XMLHttpRequest 사용법](https://kamang-it.tistory.com/entry/RESTfulajaxajax%EB%9E%80-XMLHttpRequest%EC%82%AC%EC%9A%A9%EB%B2%95-1)
- [AJAX와 JSON](https://kamang-it.tistory.com/entry/RESTfulajaxajax%EB%9E%80-XMLHttpRequest%EC%82%AC%EC%9A%A9%EB%B2%95-1)
