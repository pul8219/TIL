# 웹(Web)

인터넷 서버에 올린 문서를 네트워크를 통해 불특정 다수의 사람들이 볼 수 있도록 한 기술이다.

> WWW(World Wide Web)

# 클라이언트와 서버

- 클라이언트(Client): 정보를 요청하는 쪽
- 서버(Server): 정보를 제공하는 쪽

정보를 제공해준다는 건 컴퓨터 안에 정보를 제공해주는 프로그램이 돌아가고 있다는 것을 의미한다. 예를 들어 웹을 제공해주는 웹서버는 웹을 전달해주는 프로그램을 컴퓨터에서 실행하고 있는 것이다. 클라이언트에게 데이터를 제공해주는 API 서버, 이미지들을 제공해주는 이미지 서버 등이 있을 수 있다.

클라이언트는 '어디에 있는 콘텐츠를 읽고싶다'고 요청하게 되는데 이때 자원의 위치는 URL(Uniform Resource Locator)을 통해 지정한다.

이렇게 URL을 이용함으로써 웹상에 공개된 다양한 콘텐츠를 얻을 수 있다. 문제는 하이퍼텍스트를 비롯한 콘텐츠를 컴퓨터가 **어떻게** 송수신하느냐이다. 이를 해결하기 위해 웹상에서 정보를 주고받을 수 있는 약속(프로토콜)인 `HTTP`가 등장했다.

# HTTP

`Documents/CS/Network/http.md` 문서 참고

# 쿠키와 세션

- [쿠키와 세션](https://doooyeon.github.io/2018/09/10/cookie-and-session.html)

# REST API

# End point(엔드 포인트)

[Endpoint란](https://toneyparky.tistory.com/6)

[프론트엔드와 백엔드가 소통하는 엔드포인트, RESTful API](https://evan-moon.github.io/2020/04/07/about-restful-api/)

# JSON

# API(Application Interface Programming)

서버에서 제공하는 `Web APIs`를 사용해 다양한 기기들은 서버에 있는 데이터를 읽어오거나 쓸 수 있다. 네트워크에서 기기간 통신하는데 필요한 규격사항은 HTTP(s)이다. Web APIs를 어떻게 디자인해서 만들건지 정의하는 방법은 이전엔 SOAP(Simple Object Access Protocol)을 사용해 모든 네트워크의 요청과 반응을 XML이라는 데이터 포맷에 저장해 주고 받았다. 요즘은 REST(Representational State Transfer)가 보편적으로 많이 사용된다. REST는 총 4가지로 구성되어있다. post(create, 만들고), get(read, 읽고), put(update, 업데이트하고), delete(삭제) 예를 들어 get을 이용해 user에 대한 정보를 요청(request)하면 서버로부터 유저에 대한 데이터를 JSON 포맷으로 받아올(response) 수 있다.

Web APIs 뿐만 아니라 라이브러리나 프레임워크에서 이용할 수 있는 함수나 클래스를 API라고도 함. 프로젝트 내부에서 쓰이는 클래스나 모듈도 함수=인터페이스=API를 사용한다고 말할 수 있음.

API는 내부의 구현사항은 잘 숨겨두고 외부에서 사용하는 사람이 필요한 것만 노출해두는 것. 이를 API, 인터페이스라고 함.

## Open API / Public API

회사 내부에서 사용하는 Web API를 외부의 다른 개발자가 이용할 수 있도록 공개적으로 오픈한 것

## 유용한 Open API

- Giphy
  개발툴에서 제공하는 SDK, Open API 이용
- Spotify
  Web API 제공(Developer showcase)
- APIMeme Meme Generator
  밈 관련
- 다양한 증권사에서도 Open API 제공함
- 공공데이터
- 카카오 API
- https://public-apis.xyz/
  위 사이트에서 다양한 api 확인 가능
  html -> pdf 변환 api
  결제 관련 api
- https://github.com/public-apis/public-apis
  public api 모아놓은 깃허브

기존의 서비스를 개선하거나 독창적인 아이디어를 추가하거나 기존의 서비스를 심플한 버전으로 만들어보는 그런 사이드 프로젝트를 하는 것 추천👍

# 프레임워크와 라이브러리

# 웹서버와 WAS

## Static Pages와 Dynamic Pages

1. Static Pages

- 항상 정적인(일정한) 페이지를 반환한다.
- 웹 서버는 파일 경로 이름을 받아 경로와 일치하는 파일들을 브라우저에 반환한다.
- html, css, javascript 파일 등을 반환해주는 것이다.

2. Dynamic Pages

- 인자의 내용에 맞게 동적인 정보를 반환한다.
- Ex) 로그인 후 마이페이지를 들어가면 사용자가 각기 다른 정보를 확인할 수 있는 것처럼

## 웹서버(Web Server)

## 웹서버의 개념

- 하드웨어 관점: Web 서버가 설치되어 있는 컴퓨터
- 소프트웨어 관점: 웹 브라우저(클라이언트)로부터 HTTP 요청을 받아 정적인 컨텐츠(html, image, css, ...)를 제공하는 컴퓨터 프로그램

## 웹서버의 기능

- HTTP 프로토콜을 기반으로 클라이언트(웹브라우저 또는 웹 크롤러)의 요청을 서비스하는 기능을 담당한다.
- 요청에 따라 아래 두 기능 중 선택하여 수행한다.
- 기능 1)
  - 정적인 컨텐츠 제공
  - WAS를 거치지 않고 자원을 바로 제공한다.
- 기능 2)
  - 동적인 컨텐츠 제공을 위한 요청을 전달
  - 클라이언트의 요청(Request)을 WAS에 보내고, WAS가 처리한 결과를 클라이언트에게 전달(응답, Response)한다.

## 웹서버의 예

- Ex) Apache Server, Nginx, IIS(Windows 전용 웹서버) 등

# WAS(Web Application Server)

## WAS 개념

- DB조회나 다양한 로직 처리를 요구하는 동적인 컨텐츠를 제공하기 위해 만들어진 Application Server

## WAS의 예

- Ex) Tomcat, JBoss, Jeus, Web Sphere 등

# SSR과 CSR

## SSR(Server-Side Rendering)

- 서버에서 필요한 데이터들을 가져와 HTML 파일을 만들고 자바스크립트 코드와 함께 클라이언트에게 넘겨주는 방식 Ex) `JSP`, `PHP`, `ASP`
- 사용자의 요청마다 서버에서 HTML파일을 받아오게 되며 새로고침이 발생한다.
- 그래서 클라이언트단(브라우저)에서는 굳이 데이터를 정교하게 관리할 필요가 없었다.

## CSR(Client-Side Rendering)

- 서버에서 HTML파일(껍데기)을 받아 사용자의 동작에 따라 클라이언트 측에서 렌더링하는 방식
- JavaScript가 발전하면서 클라이언트 단에서 모든 렌더링을 처리하려는 시도로 `React`, `Angular`, `Vue` 와 같은 프레임워크(혹은 라이브러리)가 탄생하였다.
- 클라이언트(브라우저)단에서 렌더링하기 위해선 렌더링에 필요한 상태를 정교하게 관리해야 한다.
- 그래서 `Redux` 같은 상태관리 라이브러리(혹은 프레임워크)가 생겼다.

# References

[Web Server와 WAS의 차이와 웹 서비스 구조](https://gmlwjd9405.github.io/2018/10/27/webserver-vs-was.html)

[프론트엔드 - SPA, SSR, CSR](https://velog.io/@gouz7514/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-SPA-SSR-CSR)

[IT 개발자와 일할 때 필요한 모든 개발지식 by 그랩](https://www.grabbing.me/IT-A-to-Z-By-1e1fbc981b7c4c03ac44943085ac8304)
