[문서 목록으로 돌아가기](README.md)

> # STEP 36
>
> 💡질의응답은 <https://github.com/pul8219/TIL> `Issues` 탭의 알맞은 step 이슈안에 남겨주세요. ➡️ [Issue탭으로 이동](https://github.com/pul8219/TIL/issues)
>
> - 작성자: Wol-dan (@pul8219)
> - 스터디 주제: FrontEnd 면접 스터디 <https://gitlab.com/siots-study/topics/-/wikis/%EC%8B%AC%ED%99%941>
> - 공부 범위: STEP 36 [코드스피츠76 CSS Rendering - 1회차 1/2](https://www.youtube.com/watch?v=_o1zsrBkZyg)
> - 기한: 05/08(토) ~ 05/11(화)

# 보충 필요

# 목차

# 그래픽 시스템(Graphics System)

## Fixed Number

고정된 숫자로 표현하는 방법 ex) `x`, `y`, `width`, `height`, `color`

- 고정된 숫자로 만들어진 그래픽 시스템은 다양한 환경에 대응할 수 없다는 단점이 있다.
  - 예를 들어 모니터 해상도, 브라우저 창 크기, 스마트폰의 경우 가로모드 or 세로모드 등 다양한 변수가 있다. chrome size(닫기, 최소화 버튼 같은 UI 요소들 일컫음)

## Abstract Calculator

다양한 환경에 대응하기 위해, 고정적인 숫자를 대신해 일종의 공식을 사용하는 방법이 있다. ex) `%`, `left`, `block`, `inline`, `float` 부모를 기준으로, 화면을 기준으로 등등 **실제로 화면에 그려질 때** 환경을 인식해서 숫자로 바뀌게되는 방식으로, 공식이자 함수로 볼 수 있다.

## Components

추상화된 그래픽시스템들을 공통점을 갖고있는 애들끼리 묶은 것이다. 보다 복잡한 그래픽을 그리기 위해서는 Components를 이용해야한다.

> html의 태그 하나하나를 컴포넌트라 볼 수 있다.(우리가 직접 픽셀을 찍는 것이 아니라 img 태그에 이미지 경로만 주면 그림을 그려준다.)

## Framework

컴포넌트들이 일정한 규칙을 지키는 형태로 구현되어있다면 이를 프레임워크라 부른다.

> html 태그들은 공통적으로 style 속성을 적용할 수 있다. 공통된 시스템 하에서 개발된 컴포넌트이기에 html 체계 전체는 프레임워크로 볼 수 있다.

> 여기서 잠깐💡 CS를 공부할 땐 항상 **상대적으로** 생각해보자
>
> - IE나 크롬 입장에서 Windows는 OS이다.
> - 반대로 Windows입장에서 IE, 크롬같은 브라우저는 응용프로그램이라 불리는 Application이다.
> - CSS, JavaScript 파일 입장에선 Windows가 보이지 않는다. js는 브라우저상의 응용프로그램이고 브라우저는 js의 OS라 볼 수 있다.
>
> 항상 상대적인 입장에서 OS, Framework 등이라고 재평가해보자. 비슷한 맥락에서 자식클래스는 항상 자식클래스인 것이 아니라 손자 클래스입장에선 부모클래스라 볼 수 있다.

# Rendering System(렌더링 시스템)

어떤 대상을 원하는 모습으로 다시 그려내는 걸 `렌더링`이라고 한다. 기계나 사람이 인식하기 쉽거나 우리의 목적에 부합하게 보다 구체적으로 다시 그려내는 모든 것을 의미한다. 그림을 그리기 위한 데이터를 어떻게 그림으로 바꾸는가에 대한 이야기.(그래픽 시스템은 점을 어떤 방식으로 찍는지에 관한 이야기) 렌더링은 어떤 체계를 통해 그림이 표현되고 그림을 표현하기 위한 정보가 무엇인지를 이야기함.

> ex)
>
> - 데이터베이스의 데이터를 json으로 렌더링
> - 웹사이트의 로그파일을 구글 애널리틱스를 이용해 그래프로 표현

## 렌더링 시스템의 단계

![](https://images.velog.io/images/pul8219/post/6cffb161-0a76-4623-85aa-fcc8fc0d4079/image.png)

- 1. Geometry Calculate: 영역을 계산해 나누고 박스를 찾는다.
  - 브라우저에선 이 단계를 `reflow`라고 부른다. 어느 시스템이나 보통 이렇게 일컫는다.

![](https://images.velog.io/images/pul8219/post/8aca6e5e-3a9c-4529-a109-70af4a47268b/image.png)

- 2. Fragment Fill: 색칠 단계. 칠하는 대상을 Fragment(단편 조각)라고 한다.
  - 브라우저에선 이 단계를 `repaint`라고 부른다. 어느 시스템이나 보통 이렇게 일컫는다.

> reflow를 하면 repaint를 모두 다시 해야하기 때문에(영역 자체가 다시 그려져 모두 색칠해야한다) 되도록 repaint만 되게 하는 것이 좋다(최적화)

# CSS Specifications

> 여기서 잠깐💡 그래픽 시스템, 렌더링 시스템 그리고 CSS
>
> CSS는
>
> - 어떻게 하면 고정된 숫자를 사용하지 않고 계산된 체계로 그래픽을 표현할 수 있을까?
> - Geometry의 영역을 어떤 식으로 표현할까?
> - 색칠을 할 때 어떤 식으로 명령을 내릴까?
>
> 에 대한 일종의 언어이다.
>
> CSS의 (추상적인 계산체계를 표현하는)메타포들이 어떤식으로 내부에서 계산되는지 이해해야 우리가 원하는 레이아웃을 그릴 수 있다. CSS의 속성, 값이 구체적으로 발현될 때 어떤 방식으로 계산되서 표현되는건지 이해하는 것이 중요하다.

right의 내부 계산 방식
나의 가로는 overflow hidden이 아니라 auto이면 width가 정해져있더라도 글씨 쓰면 가로는 더 늘어날 것

> 표준으로 구현하고 예외를 처리해야함

## CSS 스펙 설명

- CSS Level2 부턴 스펙 안에 분야별로 모듈(module)을 넣어 관리했다.
- CSS Level2.1 때 이미 level3인 모듈들이 있었다.
- CSS Level2.1 이후엔 CSS통합 레벨이 아니라 모듈 레벨로 발전했다.
- CSS 사양은 이렇듯 모듈들이 탄생하고 각 모듈들이 저마다 업데이트된다. 또한 어떤 모듈의 업데이트가 다른 모듈에 영향을 준다.
- CSS가 난잡하다고 느껴지는 이유는, 모듈은 계속 업데이트되고 브라우저는 이러한 최신사항 전부를 따라갈 수 없기 때문이다. (모든 모듈이 레벨을 따로 가지고 있다.) 예를 들어 IE8에서 쓸 수 있는 selectors의 스펙은 레벨1이고, 크롬에서 쓸 수 있는 selectors 스펙은 레벨2이다.
- CSS3는 CSS level2.1에 포함되어있는 모듈중에 레벨3인 것들을 모아서 부르는 것뿐이며 공식문서에 CSS3는 존재하지 않는다. 고로 CSS3나 4가 있다는 말은 잘못된 것이다.
- CSS 스펙이 궁금한 경우 w3c에서 recommentdation level을 보고 어디까지 업데이트됐는지 확인해보자.
- 다만 현재 브라우저 스펙을 이해하려면 W3C 스펙뿐만 아니라 WICG(Web Platform Incubator Community)와 같은 단체에서 만드는 스펙도 파악해야한다. WICG 주멤버에 구글이 있는데 스펙을 만들고 크롬에 적용을 시켜버린다음 W3C로 스펙 초안을 보내는 일이 다반사라고 한다.

# Normal Flow

> CSS 문서에 나와있는 고유 명사. `CSS2.1 Visual Formatting Model Positioning Schemes & Normal Flow`

- position

geometry영역에 left, top을 결정하는 추상적인 의미체계

static | relaticve | absolute | fixed | inherit

이걸 보고 계산 공식을 떠올릴 수 있어야한다.

Normal flow는 position이 staic, relative일때만 적용된다.

- **block formatting contexts(BFC)**
  - block: 부모의 가로길이를 가득 채운 한 줄이다. 이제부터 block은 부모만큼 가로를 다 먹는다고 생각하면 된다.
  - 한 줄을 다 먹을 때 어떤 식으로 계산하는지에 관한 것
  - x = 0, width = 부모의 width
  - 다음 블록의 y가 어딘지만 신경쓰면된다. 첫번째 블록의 height가 다음 블록의 y값이 될 것이다. 이러한 계산방법이 BFC이다.
  - 안의 블록 2개 모두 height가 50이면 겉의 BFC height는 (당연히) 100이다.
- **inline formatting contexts(IFC)**
  - inline: 한줄을 다 먹지않고 자신의 컨텐츠 크기만큼 공간을 차지한다.
  - 다음 요소는 첫번째 IFC요소의 가로길이만큼 떨어진 자리에 x가 결정된다. 그다음번 요소는 앞의 두 요소의 width를 더한값이 x가 된다.
  - inline 요소의 width의 합이 부모의 width를 넘어가면 다음줄로 넘어간다. 그렇게 되면 인라인을 구성하고 있는 요소중 가장 height가 큰 요소의 height값이 line height가 되서 그 값만큼 y값이 내려오게 된다.
  - IFC여도 block이 오면 즉시 IFC영역이 종료되고 다음번 블록요소가 만들어진다.
- relative positioning (position 모델에서 정의하고 있으므로 bfc, ifc만 생각해도 무방하다.)

![](https://images.velog.io/images/pul8219/post/2b69d442-abaf-4348-b497-f16f05982485/image.png)

> 여기서 잠깐💡 일반명사에 고유명사의 의미를 부여해 부르는 CS(Computer Science)의 특성을 유의 (새로운 단어를 만드는 게 아니라 기존의 일반명사를 가져다 쓴다.)
>
> ex)
>
> - 도메인(domain) => 영역(일반명사) `vs` IP를 대신하는 이름(CS에서의 고유명사)
> - 프로토콜(protocol) => 계약서, 합의서(일반명사)
>
> Normal Flow 또한 고유명사이다. 한글로 번역하기보다 Normal Flow라고 그대로 불러야한다.

## 예제1

```html
<div style="width:500px; background:red">&nbsp;</div>
<div style="background:blue">&nbsp;</div>
```

![](https://images.velog.io/images/pul8219/post/b5fb3da2-034a-4a1f-b489-80ed09329b25/image.png)

`div`는 기본적으로 block이다.
첫번째 div는 그림을 그리는 geometry fragment가 500까지라는거지 실제로는 점선까지 차지하고 있는 것이다.(block요소는 부모의 width를 다 먹으니까!)

## 예제2

```html
<div style="width:200px; background:red">
  aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
</div>
```

위 코드에서 'aaaa..'는 IFC인데 아래로 넘어가지 않고 부모의 width인 200px를 넘어갔다.

```html
<div style="width:200px; background:red">
  aaaaaaaaaaaaaaa aaaaaaaaaaaaaaa aaaaa
</div>
```

aaa...를 쪼개서 사이를 엔터로 띄어놓으면 200px 안에 잘 나온다.

html이 공백문자가 없는 문자열을 하나의 IFC section 로 보기 때문에(떨어지지않음) 위와 같은 결과가 나온다.(첫번째예제는 span태그가 1개, 두번째예제는 span태그가 2개인 격) 아래 코드처럼 엔터나 스페이스로 공백을 주는 순간 aaaa.. 세 줄이 각각의 IFC 인라인 요소가 된다. 위의 코드의 aaaa... 는 하나의 인라인 요소이다. 원하는 width 안으로 텍스트가 쪼개지게 하려면 아래 코드처럼 공백을 추가하면된다.

word break 속성

- 공백문자를 사용하고 싶지 않다면 div에 특정 속성을 지정해 width에 맞춰 쪼개지도록 할 수 있다.
- 이렇게 되면 공백문자 없이 붙어있는 문자열도 문자 하나하나로 보기 때문에 문자 하나하나가 인라인 요소가 된다.
- 당연히 브라우저가 엄청 느려진다. 큼직한 덩어리를 geometry로 계산하는 것이 아니라 글자 하나하나를 다 geometry로 잡아 계산이 많아지기 때문이다.

## BFC + IFC 예제1

```html
<div style="width:500px">
  HELLO
  <span>
    WORLD
    <div style="background:red">&nbsp;</div>
  </span>
  !!
</div>
```

- div는 블록요소이다. 하나의 bfc 영역 시작
- HELLO란 text는 인라인 요소이다.
- span 태그도 인라인 요소이다. 따라서 HELLO 옆에 WORLD가 붙을 것으로 예상된다.
- 그런데 span 태그 안에 블록 요소인 div가 들어가있다.
- 어떻게 그려질까?

이 문제가 헷갈린다면 그건 렌더링 시스템에 대한 이해도가 부족해서이다.
렌더링 시스템과 DOM은 무관하다.
DOM의 포함관계는 이렇게 되어있을지라도 브라우저는 렌더링을 할 때 이 코드를 bfc 시작, ifc, ifc, bfc시작-끝, 다시 ifc~ 이렇게 인식한다.(bfc, ifc 구조만 본다) 즉 DOM의 포함관계와 렌더링을 평가할 때 포함관계는 다르다.(렌더링은 bfc, ifc로 그린다.)

![](https://images.velog.io/images/pul8219/post/18def224-2b59-454c-9f50-5d1aeca97298/image.png)

## BFC + IFC 예제2

```html
<div style="width:500px">
  **
  <span>
    HELLO
    <span>
      WORLD
      <div style="background:red">&nbsp;</div>
    </span>
    !!
    <div style="background:blue">&nbsp;</div>
  </span>
</div>
```

![](https://images.velog.io/images/pul8219/post/19de9640-9362-4d2d-bf31-4df9f2f881b4/image.png)

```html
<div style="width:500px">
  **
  <span>
    HELLO
    <span style="position:relative; top:50px">
      WORLD
      <div style="background:red">&nbsp;</div>
    </span>
    !!
    <div style="background:blue">&nbsp;</div>
  </span>
</div>
```

![](https://images.velog.io/images/pul8219/post/fcbd1e8c-28fa-4516-911c-442c71b791c7/image.png)

span 태그에 `position:relative`가 추가되었다. 요소가 static으로 먼저 그려지고, relative인 `WORLD`와 `빨간 박스`만 아래로 50px 만큼 내려간다.

> position이 relative일 때 원리는 먼저 static으로 그리고 상대적으로 이동시키는 것이다. (`top:50px` -> 아래로 내리라는 것)

> position - static과 position - relative가 섞여있을 때, relative가 무조건 static위로 올라간다. 그렇기 때문에 위에서 이동한 `WORLD`와 `빨간 박스`가 `**`과 `파란박스`등을 가린 것이다. (relative 끼리는 z-index 경쟁을 벌이지만 static과 relative 중에서는 relative가 무조건 위로 올라간다.)

> relative로 인해 width, height등이 변하지 않는다. 실제로 geometry 계산은 static으로 먼저 계산할 시점에 정해지고, relative는 단지 그림만 상대적으로 그린 것이다.

Normal Flow는 이렇게 지금까지 배운 BFC, IFC, relative 내용들을 포함하는 개념이다.

> ex) 브라우저 창 크기를 줄이면 글자가 밑으로 내려올거라는 예상은 normal flow를 따르기 때문에 가능한 것이다.

> position - absolute, fixed 를 주면 normal flow로 작동하지 않아서 width를 주지 않으면 가로 공간이 확보가 안 된다든지, 함부로 글자가 내려오거나 height가 확보 되지 않는다든지 등의 일이 일어난다. normal flow 하에서만 자동으로 크기, height가 계산되고 위치를 자동으로 잡아주는 것이다. normal flow를 위해 position을 static으로 준 적 없다해도 괜찮다. 모든 html element들은 기본값이 position-static이기 때문이다.

# Comment

# References

# 팀원들 결과물

- [@pul8219](https://github.com/pul8219/TIL/blob/master/Documents/FrontEnd-Study/step36.md)
- [@eyabc]()

  - https://eyabc.github.io/docs/css/css-rendering/graphics_system
  - https://eyabc.github.io/docs/css/css-rendering/rendering_system
  - https://eyabc.github.io/docs/css/css-rendering/css_specifications
  - https://eyabc.github.io/docs/css/css-rendering/normal_flow

- [@khw970421](https://velog.io/@khw970421/%EC%BD%94%EB%93%9C%EC%8A%A4%ED%94%BC%EC%B8%A0-css-rendering)
