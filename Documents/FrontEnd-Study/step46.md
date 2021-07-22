[문서 목록으로 돌아가기](README.md)

# STEP 46, 47

Semantic Web & CSS Query (microdata, dataset 활용)

> **STEP 46, 47**
>
> - 작성자: Wol-dan (@pul8219)
> - 스터디 주제: FrontEnd 면접 스터디 <https://gitlab.com/siots-study/topics/-/wikis/%EC%8B%AC%ED%99%941>
> - 공부 범위: STEP 46 [코드스피츠76 CSS Rendering - 5회차](https://youtu.be/1leiALUP5mM) `1/2`, STEP 47 [코드스피츠76 CSS Rendering - 5회차](https://youtu.be/1leiALUP5mM) `2/2`
> - 기한: 07/17(토) ~ 07/20(화) (STEP 45), 07/24(토) ~ 07/27(화) (STEP 47)
> - [📋 스터디 문서 목록 바로가기](https://github.com/pul8219/TIL/blob/master/Documents/FrontEnd-Study/README.md)

# Semantic Web

Semantic Web에서 CSS를 어떻게 쿼리처럼 쓸 수 있을까?

- HTML 문서는 Semantic으로 구성되어있다.
- Semantic Web = 의미론적 웹 = HTML 태그를 하나의 문서로서 의미를 갖도록 태깅하자는 철학
- 웹 표준에서는 HTML은 의미론적으로 작성하고, 화면에 보이는 모양은 CSS로 조정하는 방식을 권장하고 있다.
- Semantic Web을 사용하는 이유: 검색엔진이 HTML을 읽어들였을 때 마치 데이터베이스처럼 문서로부터 유의미한 것들을 추출해 다양한 검색 결과를 나타내기 위해서(기계 친화적, 크롤러 친화적인 웹을 위함)
- 오늘 배우는 것의 핵심: 이러한 Semantic Web에서 CSS를 어떻게 사용하는 것이 좋을까에 대한 고민

---

- **DOM** - 의미를 갖도록 태깅

  - 화면에 보이는 요소만큼 DOM을 만드는 게 아닌, 요소가 위에 있든 아래있든 **의미상 무엇인가를 기준**으로 태그를 만들어야 한다. (요소가 태그상으로는 제일 먼저 작성됐지만 화면에서는 맨 아래 있을 수도 있음)
  - 줄을 나누기 위해 div, p태그를 함부로 쓰거나 장식을 위해 img 태그를 넣는 등의 행위를 허용하지 않아야 한다.
  - Semantic Web을 잘 사용하면 태그 수가 줄어든다.
  - 요소가 화면에 어떻게 보일지를 생각하기 보단, Semantic Web으로 구성하기 위해 고민해보자.
  - Ex) 시간을 표현 -> time 태그 / 제목 -> header 태그 / 글 하나하나 -> article

- **CSS Selector** - DOM의 구조에 밀접하게 선택

  - 보통 CSS Selector는 Sematic과 무관하게 DOM 구조에 밀접하게 작성된다.
  - Ex) a 태그 안에 p 이런식으로 선택함
  - 따라서 CSS class로 Semantic Web을 만드려는 것은 잘못된 시도이다.

- **CSS** 자체 - 의미와 무관한 스타일

  - 그래픽스 렌더링 엔진과 관련되어있음(그림을 어떻게 그릴지)
  - Ex) background-color: yellow

DOM과 CSS를 잇는 것이 CSS Selector이다. CSS Selector를 잘 작성하면 이 둘이 유기적으로 연결되고 유지보수가 쉬워질 수 있다.

보통 문서의 모양(DOM 구조)에 따라 CSS Selector를 작성한다. 그런데 이런 경우, 중간에 요소를 넣는 등의 수정이 일어나면 CSS Selector가 모두 깨지는 일이 발생할 수 있다. 결국 CSS Selector로 인해 DOM을 건드리지 못하는 상황까지 생겨버린다.(CSS Selector를 잘 설계해야하는 이유)

문제점

- 1. DOM을 스타일에 맞춰 제작하는 것 -> Semantic Web에서 DOM은 **의미**를 갖도록 태깅해야한다.
- 2. (1번의 문제로 인해) 태그의 변화가 스타일을 깨먹음
- 결국 HTML, CSS가 유지보수 불가능하게됨

해결방법

- Semantic Selector: CSS Selector도 Semantic하게 짜자
  - DOM의 구조에서 벗어나자: Selector에 오직 class만 써도 반은 해결된다.(`p > a > ...` 이런건 유지보수가 불가능)
  - ➕ 오늘 배우는 내용들

## CSS Attribute Selector

- 해당 엘리먼트의 속성(attribute)을 기반으로 엘리먼트를 선택할 수 있게 해준다.
- 대괄호(`[]`)로 시작한다.

> - `[attr]` - 속성이 존재함
>   - Ex) `input[type]` input 태그 중에 type이 존재하는 엘리먼트들 모두를 선택함
> - `[attr=val]` - 값(val)과 일치
> - `[attr~=val]` - 공백으로 구분된 단어로 포함되면 일치
>   - Ex) HTML에 속성을 줄 때 공백(Space)로 여러개를 줄 수 있음을 기억하자. 그렇게 준 속성안에 일치하는 값이 있는지 찾는다.
> - `[attr:=val]` - 일치하거나 뒤에 -가 붙을 때
> - `[attr*=val]` - 값이 포함될 때
> - `[attr^=val]` - 값으로 시작될 때 # 정규식에서 온 표현(`^`=시작, `$`=끝)
> - `[attr$=val]` - 값으로 끝날 때

출처: <https://drafts.csswg.org/selectors-3/#attribute-selectors>

> 1회차에서 언급했듯, CSS는 모듈별로 스펙이 존재한다. CSS3 이런건 없다! CSS는 공식 스펙은 2.1에서 멈췄고 그 이후론 CSS 모듈 스펙으로 바뀌어서 개별 모듈마다 버전이 따로 존재한다.

## Query Style Selector

CSS Query는 SQL Query와 굉장히 비슷하게 작성한다.

> select `*` from `table` where `field conditions..`
>
> `base selector`[`field conditions`][`..`][`..`]..

- `base selector`: `table`과 같은 역할. 얻고자하는 DOM 그룹을 의미
- `field conditions`: 조건 (나열해서 작성한다)

내가 원하는 DOM의 그룹에서 원하는 엘리먼트들만 고르는 작업이다.

### 예제

```scss
// 📁scss 파일
#join {
  [name='userid'] {
    border: 1px solid #f00;
  }
  [name='pw'] {
    border: 1px solid #0f0;
  }
  [name='nick'] {
    border: 1px solid #00f;
  }
}
```

```html
<!-- 📁html 파일 -->
<form id="join">
  <input type="text" name="userid" />
  <input type="password" name="pw" />
  <input type="text" name="nick" />
</form>
```

- 기존 방법: DOM 구조와 관련된 방법들 ex) 선택하고싶은 태그에 id나 class를 모두 부여하거나 혹은 form 태그 안에 몇번째 태그인지 식별하는 방식으로 셀렉터를 작성
- 제안 방법: CSS Query Selector 사용
  - `join`을 하나의 `table`로 보고 질의(query)를 하자
  - `name`과 같이 DOM 구조나 디자인에 영향받지 않는 서버와 합의된 내용을 선택하도록 한다. 이렇게 데이터 구조에 근거를 둔 셀렉팅이 적절하다.

💡 Sass에선 selector를 중첩하여 쓸 수 있다. CSS였다면 다음과 같이 작성해야한다. Sass를 사용하면 위 예제처럼 코드의 중복을 없애 셀렉터 수정시 실수를 방지할 수 있다.

```css
#join [name='userid'] {
  border: 1px solid #f00;
}
#join [name='pw'] {
  border: 1px solid #0f0;
}
#join [name='nick'] {
  border: 1px solid #00f;
}
```

**결국, 태그에서 진짜 의미를 가진 것을 추출해 거기에 스타일을 주는 것이 핵심이다.**

## HTML5 Microdata

HTML Semantic 스펙인 **microdata**를 본격적으로 알아보자. 아래 속성들을 사용하자는 것이 microdata의 핵심이다.

- `itemscope` - 적용범위 설정
  - 어떤 div에 scope를 지정하면 그 안에만 적용이 된다.
- `itemtype` - 스키마 설정
  - 스코프에 type을 지정
- `itemid` - 특정 id 부여
  - 스코프 내부 여러 아이템들에 특정 id 부여
- `itemprop` - 속성명
- `content` - 비가시적일 때 값을 설정
- `value` - 가시적인 값이 원하는 값이 아닐 때
- `itemref` - scope 계층구조 안에 없을

출처: <https://www.w3.org/TR/microdata>

### Schema.org

Schema.org 사이트에서는 microdata 포맷으로 된 스키마(데이터 구조)를 공유하고 있다. 공식적인 표준은 아니지만 많은 사람들이 따르고 개선하고 있는 문서이다.

- <http://schema.org/BreadcrumbList>
- <http://schema.org/WebPage>
  - WebPage라는 형태(type)에 대해 이러이러한 종류의 속성(property)이 있다고 기술되어있다. 그 속성들에 올 수 있는 값들도 기술되어있다. 값이 그냥 Text인 경우도 있지만 또 다른 스키마인 경우도 있다.
- <http://schema.org/CollegeOrUniversity>

💡 우리가 임의로 스키마를 정의해도 되지만, 이 경우 정의 후에 웹에 url로 스키마 포맷을 공유해야한다.

### 예제

```html
<!-- 화면에 보이는 디자인 문서에 가까움 -->
<body>
  <h1>CodeSpitz76 - 5</h1>
  <nav>Home</nav>
  <p>코드스피츠76 5회차 수업은 css를 쿼리화하여 사용하는 방법을 다룹니다.</p>
  <ul>
    <li>
      <h2>HTML5 MicroData</h2>
      <p>마이크로데이터에 대한 개념과 예제</p>
    </li>
    <li>
      <h2>HTML5 DataSet</h2>
      <p>데이터셋에 대한 개념과 예제</p>
    </li>
  </ul>
  <footer>
    <div>MIT</div>
    <div>Bsidesoft co.</div>
  </footer>
</body>
```

```html
<!-- 위 HTML에 microdata 적용 -->
<!-- 문서화, 데이터베이스화 됨 -->
<body itemscope itemtype="http://schema.org/WebPage">
  <h1 itemprop="name">CodeSpitz76 - 5</h1>
  <nav itemprop="breadcrumb">Home</nav>
  <p itemprop="description">
    코드스피츠76 5회차 수업은 css를 쿼리화하여 사용하는 방법을 다룹니다.
  </p>
  <ul>
    <li
      itemprop="mainEntity"
      itemscope
      itemtype="http://schema.org/CollegeOrUniversity"
    >
      <h2 itemprop="name">HTML5 MicroData</h2>
      <p itemprop="description">마이크로데이터에 대한 개념과 예제</p>
    </li>
    <li
      itemprop="mainEntity"
      itemscope
      itemtype="http://schema.org/CollegeOrUniversity"
    >
      <h2 itemprop="name">HTML5 DataSet</h2>
      <p itemprop="description">데이터셋에 대한 개념과 예제</p>
    </li>
  </ul>
  <footer>
    <div itemprop="license">MIT</div>
    <div itemprop="publisher">Bsidesoft co.</div>
  </footer>
</body>
```

- body에 `itemscope`를 줌으로써 하나의 스코프로 지정
- 스코프를 지정하면서 type(`itemtype`)을 같이 준다. type은 uri로 준다.(고유하게) 이로써 type이 무엇인지 알 수 있다.
- li에 `itemprop` 속성값으로 mainEntity(여러개 지정 가능)를 주고, 새로운 스코프를 지정했다. 그럼 li안이 또 다른 스코프가 된다.
- `<h1 itemprop="name">CodeSpitz76 - 5</h1>`의 name은 WebPage 스코프의 name이지만, li 내부 `<h2 itemprop="name">HTML5 MicroData</h2>`의 name은 CollegeOrUniversity의 name으로 전자와 완전히 다른 name이다.
- license, publisher는 WebPage 스코프에 소속된 속성이다.
- 이 문서는 Website(WebPage 타입)를 나타내는 문서이고 각각은 논문 아이템들(CollegeOrUniversity 타입)인 것이다.

**이처럼 microdate포맷은 HTML의 구조와 일치하면서 문서에 의미(Semantic)를 부여할 수 있게 한다.**

![](https://images.velog.io/images/pul8219/post/4219541a-f209-4bea-8343-e06363b1d7ac/image.png)

위 그림을 보면 스코프의 의미가 무엇인지 명확하게 이해할 수 있을 것이다.

위 예제를 기반으로 Semantic Query 짜면 아래와 같다. 쿼리를 보면 DOM 구조가 아예 나오지 않는다.(DOM 구조에서 벗어남!)

![](https://images.velog.io/images/pul8219/post/94f9f2fa-8082-4337-a684-9850ff53a216/image.png)

- Semantic화가 잘 되어있는 문서는 JSON으로 번역하지 않고 HTML 채로 서버로 보내도 된다. 왜냐하면 microdata DOM parser도 표준화되어 사용할 수 있기 때문이다.
- 디자인이 개편되더라도 작성자를 고치고 싶으면 WebPage의 publisher로 가서 고치면 된다.(유지보수 용이)
- 예를 들어 다크 테마로 바꾸고 싶은 경우에도 셀렉터가 아닌 내부 코드만 고치면 테마를 쉽게 바꿀 수 있다.
- 아까 봤던 name으로 짰던 쿼리보다 microdata를 활용한 이 방법이 더 Semantic한 코드이다.
- **DOM 의존성을 벗어나는 방법은 attribute selector를 쓰는게 아니라 이렇게 DOM 구조에 영향을 받지 않는 셀렉팅 방법을 쓰는 것이다.**

## HTML5 dataset

- HTML5에서는 microdata 외에도 커스텀 속성을 사용할 수 있는 dataset 이라는 게 존재한다.
- 예를 들어 일본에 웹사이트 납품하는 경우를 생각해보자. 일본의 경우 w3c validator를 통과하는 것(HTML, CSS포함)만 납품이 가능하다. 즉 태그에 마음대로 커스텀 속성을 쓰면 납품할 수 없다는 것이다. 하지만 그래도 태그에 커스텀 속성을 넣고 싶다면? **표준적인 커스텀 속성을 위한 속성 확장자인 `dataset`을 쓰면 된다.**

내용 추가 예정

# Comment

# References

# 팀원들 결과물‍

- @eyabc
- @khw970421
  - [코드스피츠 css rendering 5회차 part1 (step 46)](https://velog.io/@khw970421/%EC%BD%94%EB%93%9C%EC%8A%A4%ED%94%BC%EC%B8%A0-css-rendering-5%ED%9A%8C%EC%B0%A8-part1-step-47)
