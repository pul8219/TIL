[문서 목록으로 돌아가기](README.md)

> # STEP 40, 41
>
> 💡질의응답은 <https://github.com/pul8219/TIL> `Issues` 탭의 알맞은 step 이슈안에 남겨주세요. ➡️ [Issue탭으로 이동](https://github.com/pul8219/TIL/issues)
>
> - 작성자: Wol-dan (@pul8219)
> - 스터디 주제: FrontEnd 면접 스터디 <https://gitlab.com/siots-study/topics/-/wikis/%EC%8B%AC%ED%99%941>
> - 공부 범위: STEP 40 [코드스피츠76 CSS Rendering - 3회차](https://www.youtube.com/watch?v=WzimLP3Kukc)
> - 기한: 06/05(토) ~ 06/08(화) (STEP 40), 06/12(토) ~ 06/15(화) (STEP 41)

# 보충 필요

# 목차

💬

- [Comment](#comment)
- [References](#references)
- [팀원들 결과물‍](#팀원들-결과물)

# CSSOM

- CSSOM(CSS Object Model): 자바스크립트에서 CSS를 조작할 수 있도록 하는 API 집합. CSS를 객체화 시켜 모델링한 것이다.
- DOM(Document Object Model): HTML(Document)을 객체화시켜 프로그래밍 가능하게 만든 것. 프로그래밍 언어가 DOM 구조에 접근할 수 있는 방법을 제공하는 인터페이스로 문서 구조, 스타일, 내용 등을 변경할 수 있게 한다. 자바스크립트로 DOM API를 이용하면 html을 직접 수정하지 않고도 DOM요소에 변화를 줄 수 있다.

## 태그의 실제 내용은 태그 자체가 아닌 태그 내부에 있다.

태그 그 자체는 실체가 아닌 일종의 컨테이너 박스같은 것이고, 실제 내용은 태그 안에 있다.

ex) 예를 들어 `<style>` 태그 자체에는 `sheet`라는 실체가 있고 `<canvas>` 태그의 실체는 getContext로 얻은 canvastocontext에 있다. 이를 DOM에 포함시키려면 반드시 canvas라는 태그로 감싸야만(wrapping) html에 넣을 수 있다.

이러한 태그 내의 내용들을 사용하는 방법은 html 버전마다 각기 다르다. 예를 들어 canvas는 getcontext라는 메소드를 호출해 사용하지만 구형 element들은 속성으로 사용한다.

## CSSOM 사용법

```
Style DOM Element
  ㄴ sheet: CSSStyleSheet
    ㄴ CSSRules: CSSRuleList
      ㄴ Item: CSSStyleRule -> Type, SelectorText, Style(CSSStyleDeclaration), ...
```

예제코드로 CSSOM의 사용법에 대해 더 자세히 알아보자. style 태그의 sheet 속성을 사용하면 `CSSStyleSheet`라는 객체를 얻을 수 있다.

```html
<style id="s">
  .test {
    background: #ff0;
  }
</style>
```

```js
const el = document.querySelector('#s');
const sheet = el.sheet;
const rules = sheet.cssRules;
```

또한 sheet안에 `cssRules`라는 list를 갖고있다. 이 안에는 여러 `rule`들이 들어있다. (이는 유사배열로 배열과 비슷한 친구이다. length라는 속성은 있지만 배열 메소드는 먹히지 않는 list이다.)

rules의 0번째부터는 rule들이 들어있다. 이 예제에서 rules[0]에는 style 내에서 정의한 .test 내용이 들어가있다. 만약 정의한 style이 여러개였다면 `[0], [1], [2], ...`에 차례대로 들어있을 것이다.

### rule의 여러가지 속성

- type
- selectortext (ex. `.test`)
- style객체(DOM에도 들어있는 style 객체)

```js
const el = document.querySelector('#s');
const sheet = el.sheet;
const rules = sheet.cssRules;
const rule = rules[0];
console.log(rule);
/**
 * CSSStyleRule
 *  ㄴselectorText: ".test"
 *  ㄴstyle:
 *      ㄴbackground: "rgb(255, 255, 0)"
 *  ㄴtype: 1
 *  ...(더 많은 속성들이 있다)
 */
```

이렇게 html에서 text로 정의했던 css가 브라우저의 해석과정을 거치고 나면 메모리에 객체 형태로 저장되기 때문에 하나하나에 접근이 가능하다. 이렇게 html의 text로 적어놓은 css가 메모리상의 구조로 바뀌는 과정이 CSSOM이다.

## CSSRule Type

그렇다면 각각 rule들에 들어있는 `type` 속성은 무엇일까? 이는 <u>CSS 정의</u>에 대한 rule을 의미한다. `type`에는 굉장히 많은 종류가 있다.

- type:1 | STYLE_RULE | CSSOM (안에 있는 객체가 CSSOM 라는 뜻)
- type:2 | CHARSET_RULE | CSSOM -> `@charset`
- type:3 | IMPORT_RULE | CSSOM
- type:4 | FONT_FACE_RULE | CSSOM -> 외부 폰트 불러올 때 사용하는 `font-face`를 생각해보기
- type:7 | KEYFRAMES_RULE | css3-animations -> css3-animations라는 특별한 객체로 바뀌어 메모리에 저장된다.

## 동적으로 CSS 추가하기: Insert Rule

> sheet.insertRule('스타일', 넣을 index 번호)

`insertRule`을 사용해 sheet에 추가하면 CSS를 동적으로 추가할 수 있다.

```js
const el = document.querySelector('#s');
const sheet = el.sheet;
const rules = sheet.cssRules;
const rule = rules[0];
// rules의 마지막 부분에 추가하기 위해서 인덱스를 rules.length로 주었다.
sheet.insertRule('.red{background:red}', rules.length);
sheet.insertRule('.blue{background:blue}', rules.length);
console.log(sheet);
```

`insertRule`을 한 뒤, sheet를 출력해 cssRules를 확인해보면 우리가 지정한 red, blue 항목이 추가된 것을 볼 수 있다. 실제 CSS 스타일에 추가가 되었는지 알아보려면 다음과 같이 html의 body에서 확인한다.

```html
<!-- 실행해보면 CSS가 잘 적용되는 것을 볼 수 있다. -->
<div class="red">red</div>
<div class="blue">blue</div>
```

> cssRules는 순서가 굉장히 중요하기 때문에 `insertRule`을 할 때 두 번째 인자로 css를 추가할 순서를 지정하는 것을 볼 수 있다. (예를 들어 CSS에서 .test라는 css를 두 번 주는데 먼저 선언된 것은 width:100, 두 번째로 선언된 것은 width:200이라면 아래 선언된 200이 먹힌다.)

만약 insert를 나중에 한다면 어떻게 될까? 나중에 insert하더라도 CSS가 적용되는지 알아보자. onclick을 이용하여 red부분을 클릭할 때마다 insertRule이 작동하게 코드를 작성했다.

```js
const el = document.querySelector('#s');
const sheet = el.sheet;
const rules = sheet.cssRules;
const rule = rules[0];
document.querySelector('.red').onclick = (_) => {
  sheet.insertRule('.red{background:red}', rules.length);
  sheet.insertRule('.blue{background:blue}', rules.length);
};
```

위 코드를 실행해 red를 클릭하면 CSS가 변화하는 것을 볼 수 있다. 이유는 다음과 같다. <u>document에 등록된 sheet가 변화하면 렌더링을 다시 하기 때문이다.(repaint, reflow까지)</u>

document에 등록된 stylesheet라는 건 어떻게 아는걸까? 이는 우리가 html에 style 태그를 이미 등록했기 때문이다. 등록된 stylesheet는 따로 관리하게 되는데 이는 브라우저에서 확인할 수 있다.

브라우저 콘솔창에서 `document.styleSheets`를 입력. (❓ 강의에선 CSSStyleSheet가 2개 나오는데 내 결과에선 하나만 나온다) CSSStyleSheet 안에 cssRules를 보면 우리가 insertRule로 추가한 CSS들이 반영돼있는 것을 볼 수 있다. 만약 CSSStyleSheet가 여러개라면 아래에 있는 스타일 태그 일수록 우선순위가 높다.(아래있는 것이 위에 있는 것을 이긴다.)

또한 브라우저 콘솔창에서 우리가 만든 스타일 속성을 끌 수 있다. `document.styleSheets[0].disabled = true`로 바꾸면 onclick으로 적용했던 CSS가 동작하지 않는 것을 볼 수 있다. (적용했던 스타일시트를 꺼버린 것임)

## 동적으로 CSS 삭제하기: Delete Rule

`deleteRule` 을 이용해 CSS를 제거할 수도 있다. 인덱스만 지정해주면 된다. insertRule 코드에 다음 코드를 추가해보자. blue를 한번 클릭하면 마지막으로 추가했던 `.blue`에 대한 CSS가 삭제될 것이다.

```js
document.querySelector('.blue').onclick = (_) => {
  sheet.deleteRule(rules.length - 1);
};
```

## CSSOM 의 효율성

CSSOM을 다루는 것을 DOM의 style 객체를 다루는 것과 완전히 다르다. CSSOM을 이용하면 stylesheet를 동적으로 조작할 수 있다는 것이다. inline 태그를 건드리는 것보다 좋다. css object(stylesheet) 하나만 건드리면 스타일이 적용되있는 요소들에 일괄적으로 적용되니까 좋은 것! 이 경우엔 성능상의 저하가 없을 것이다. (+ 위 예제처럼 태그에는 미리 class를 지정해놓아도 상관없다) dom은 그대로 두고 cssom를 사용해 클래스나 dom구조에 맞게 cssobject만 바꿔주는 것. 하나하나 dom의 style을 조정하는 것보다 훨씬 빠르다. 예를 들어 red라는 이름을 가진 class가 굉장히 많을 때 cssom를 활용하면 위에서 말한 것처럼 일괄적으로 css 적용할 수 있게된다.

```html
<div class="red red1">red</div>
<div class="blue blue1">blue</div>
<div class="red">red</div>
<div class="blue">blue</div>
<div class="red">red</div>
<div class="blue">blue</div>
<div class="red">red</div>
<div class="blue">blue</div>
<div class="red">red</div>
<div class="blue">blue</div>
<div class="red">red</div>
<div class="blue">blue</div>
<div class="red">red</div>
<div class="blue">blue</div>
<div class="red">red</div>
<div class="blue">blue</div>
<div class="red">red</div>
<div class="blue">blue</div>
```

```js
document.querySelector('.red1').onclick = (_) => {
  sheet.insertRule('.red{background:red}', rules.length);
  sheet.insertRule('.blue{background:blue}', rules.length);
};

document.querySelector('.blue1').onclick = (_) => {
  sheet.deleteRule(rules.length - 1);
};
```

실행해보면 css object를 조정함으로써 css를 일괄적으로 쉽고 빠르게 바꿀 수 있음을 볼 수 있다.

# Compatibility Library

지금까지 CSS object 모델에 대한 기본을 잡았으니 이를 이용해 CSS 전체를 스크립트를 통해 안정적으로 통제할 수 있는 프레임워크를 만들어보자.

## 프레임워크의 목표

- Vendor Prefix 해결
- CSS 동적 조정

## 해결해야할 문제들

1. Vendor Prefix

> Vendor Prefix란?
>
> 같은 CSS더라도 웹브라우저마다 다른 방식으로 지원될 수 있다. 균일하게 스타일 속성을 표현하게 할 수 있게 브라우저마다 prefix(접두사)를 붙여 스타일을 지정해줄 수 있는데 이를 Vendor Prefix라고 한다. 예를들면 IE or Edge는 Vendor Prefix가 `-ms-`이다.

Vendor Prefix는 실행중에 속성을 확인해보는 수밖에 없다. 예를 들면 다음과 같은 것이 허용되지 않는다는 것이다. '브라우저가 크롬이라면 border-radius에 webkit을 붙이자' 이런게 통하지 않는다. 크롬 버전 54에서는 webkit을 붙여야하는데 버전66에서는 붙이면 안돼 이런식으로 작동하기 때문. border-radius가 있나를 그때그때 확인할 수 밖에 없다. <u>미리 공식을 만들 수 없고 어떤 속성이 있을지 없을지는 실행도중에 확인해야한다.</u>

> Runtime Fetch 해야한다.

2. Unsupported Property

브라우저마다 지원하지 않는 속성이나 값이 존재한다. 대표적으로 ie7에 rgba를 사용하면 브라우저가 죽는다.

> Graceful Fail 실패를 조용하게 잘 처리하고 싶다는 것(없었던 일처럼)

3. Hierarchy Optimize

계층구조를 최적화해야하는 일들이 많이 생긴다. 스타일시트가 수십개 있을 때, 예를 들어 .red에 대해 계산하려면, stylesheet 객체를 다 돌면서(stylesheet 0번부터 1,2,.. 순으로 계산한다) 그 안의 rule list를 다 돌면서 그 안의 rule를 다 돌며 그안의 속성들을 모두 합쳐 계산을 해야한다.(오래걸림) 그렇기 때문에 style태그나 link태그를 여러개 달면 브라우저가 죽어나는것이다.(CSS 중첩 계산)

css 객체 모델을 이용하면 이를 하나의 객체로 통합하고 `sheet.disabled = true;` 를 이용해 몇개는 끄면 된다.

## 우리가 만들 프레임워크의 구조

![](https://images.velog.io/images/pul8219/post/a59dbfa8-9dfe-4066-add7-8bf15dadb388/image.png)

Style(CSSStyleDeclare)

- 가장 의존성이 없음
- dom에도 있고 cssrule에도 있는
- vendor prefix 처리

⬆️ (의존 방향, '알고 있다'는 것)

Rule(CSSRule)

- style을 소유할 수 있는 rule

⬆️

CSS(StyleSheet)

- rule을 여러개 소유할 수 있는 sheet 객체

의존성이 없는 style부터 만들자(그게 쉽다)

Rule 내부에 Style이라는 객체가 들어있다(CSSStyleDeclaration) 이걸 추상화해 하나의 객체로 만들 것이다. 왜 추상화를 하냐면, Style에 날로 속성을 넣으면 Vendor Prefix가 해결이 되지 않기 때문이다. 우리가 만든 구조를 통해 넣어야 Vendor Prefix가 자동으로 처리되도록 하려고 하는 것이다.

## 1. Style 만들기

![](https://images.velog.io/images/pul8219/post/f5568c16-1e87-4395-9290-680c722538fa/image.png)

Style이라는 클래스를 만들어보자

```js

const Style = (_ => {
  const prop = new Map, prefix = 'webkt,moz,ms,chrome,o,khtml'.split(',');
  const NONE = Symbol();
  const BASE = document.body.style;
  const getKey = key => {...}; // end of getKey()
  return class{...};
})();
```

- `prefix`: 그전에 vendor prefix 문자열이 필요하다(브라우저에 따라 여러가지 vendor prefix가 있음) split으로 문자열을 쪼개 prefix라는 배열로 가지고 있는다.
- 자료형이 Map인 `prop`: key는 속성(ex. `background`), value는 해당 브라우저에서 vendor prefix를 포함해 지원하는 진짜 이름이 들어갈 것이다.
- `None`: 어떤 속성은 이 브라우저가 지원하지 않는다는 것을 표시하기 위한 장치
- 위에서도 설명했듯 어떤 속성이 있는지 없는지는 실행도중에 확인해야한다. (ex. border-radius라는 속성이 있나?) 있는지 없는지를 누구에게 물어볼 것인가? 바로 어떤 브라우저든 반드시 가지고 있는 `document.body.style`에 물어보면 된다. body에 있는 속성이라면 있는 것이 확정되는 것!

결국, 위에서 언급했던 것처럼

- `Unsupported Property` 지원하지 않는 속성은 부드럽게 실패하기 위해 `NONE`을 사용할 것이고
- Vendor Prefix를 Runtime에 Fetch하기 위해서 `BASE`, 즉 body에 있는 style 객체를 사용할 것이다. 라는 것!

코드에서 getKey() 부분

```js

const Style = (_ => {
  // ...
  const getKey = key => {
    if(prop.has(key)) return prop.get(key);
    if(key in BASE) prop.set(key, key);
    else if(!prefix.some(v =>{
      // prefix를 붙인 속성은 존재하는가?
      // ...
    })){
      prop.set(key, NONE);
      key = NONE;
    }
    return key;
  }; // end of getKey()

  return class{...};
})();
```

- 진짜 이름은 어떻게 얻나? 표준 이름, 예를 들어 `border-radius`를 보냈을 때 이를 지원하는 어떤 브라우저가 있을 땐 `border-radius`라는 이름을 그대로 받아야 하고, 이를 지원하지 않고 webkit border-radius가 있는 어떤 브라우저는 `webkit border-radius`를 받아야 한다. 아예 지원하지 않는 브라우저라면 `NONE`을 반환해줘야한다. 이런 역할을 하는 것이 `getKey` 함수이다. 표준이름을 주면 해당 브라우저가 지원하는 진짜 이름을 반환하는 함수인 것이다.

  이를 매번 계산하면 비효율적이기 때문에 한번 연산해 진짜 이름을 알아냈으면 이를 캐시에 저장하도록 구현할 것이다. 이 캐시가 `prop`이다. 캐시에 있다면 캐시에 있는 값으로 준다는 것이다. 즉 보낸 표준 이름(key)에 해당하는 것이 캐시안에 들어있다면 그 캐시 안에 있는 진짜 이름을 리턴해준다. (매번 이 if문 밑을 계산하기 싫기 때문에) 한번이라도 진짜 이름을 확인한 적이 있다면 캐시에 저장해둔다는 것이다.

- `if(key in BASE) prop.set(key, key);`: body style에 border-radius가 있다면 캐시에 저장해둔다는 것이다.

- `else if`문: 만약 border-radius가 없다면? prefix를 붙인 border-radius는 있는가? 없으면 key를 NONE으로 설정한다.

> Array.prototype.some()
>
> arr.some(callback[, thisArg])
>
> callback이 어떤 배열 요소라도 참인(truthy)값을 반환하는 경우엔 true이고 그 외에는 false이다.

`else if`문을 자세히 들여다보자(코드 주석 참고)

```js
else if(!prefix.some(v =>{
  // prefix를 붙인 속성은 존재하는가?를 알아볼 차례
  // 메소드 some의 인수인 callback 함수 부분이다.
  // webkitBackground 이런식으로 속성명 첫글자가 대문자이므로 표준 key인 background의 앞에 vendor prefix를 붙이고 대문자로 바꾸고 나머지 뒤인 'ackground'를 붙여주는 작업이 필요하다.
  const newKey = v + key[0].toUpperCase() + key.substr(1);
  if(newKey in BASE){ // prefix붙인 속성이 body에 있다면,
    prop.set(key, newKey); // border-radius 부르면 prefix를 붙인 진짜 이름을 캐시에 저장
    key = newKey; // 리턴할 key는 더이상 원래 키가 아니라 newKey
    return true; // 진짜 이름을 찾았으니 여기서 끊어 라는것. some을 더 돌지 않아도 된다고 끊어버리는 것이다.
  } else return false;
})){
  // some의 결과가 false일 경우에만 여기에 들어온다.
  prop.set(key, NONE);
  key = NONE;
}
return key; // 그냥 key가 리턴되든지, newKey가 리턴되든지, NONE이 리턴될 것임
```

다음부턴 `if(prop.has(key)) return prop.get(key);`에 걸려서(한번 한 건 캐시에 이미 있기 때문에 꺼내쓰기만 하면 된다.) 그 아래의 계산들을 하지 않아도 된다.

지금까지 한 것은 Vendor Prefix를 런타임에 조사해서 진짜 이름을 얻게되는 전략을 짠 것이다. 위에서 말했듯 공식이 통하지 않는다. 모질라 이면 모든 속성에 moz를 붙여야지~ 이게 가능하지 않다는 것이다. 반드시 당시에 확인해야한다. 크롬이라고 일괄적으로 webkit을 모두 붙여도 안 된다. 속성마다 다 다르기 때문이다. 모든 브라우저에 대응하려면 이 방법밖엔 없다.

```js
const Style = ((_) => {
  // ...
  const getKey = (key) => {
    // ...
  }; // end of getKey()
  return class {
    constructor(style) {
      this._style = style;
    } // 생성자에 style객체를 준다. 이 클래스는 style 객체를 안고 태어난다.
    // 키를 얻기(스타일 시트에 있는 background라는 값을 얻고싶다면?)
    get(key) {
      key = getKey(key); // 반드시 getKey에 보내서 진짜 이름을 얻어야 한다.
      if (key === NONE) return null; // 브라우저가 지원하지 않는 경우 부드럽게 null을 리턴하기 // Unsupported Property 문제 해결!
      return this._style[key]; // 이름이 있다면 진짜 이름으로 style객체에 해당 속성값을 가져오자
    }
    set(key, val) {
      key = getKey(key);
      // key가 NONE이 아니면
      if (key !== NONE) this._style[key] = val; // 값을 설정
      // NONE이면 스타일을 아예 건들지 않는다(Graceful Fail)
      return this; // set을 계속 호출하는 경우가 많아서 set을 쓸 수 있게 this를 리턴
    }
  };
})();
```

class를 만드는 부분도 중요하지만 `getKey()` 함수가 속성을 얻어오는 방식이 가장 핵심이다.

### 만든 Style 객체 사용하기 & 전체 코드

```js
const Style = ((_) => {
  const prop = new Map(),
    prefix = 'webkt,moz,ms,chrome,o,khtml'.split(',');
  const NONE = Symbol();
  const BASE = document.body.style;
  const getKey = (key) => {
    if (prop.has(key)) return prop.get(key);
    if (key in BASE) prop.set(key, key);
    else if (
      !prefix.some((v) => {
        const newKey = v + key[0].toUpperCase() + key.substr(1);
        if (newKey in BASE) {
          prop.set(key, newKey);
          key = newKey;
          return true;
        } else return false;
      })
    ) {
      prop.set(key, NONE);
      key = NONE;
    }
    return key;
  }; // end of getKey()
  return class {
    constructor(style) {
      this._style = style;
    }
    get(key) {
      key = getKey(key);
      if (key === NONE) return null;
      return this._style[key];
    }
    set(key, val) {
      key = getKey(key);
      if (key !== NONE) this._style[key] = val;
      return this;
    }
  };
})();

const el = document.querySelector('#s');
const sheet = el.sheet;
const rules = sheet.cssRules;
const rule = rules[0];

const style = new Style(rule.style); // ⭐
style.set('borderRadius', '20px').set('boxShadow', '0 0 0 10px red');
console.log(rule); // js에서 지정한 css 스타일들이 잘 들어가있는 것을 확인할 수 있다.
```

```html
<!DOCTYPE html>
<html>
  <head>
    <style id="s">
      .test {
        background: #ff0;
      }
    </style>
  </head>
  <body>
    <div class="test">abc</div>
    <script src="basicTest.js"></script>
  </body>
</html>
```

- vendor prefix를 간섭하거나 이에 구애받지 않고 스타일 속성을 지정할 수 있게 되었다.
- `this`를 리턴하도록 했으므로 `set` 체이닝이 가능하다.

브라우저 내부에 반영될 때는

![](https://images.velog.io/images/pul8219/post/512026b0-4ef5-48ff-b67f-ac7338ce5f12/image.png)

이렇게 반영될 수도,

![](https://images.velog.io/images/pul8219/post/75df76e6-a62e-4f23-85d0-4ded4e836849/image.png)

이렇게 반영될 수도 있는 것이다.

## 2. Rule 만들기

rule을 구성하는 것들(type, selectortext, style, ...)을 하나하나 구현하는 것이 아니라 rule을 통으로 감싸는 객체를 만들면 된다.

```js
const Style = ((_) => {
  // ... 위에서 만들었던 Style 코드
})();

const Rule = class {
  constructor(rule) {
    this._rule = rule;
    this._style = new Style(rule.style);
  }
  get(key) {
    return this._style.get(key);
  }
  set(key, val) {
    this._style.set(key, val);
    return this;
  }
};

const el = document.querySelector('#s');
const sheet = el.sheet;
const rules = sheet.cssRules;
const rule = new Rule(rules[0]); // 우리가 만든 클래스인 Rule에 rule을 지정한다.
rule.set('borderRadius', '20px').set('boxShadow', '0 0 0 10px red'); // 이렇게 하면 rule안의 style에 알아서 반영이 될 것이다. (rule이 style을 소유하는 구조이다.)
```

- Rule의 생성자에서 rule과 위에서 만들었던 `Style` 객체를 지정한다.
- `get`, `set`도 `Style`의 `get`, `set`을 쓴다.
- rule은 `get`, `set`을 할 때 Style 객체에 의존하게 되고, Style 객체는 `get`, `set`시 `getKey`라는 함수에 의존하게 돼 진짜 이름인지 확인하는 절차를 진행한다. 이로써 보다 더 안전한 방법으로 css를 조작할 수 있게 되었다.

## 3. Sheet 만들기

rule을 add/remove 하는 것이 Sheet 객체의 주 기능이다. 동적으로 CSS 추가/삭제하기 에서 배웠던 코드를 바탕으로 어떻게 구현해야할지 생각해보자.

```js
const sheet = el.sheet;
const rules = sheet.cssRules;

// 추가 // rules의 length가 필요함을 알 수 있다.
sheet.insertRule('.red{background:red}', rules.length);

// 삭제
sheet.deleteRule(rules.length - 1);
```

```js
const Style = ((_) => {
  // ...
})();

const Rule = class {
  constructor(rule) {
    this._rule = rule;
    this._style = new Style(rule.style);
  }
  // ...
};

// ⭐
const Sheet = class {
  constructor(sheet) {
    this._sheet = sheet;
    this._rules = new Map();
  }
  add(selector) {
    const index = this._sheet.cssRules.length;
    this._sheet.insertRule(`${selector}{}`, index); // selector를 지정하여 빈 rule을 넣는다.
    const cssRule = this._sheet.cssRules[index]; // 진짜 cssRule이 담긴다.
    const rule = new Rule(cssRule); // 우리가 만든 Rule 객체에 cssRule을 넣는다.
    this._rules.set(selector, rule); // key를 selector로 해서 rule을 rules에 저장해놓는다. -> 나중에 selector로 조회할 수도  있음
    return rule; // add를 실행하면 이렇게 만들어진 rule이 리턴된다.
  }
  remove(selector) {
    // 이전에 deleteRule은 index를 지정해야만 delete가 가능했다.
    // 하지만 우리가 원하는 건 selector로 Rule을 지우는 것이다.(.red, .blue를 특정하여 지우고 싶은 것이다.)
    if (!this._rules.contains(selector)) return; // rules에 해당 selector로된 rule이 있다면 그냥 리턴
    const rule = this._rules.get(selector)._rule; // Rule 객체에는 _rule이 있다.(위에서 짠 Rule 객체 관련 코드 참고하기)
    Array.from(this._sheet.cssRules).some((cssRule, index) => {
      // cssRules를 돌면서 rule과 같다면 해당 rule을 삭제
      if (cssRule === rule._rule) {
        this._sheet.deleteRule(index);
        return true; // true를 리턴해 some 함수를 멈춘다.
      }
    });
  }
  get(selector) {
    return this._rule.get(selector);
  }
};

// Sheet 객체를 직접 사용해보자
const sheet = new Sheet(document.styleSheets[0]);
sheet.add('body').set('background', '#f00');
sheet.add('.test').set(
  'cssText',
  `
  width:200px;
  border:1px solid #fff;
  color: #000;
  background: #fff
`
);
```

```html
<!DOCTYPE html>
<html>
  <head>
    <style></style>
  </head>
  <body>
    <div class="test">test</div>
    <script src="test.js"></script>
  </body>
</html>
```

- `cssText`를 사용해 여러가지 속성을 한번에 밀어넣을 수 있다. 이때는 자바스크립트 속성명 대신 CSS 이름 그대로 쓸 수 있다는 장점이 있다. 다만 이 예제에서는 이렇게 작성하게 되면 우리가 만든 key-value 시스템이 무의미해진다.

![](https://images.velog.io/images/pul8219/post/7c264a24-dc6e-4db1-8507-ac4fad86aeb5/image.png)

그러나 우리가 지금까지 구현한 것은 CSS rule type 1번을 커버한 것에 불과하다. import 되는 경우는? @font-face 등은 어떻게 할 것인가?

## keyframes 다루기

keyframes에는 `from`, `to`와 같은 keyframe animation 셀렉터가 들어가있다.(DOM 셀렉터가 아님) 이를 어떻게 객체화 시킬 것인가?

```js
const Style = ((_) => {
  const prop = new Map(),
    prefix = 'webkt,moz,ms,chrome,o,khtml'.split(',');
  const NONE = Symbol();
  const BASE = document.body.style;
  const getKey = (key) => {
    if (prop.has(key)) return prop.get(key);
    if (key in BASE) prop.set(key, key);
    else if (
      !prefix.some((v) => {
        const newKey = v + key[0].toUpperCase() + key.substr(1);
        if (newKey in BASE) {
          prop.set(key, newKey);
          key = newKey;
          return true;
        } else return false;
      })
    ) {
      prop.set(key, NONE);
      key = NONE;
    }
    return key;
  }; // end of getKey()
  return class {
    constructor(style) {
      this._style = style;
    }
    get(key) {
      key = getKey(key);
      if (key === NONE) return null;
      return this._style[key];
    }
    set(key, val) {
      key = getKey(key);
      if (key !== NONE) this._style[key] = val;
      return this;
    }
  };
})();

const Rule = class {
  constructor(rule) {
    this._rule = rule;
    this._style = new Style(rule.style);
  }
  get(key) {
    return this._style.get(key);
  }
  set(key, val) {
    this._style.set(key, val);
    return this;
  }
};

const Sheet = class {
  constructor(sheet) {
    this._sheet = sheet;
    this._rules = new Map();
  }
  add(selector) {
    const index = this._sheet.cssRules.length;
    this._sheet.insertRule(`${selector}{}`, index);
    const cssRule = this._sheet.cssRules[index];
    // ⭐ @keyframes을 처리하기 위한 분기가 생겼다.
    let rule;
    if (selector.startsWith('@keyframes')) {
      rule = new KeyFramesRule(cssRule);
    } else {
      rule = new Rule(cssRule);
    }
    this._rules.set(selector, rule);
    return rule;
  }
  remove(selector) {
    if (!this._rules.contains(selector)) return;
    const rule = this._rules.get(selector)._rule;
    Array.from(this._sheet.cssRules).some((cssRule, index) => {
      if (cssRule === rule._rule) {
        this._sheet.deleteRule(index);
        return true;
      }
    });
  }
  get(selector) {
    return this._rule.get(selector);
  }
};

// ⭐
// KeyFramesRule은 Sheet 객체와 생김새가 똑같다.
// keyframes 내부가 스타일 시트처럼 생겼기 때문이다.
// 유일한 차이점은 rule을 넣을 때 insertRule 대신 appendRule을 써야한다.(w3c 표준)

const KeyFramesRule = class {
  constructor(rule) {
    this._keyframe = rule;
    this._rules = new Map();
  }
  add(selector) {
    const index = this._keyframe.cssRules.length;
    this._keyframe.appendRule(`${selector}{}`);
    const cssRule = this._keyframe.cssRules[index];
    const rule = new Rule(cssRule);
    this._rules.set(selector, rule);
    return rule;
  }
  remove(selector) {
    if (!this._rules.contains(selector)) return;
    const rule = this._rules.get(selector)._rule;
    Array.from(this._keyframe.cssRules).some((cssRule, index) => {
      if (cssRule === rule._rule) {
        this._keyframe.deleteRule(index);
        return true;
      }
    });
  }
};

const sheet = new Sheet(document.styleSheets[0]);
const size = sheet.add('@keyframes size'); // keyframes rule 객체가 리턴됨
size.add('from').set('width', '0'); // Rule 객체가 리턴되므로 set 을 호출할 수 있음
size.add('to').set('width', '500px');
```

- keyframes animation을 동적으로 정의해 쓸 수 있게 되었다.
- 예를 들어 런타임에 애니메이션 정도를 조정해야하는 경우 keyframe을 쓰길 포기하고 자바스크립트 애니메이션을 썼다면 이젠 그러지 않아도 된다!

# Typed CSSOM

<https://drafts.css-houdini.org/css-typed-om/>

- CSS draft를 내는 그룹
- Chrome의 경우 houdini 프로젝트에서 진행하는 draft들을 거의 반영한다. 사실 구글에겐 표준이 아니어도 상관이 없는 것이다. (w3c를 오히려 귀찮아함)
- 구글이 houdini 프로젝트를 통해 Chrome에 반영한 스펙들은 여러가지가 있다. 그중 paint api를 이용하면 요소의 백그라운드에 (이미지를 넣는게 아니라) 별을 그리는 것도 가능하다.
- 이중에서 Typed OM(Object Model)에 대해서 알아볼 것이다. 우리가 지금까지 배운 CSSOM의 정적인 확장판이라 볼 수 있다.

```js
$('#someDiv').style.height = getRandomInt() + 'px';
// 주려는 건 숫자인데 위 경우처럼 항상 문자열로 만들어줘야되는 때가 있다. 자바스크립트 애니메이션 프레임워크에서 텍스트로 전환해주는 과정에서 오래걸릴 수 있다. 구글도 이게 싫었던 것! 위 코드를 다음과 같이 바꿀 수 있다.

const h = $('someDiv').styleMap.get('height');
$('#otherDiv').styleMap.set('height', h);
// 이게 typed OM이다. h가 도대체 뭘까?
```

```js
CSS.number(0.5); //크롬에서 실행 가능
// 순수한 숫자를 의미한다.
// CSS에서 순수한 숫자를 쓰는 경우는 opacity, z-index 등이 있다.
el.styleMap.set('opacity', CSS.number(0.5));

CSS.px(500); // 우리가 친숙한 px!
el.styleMap.set('height', CSS.px(500)); // 이렇게 쓰면 더이상 문자열을 쓰지 않아도 된다.
// 정적인 형을 가지고 있다하여 Typed OM이라고 한다.(형에 맞는 값을 보냄)
```

## CSS에 있는 Type의 종류

![](https://images.velog.io/images/pul8219/post/9e35e236-0240-47ef-89a5-9f3a41fae604/image.png)

```plaintext
CSSTransformValue
  ㄴCSSTransformComponent(아래 요소들을 묶어준다.)
    ㄴCSSTranslate, CSSRotate, CSSScale, CSSSkew, ...

margin: 10px 0 0 10px -> trbl 을 묶어주는 CSSPositionValue 형이 필요하다.(number 2개나 4개를 받아들일 수 있다)

background: url('a.png') -> CSSImageValue 라는 타입 필요
CSS값중 이미지를 받을 수 있는 것들 - list style(유연함), cursor(크기, 브라우저에 있어 제한적)

inset, left... -> CSSStyleValue
```

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      .test {
        background: #f00;
      }
    </style>
  </head>
  <body>
    <div class="test">test</div>
    <script>
      document
        .querySelector('.test')
        .attributeStyleMap.set('height', CSS.px(300));
    </script>
  </body>
</html>
```

- 참고) `attributeStyleMap` 이 이름은 브라우저 버전마다 바뀔 수 있다.
- 현실엔 범용 브라우저를 지원하는 웹사이트 vs 크롬만 지원하는 웹사이트(ex.관리자페이지)가 있다. 쨌든 크롬만 지원하는 경우 이런 스펙 써도된다는 것...

# Comment

# References

# 팀원들 결과물

STEP 40

- [@pul8219](https://github.com/pul8219/TIL/blob/master/Documents/FrontEnd-Study/step40.md)
- [@eyabc](https://eyabc.github.io/docs/css/css-rendering/cssom_rules)
- [@khw970421](https://velog.io/@khw970421/%EC%BD%94%EB%93%9C%EC%8A%A4%ED%94%BC%EC%B8%A0-css-rendering-3%ED%9A%8C%EC%B0%A8-part1-step-40)

STEP 41

- [@pul8219](https://github.com/pul8219/TIL/blob/master/Documents/FrontEnd-Study/step40.md#Compatibility-Library)
- [@eyabc]()
- [@khw970421]()
