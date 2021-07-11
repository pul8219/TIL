[문서 목록으로 돌아가기](README.md)

> # STEP 24
>
> 💡질의응답은 <https://github.com/pul8219/TIL> `Issues` 탭의 알맞은 step 이슈안에 남겨주세요. ➡️ [Issue탭으로 이동](https://github.com/pul8219/TIL/issues)
>
> - 작성자: Wol-dan (@pul8219)
> - 스터디 주제: FrontEnd 면접 스터디 <https://gitlab.com/siots-study/topics/-/wikis/home>
> - 공부 범위: [CORS]()
> - 기한: 01/23(토) ~ 01/25(화)

# 보충 필요

- [캡틴 판교 - 프런트엔드 개발자가 알아야하는 HTTP 프로토콜 Part 1](https://joshua1988.github.io/web-development/http-part1/)

- `XMLHttpRequest`

# 목차

- [URI](#URI)
  - [URL](#urluniform-resource-locator)
  - [URN](#urnuniform-resource-name)
- [Same Origin Policy](#same-origin-policy동일-출처-정책)
  - [origin](#origin출처)
- [CORS](#cors)
  - [CORS란?](#cors란)
  - [CORS와 브라우저](#cors와-브라우저)
  - [CORS 작동 방식](#cors-작동-방식)
  - [CORS에 관여하는 응답 헤더](#cors에-관여하는-응답-헤더)
  - [Simple Request](#simple-request)
  - [Credentialed Request](#credentialed-request)

💬

- [Comment](#comment)
- [References](#references)
- [팀원들 결과물‍](#팀원들-결과물)

# URI

URI(Uniform Resource Identifier)

HTTP 요청의 목표는 리소스를 가져오는 것인데 이 리소스를 식별할 수 있게 하는 것이 URI(Uniform Resource Identifier)이다. URI는 웹 서버가 리소스를 고유하게 식별할 수 있도록 하는 것이며 하위 개념으로는 URL과 URN이 있다.

## URL(Uniform Resource Locator)

특정 서버의 한 리소스가 어디 있는지 알려주기 위한 규약이다.

흔히 웹 사이트 주소로 알고 있지만 URL은 웹 사이트 주소 뿐만 아니라 컴퓨터 네트워크상의 자원을 모두 나타낼 수 있다.

### 구조

> `<스키마>`://`<호스트>`:`<포트>`/`<경로>`?`<질의>`#`<프레그먼트>`

1. 스키마(scheme)
   사용할 프로토콜을 의미한다. 웹에서는 주로 HTTP 프로토콜을 사용

2. 호스트(Host)와 포트(Port)

- 하나의 Host(컴퓨터)에는 여러 개의 Process(프로그램)이 각각의 Socket(소켓)을 사용하여 데이터 통신을 하고 있기 때문에, 각각의 소켓을 구분할 필요가 있다.
- 이 때 소켓을 구분하는 역할을 하는 것이 Port(포트).
- ex) Tomcat을 다뤄봤다면, 로컬에서 개발을 했을 때 접근하는 URL은 localhost:8080 일 것이다. 이처럼 서버에는 포트에 따라 소켓이 연결되어 있고, 포트 번호에 따라 다른 프로토콜이 사용될 수 있다.
- HTTP 프로토콜에서 포트 번호를 명시하지 않으면, 80번 포트를 기본 값으로 사용
- HTTPS 프로토콜에서 포트 번호를 명시하지 않으면, 443번 포트를 기본 값으로 사용

3. 경로

호스트에서 제공하는 자원의 경로를 의미.

4. 질의

- `=` 쿼리 스트링(Query String)

## URN(Uniform Resource Name)

리소스가 어디에 위치해 있든 찾을 수 있는 방식(특정 네임스페이스의 네임으로 리소스를 식별)

# Same Origin Policy(동일 출처 정책)

웹페이지에서 다른 origin으로부터의 불러오는 리소스는 안전하지 않다고 보는 보안 메커니즘 (`=`같은 출처에서만 리소스를 공유할 수 있다)

이 정책에 의해서 자바스크립트로 다른 웹페이지에 접근할 때는 같은 origin의 페이지에만 접근이 가능하다.

> 외부 서버 경로로 ajax 요청을 보내면 에러가 발생하며 요청이 실패한다. 이는 자바스크립트 엔진 표준 스펙에 Same-Origin Policy(동일 출처 정책)이라는 보안규칙이 있기 때문이다.

## origin(출처)

두 URL이 같은 origin 을 갖는다는 것은 둘의 **프로토콜, 포트, 호스트**가 같다는 것을 의미한다.

### Ex)

아래 두 URL은 같은 origin이 아니다. http:// 의 기본 포트 번호는 `80`라서 둘은 포트가 다르기 때문이다.

`http://store.company.com/dir2/other.html`

`http://store.company.com:81/dir/page.html`

> 그러나 여러 도메인으로 구성되는 대규모 웹 프로젝트 증가, REST API를 이용한 외부 호출이 많아지는 상황에서 SOP는 적절치 않은 정책이 되기도 하고있다. 그래서 추가적으로 CORS라는 정책이 만들어졌다.

# CORS

## CORS란?

Cross-Origin Resource Sharing(교차 출처 자원 공유)

웹 브라우저에서 외부 도메인 서버와 통신하기 위한 방식을 표준화한 메커니즘.
서버와 클라이언트가 정해진 헤더에 따라 서로 요청이나 응답에 반응할지 결정하는 방식으로, 요청을 받은 웹서버가 허용할 경우 다른 도메인의 웹페이지 스크립트에서도 자원을 주고받을 수 있게된다.

선택적 자원에 대해 허용한 origin들만 요청할 수 있도록 하기 때문에 필요하다.

![](https://mdn.mozillademos.org/files/14295/CORS_principle.png)

출처: [MDN - CORS](https://developer.mozilla.org/ko/docs/Web/HTTP/CORS)

## CORS와 브라우저

origin(출처)는 브라우저가 판별한다.

CORS를 위반했을 때

- 서버는 정상적으로 응답
- 응답의 파기 여부는 브라우저가 결정

![](https://user-images.githubusercontent.com/31977543/89126088-f89c9280-d51d-11ea-8b47-9d540b57c194.png)

## CORS 작동 방식

웹 어플리케이션은 자신의 origin과 다른 리소스를 요청할 때, CORS를 실행한다.

1. 사용자의 첫 요청

- HTTP를 사용하여 요청을 보낸다.
- 브라우저는 요청 헤더의 `Origin` 필드에 요청을 보내는 origin(출처)를 함께 담아 보낸다.

2. 서버의 응답

- 응답 헤더 `Access-Controll-Allow-Origin`을 보낸다. (리소스에 접근가능한 허용된 출처들의 정보가 담김)

> 서버측에서도 CORS에 대한 처리가 _당연히_ 필요하다.

3. 응답을 받은 브라우저

- 자신이 보냈던 `Origin`과 받은 응답의 `Access-Controll-Allow-Origin`을 비교하여 해당 origin에서 요청할 수 있는거라면 리소스 전송을 허용하고 불가능하다면 에러를 발생시킨다.

### Preflight

웹 브라우저는 본 요청을 보내기 전에 preflight 요청(사전 요청)을 먼저 날린다. 이를 통해 실제 요청하려는 경로와 같은 URL에 대해서 옵션 메서드로 요청을 미리 날려보고 요청을 할 수 있는 권한이 있는지 확인한다.

- HTTP의 `OPTIONS` 메서드가 사용된다.

![](https://user-images.githubusercontent.com/31977543/89126538-42d34300-d521-11ea-90a4-beae5ab70188.png)

![](https://user-content.gitlab-static.net/b08e6a235bfe1a6e36c2e0373abf502cdc70b153/68747470733a2f2f6769746875622e636f6d2f6b696d7365756c62692f54494c2f7261772f6d61737465722f4a6176615363726970742f61737365742f636f72732e706e67)

2. 실제 요청

## CORS에 관여하는 응답 헤더

### Request headers(클라이언트의 요청 헤더)

- Origin
  요청을 보내는 페이지의 origin(출처)

- Access-Control-Request-Method
  실제 요청에서 어떤 메서드를 사용할 것인지 알리기 위함

- Access-Control-Request-Headers
  실제 요청에서 어떤 헤더를 사용할 것인지 알리기 위함

### Reponse headers(클라이언트의 응답 헤더)

- Access-Control-Allow-Origin

  `*`이면 모든 외부 도메인에서 모든 요청을 허용한다는 것 (`Access-Control-Allow-Origin: *`)

## Simple Request

- 예비 요청이 없다.

![](https://user-images.githubusercontent.com/31977543/89157338-54f7c480-d5a7-11ea-9daf-131893d4db68.png)

## Credentialed Request

요청에 인증과 관련된 정보를 담을 수 있게 하여 CORS에서 보안을 좀 더 강화할 수 있는 방법

### credential 옵션의 종류

> ❗ TODO

[더 알아보기](https://eyabc.github.io/Doc/dev/network/CORS.html#credentialed-request)

# Comment

웹 보안상 기본적으로 SOP 정책이 적용된다는 것을 처음 알게되었다. 그리고 CORS도 처음 접해보는 개념인데 어떤 역할을 하는지는 이해가 가나, 구체적으로 어떻게 사용하는지는 잘 모르겠다. 팀원분들 문서도 살펴보고 추가적으로 더 공부하면서 정리필요

# References

- URI&URL https://velog.io/@jch9537/URI-URL

- URI, URL 구조 https://victorydntmd.tistory.com/287

- MDN - Identifying resources on the Web https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Identifying_resources_on_the_Web

- MDN - Same-origin policy https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy

- MDN - CORS https://developer.mozilla.org/ko/docs/Web/HTTP/CORS

- REST API https://meetup.toast.com/posts/92

- HTTP 접근 제어(CORS)란? https://velog.io/@suseodd/HTTP-%EC%A0%91%EA%B7%BC-%EC%A0%9C%EC%96%B4-CORS-%EB%9E%80

- CORS란 무엇인가? https://hannut91.github.io/blogs/infra/cors

- CORS&HTTP&HTTPS&HTTPCache https://gitlab.com/siots-study/topics/-/wikis/CORS&HTTP&HTTPS&HTTPCache

- CORS는 왜 이렇게 우리를 힘들게 하는걸까? https://evan-moon.github.io/2020/05/21/about-cors/

- eyabc - CORS https://eyabc.github.io/Doc/dev/network/CORS.html

- [로컬에서 CORS policy 관련 에러가 발생하는 이유](https://velog.io/@takeknowledge/%EB%A1%9C%EC%BB%AC%EC%97%90%EC%84%9C-CORS-policy-%EA%B4%80%EB%A0%A8-%EC%97%90%EB%9F%AC%EA%B0%80-%EB%B0%9C%EC%83%9D%ED%95%98%EB%8A%94-%EC%9D%B4%EC%9C%A0-3gk4gyhreu)

# 팀원들 결과물

- [@pul8219](https://github.com/pul8219/TIL/blob/master/Documents/FrontEnd-Study/step24.md)
- [@eyabc](https://eyabc.github.io/Doc/dev/network/CORS.html)
- [@khw970421](https://velog.io/@khw970421/CORS-step23)
- [@JeongShin](https://www.notion.so/CORS-05a8053d9e1d4d84842a38a7d64502e1)
