# REST API

`REST(Representational State Transfer)`

`REST`는 자원을 이름으로 구분해 명시하고 해당 자원의 상태를 주고받는 것을 의미한다. 프레임워크가 아니라 약속, 방법론이라 할 수 있다. (REST하다는 것은 웹에 존재하는 모든 자원(이미지, 동영상, DB자원)에 고유한 URI를 부여해 활용한다는 것이다.)

`REST`는 웹의 기존 기술과 `HTTP` 프로토콜을 그대로 활용한다. (웹의 장점, `HTTP` 프로토콜의 장점을 극대화하는 아키텍쳐) 자원을 명시하고 이를 `HTTP Method(GET, POST, PUT, DELETE)`를 통해 해당 자원에 대한 CRUD Operation을 적용하는 것을 의미한다.

> `HTTP API`와 `REST API`는 거의 같은 의미로 사용하나 `REST API`는 `HTTP API`에 여러 제약조건이 붙은 것과 같다. 엄밀히 말하면 다르다.

## REST의 특징

- API가 웹 서버를 통해 제공된다.
- `GET/users/[사용자 id]/repositories`처럼 경로에 메서드를 보내 서비스를 얻는다.
- API가 성공했는지 status code로 클라이언트에 알려준다. URL은 리소스의 위치를 나타낸다.
- 필요에 따라 GET 매개변수, POST의 body 등 추가 정보를 보낼 수도 있다.
- 서버에서 오는 반환 값으로는 JSON 또는 XML과 같은 구조와 텍스트나 이미지 데이터 등이 반환되는 경우가 많다.

## REST 구성요소

1. 자원(Resource): URI

   - 모든 자원에는 고유한 식별자가 있고 그 식별자는 `/groups/:group_id`와 같은 HTTP URI이다. Client는 이 URI를 이용해 자원을 지정하고 해당 자원의 상태(정보)에 대한 조작을 Server에 요청한다.

2. 행위(Verb): HTTP Method

   - HTTP 프로토콜의 Method를 사용한다. (GET, POST, PUT, DELETE, HEAD 등)

3. 표현(Representation of Resource)

   - Server는 Client의 요청에 대해 적절한 응답(Representation)을 보낸다.
   - REST에서 자원은 JSON, XML, TEXT, RSS 등 여러 형태의 Representation으로 나타내질 수 있다.
   - JSON, XML을 통해 데이터를 주고받는 것이 일반적이다.

## REST의 원칙

1. Uniform Interface

   - HTTP 표준만 맞으면 어떤 기술도 가능한 Interface

     - ex) REST API의 정의를 HTTP + JSON으로 했다면, C, Java, Python, IOS 플랫폼 등 특정 언어나 기술에 종속받지 않고 모든 플랫폼에 사용 가능하다.

   - Self-Descriptive Messages: API 메시지만 보고 API(Resouce, Method를 이용해 무슨 일을 하는지)를 직관적으로 이해할 수 있는 구조이다.

2. Server-Client 구조

   - 자원을 가진쪽이 Server, 자원을 요청하는 쪽이 Client 이다. 서버에서 REST API를 제공하는 방식이라 클라이언트에서 처리하는 부분과 독립적으로 동작한다.(의존성이 줄어들어 좋음)

3. Stateless(무상태)

   - 서버는 클라이언트의 상황을 고려치 않고 API 요청에 대해서만 처리한다. 이를 "상태가 없다"고 표현한다. 클라이언트를 고려하지 않아도 되기 때문에 구현이 간결해진다.

4. Resource 지향 아키텍쳐(ROA: Resource Oriented Architecture)

5. Cache Ability

   - REST는 HTTP 표준을 기반으로 만들어졌기 때문에 HTTP의 특징인 캐싱을 사용할 수 있다. REST API를 활용하여 GET 메소드를 Last-Modified 값과 함께 보낼 경우, 컨텐츠의 변화가 없을 때 캐시된 값을 사용하게 된다. 이렇게 되면 네트워크 응답시간 뿐만 아니라 API 서버에 요청을 발생시키지 않기 때문에 부담이 덜 하다.

6. Layered System

   - 클라이언트는 계층형 구조가 불가능하지만 REST 서버의 경우, 보안/로드 밸런싱/암호화 등을 추가할 수 있고 Proxy 및 게이트웨이 등의 중간매체를 사용할 수 있다.

7. Code On Demand(Optional)

## REST의 핵심

1. 리소스(자원)에는 동사가 아닌 `명사`를 사용해야 한다.

   ```
   /members/1

   /members/get/1 # 잘못된 설계 방법임
   ```

   - URI에 `HTTP Method`나 행위에 대한 동사 표현이 들어가면 안 된다.

2. 리소스에 대한 행위는 `HTTP Method`로 표현하고 각 메소드를 분명한 목적으로 사용해야 한다.

   - `GET` 리소스 조회 `GET /students` (학생 목록 조회)
   - `POST` 리소스 생성 `POST /students` (학생 생성)
   - `PUT` 리소스 entity 전체 수정 `PUT /students/1` (1번 학생 정보 업데이트)
   - `PATCH` 리소스 entity 일부 수정
   - `DELETE` 리소스 삭제 `DELETE /students/1` (1번 학생 삭제)

3. message는 header와 body를 명확히 분리해서 사용한다.

   - Entity 에 대한 내용은 body에 담는다.
   - 어플리케이션 서버가 행동할 판단의 근거가 되는 컨트롤 정보인 API 버전 정보, 응답받고자 하는 MIME 타입 등은 header에 담는다.

4. 요청에 대한 응답으로 상태코드도 명확하게 돌려줘야 잘 설계된 REST API라고 할 수 있다. [HTTP 상태 코드(status code) 링크 제공 예정]()

5. 추가

   - 슬래시 구분자(`/`)는 계층 관계를 나타낼 때 사용한다.
   - URI의 마지막 문자로 슬래시(`/`)를 포함하지 않도록 한다.

## RESTful API

`RESTful`하다는 것은 위에서 말한 REST 아키텍쳐를 준수하여 설계된 API를 의미한다.

# References

- [신입 개발자 면접 질문 시리즈 - RESTful API란 무엇인가?](https://www.notion.so/54d624628a634c879cc93d94f54cd2d1)
- [취준생이 반드시 알아야 할 프론트엔드 지식들 - REST API](https://github.com/baeharam/Must-Know-About-Frontend/blob/main/Notes/network/rest-api.md)
- [Tech Interview for Beginner - REST API](https://github.com/JaeYeopHan/Interview_Question_for_Beginner/tree/master/Development_common_sense#restful-api)
- [Tech Interview - REST API](https://github.com/WeareSoft/tech-interview/blob/master/contents/network.md#rest%EC%99%80-restful%EC%9D%98-%EA%B0%9C%EB%85%90)
