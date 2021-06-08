[문서 목록으로 돌아가기](README.md)

> # STEP 40
>
> 💡질의응답은 <https://github.com/pul8219/TIL> `Issues` 탭의 알맞은 step 이슈안에 남겨주세요. ➡️ [Issue탭으로 이동](https://github.com/pul8219/TIL/issues)
>
> - 작성자: Wol-dan (@pul8219)
> - 스터디 주제: FrontEnd 면접 스터디 <https://gitlab.com/siots-study/topics/-/wikis/%EC%8B%AC%ED%99%941>
> - 공부 범위: STEP 40 [코드스피츠76 CSS Rendering - 3회차](https://www.youtube.com/watch?v=WzimLP3Kukc)
> - 기한: 06/05(토) ~ 06/08(화)

# 보충 필요

# 목차

# CSSOM

- CSSOM(CSS Object Model): CSS를 객체화 시켜 모델링한 것. 자바스크립트로 CSS를 수정할 수도 있다.
- DOM(Document Object Model): HTML(Document)을 객체화시켜 프로그래밍 가능하게 만든 것. 자바스크립트로 DOM API를 이용하면 html을 직접 수정하지 않고도 DOM요소에 변화를 줄 수 있다.

## 태그의 실제 내용은 태그 자체가 아닌 태그 내부에 있다.

태그 그 자체는 실체가 아닌 일종의 컨테이너 박스같은 것이고, 실제 내용은 태그 안에 있다. 예를 들어 style 태그 자체에는 sheet라는 실체가 있고 canvas 태그의 실체는 getContext로 얻은 canvastocontext에 있다. 이를 DOM에 포함시키려면 반드시 canvas라는 태그로 감싸야만(wrapping) html에 넣을 수 있다.

이러한 태그 내의 내용들을 사용하는 방법은 html 버전마다 각기 다르다. 예를 들어 canvas는 getcontext라는 메소드를 호출해 사용하지만 구형 element들은 속성으로 사용한다.

## 예제 코드

예제코드로 더 자세히 알아보자. style 태그의 sheet 속성을 사용하면 CSSStyleSheet라는 객체를 얻을 수 있다.

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

또한 sheet안에 cssrules라는 list를 갖고있다. (여러 rule들이 들어있다.) (이는 유사배열로 배열과 비슷한 친구이다. length라는 속성은 있지만 배열 메소드는 먹히지 않는 list)

rules의 0번째부터는 rule들이 들어있다. 이 예제에서 rules[0]에는 style 내에서 정의한 .test 내용이 들어가있다. 만약 정의한 style이 여러개였다면 `[0], [1], [2], ...`에 차례대로 들어있을 것이다.

각각 rule에도 여러가지 속성이 들어있다.

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
 */
```

이렇게 html에서 text로 정의했던 css가 브라우저의 해석과정을 거치고 나면 메모리에 객체 형태로 저장되어 하나하나 접근 가능하다. html의 text로 적어놓은 것을 메모리상의 구조로 바꾸는 것을 CSSOM라고 한다.

## CSSRule Type

그렇다면 각각 rule들에 있다던 `type` 속성은 무엇일까? <u>CSS 정의</u>에 대한 rule을 의미한다. `type`에는 굉장히 많은 종류가 있다.

- type:1 | STYLE_RULE | CSSOM (안에 있는 객체가 CSSOM 라는 뜻)
- type:2 | CHARSET_RULE | CSSOM -> `@charset`
- type:3 | IMPORT_RULE | CSSOM
- type:4 | FONT_FACE_RULE | CSSOM -> 외부 폰트 불러올 때 사용하는 `font-face` 생각해보기
- type:7 | KEYFRAMES_RULE | css3-animations -> css3-animations라는 특별한 객체로 바뀌어 메모리에 저장된다.

## Insert Rule

CSS를 동적으로 추가할 수 있을까? 당연 ok. rules에 추가하는 것이 아니라 `insertRule`을 사용해 sheet에 추가해야한다.

```js
const el = document.querySelector('#s');
const sheet = el.sheet;
const rules = sheet.cssRules;
const rule = rules[0];
sheet.insertRule('.red{background:red}', rules.length);
sheet.insertRule('.blue{background:blue}', rules.length);
console.log(sheet);
```

`insertRule`을 한 뒤, sheet를 출력해 cssRules를 확인해보면 우리가 지정한 red, blue 항목이 추가된 것을 볼 수 있다. 실제 CSS 스타일에 추가가 되었는지는 다음과 같이 html의 body에서 확인한다.

```html
<div class="red">red</div>
<div class="blue">blue</div>
```

> cssRules의 순서는 굉장히 중요하기 때문에 insertRule을 할 때도 두 번째 인자로 css를 추가할 순서를 지정하는 것을 볼 수 있다. (예를 들어 CSS에서 .test라는 css를 두 번 주는데 먼저 선언된 것은 width:100, 두 번째로 선언된 것은 width:200이라면 아래 선언된 200이 먹힌다.)

만약 insert를 나중에 한다면 어떻게 될까? 나중에 insert하더라도 CSS가 적용되는지 알아보자. red부분을 클릭할 때마다 insertRule이 작동하게 코드를 작성했다.

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

실행해 red를 클릭하면 CSS가 변화하는 것을 볼 수 있다. 이유는 다음과 같다. document에 등록된 sheet가 변화하면 렌더링을 다시 하기 때문이다.(repaint, reflow까지)

document에 등록된 stylesheet라는 건 어떻게 아는걸까? 이는 우리가 html에 style 태그를 이미 등록했기 때문이다. 등록된 stylesheet는 따로 관리하게 되는데 이는 브라우저에서 확인할 수 있다.

브라우저 콘솔창에서 `document.styleSheets`를 입력. (❓ 강의에선 CSSStyleSheet가 2개 나오는데 내 결과에선 하나만 나온다) CSSStyleSheet 안에 cssRules를 보면 우리가 insertRule로 추가한 CSS들이 반영돼있는 것을 볼 수 있다. 만약 CSSStyleSheet가 여러개라면 아래에 있는 스타일 태그 일수록 우선순위가 높다.(아래있는 것이 위에 있는 것을 이긴다.)

또한 브라우저 콘솔창에서 우리가 만든 스타일 속성을 끌 수 있다. `document.styleSheets[0].disabled = true`로 바꾸면 onclick으로 적용했던 CSS가 동작하지 않는 것을 볼 수 있다. (적용했던 스타일시트를 꺼버린 것임)

## Delete Rule

deleteRule 을 이용해 CSS를 제거할 수도 있다. 인덱스만 지정해주면 된다. insertRule 코드에 다음 코드를 추가해보자. 마지막으로 추가했던 `.blue`에 대한 CSS가 삭제될 것이다.

```js
document.querySelector('.blue').onclick = (_) => {
  sheet.deleteRule(rules.length - 1);
};
```

CSSOM을 다루는 것을 DOM의 style 객체를 다루는 것과 완전히 다르다. CSSOM을 이용하면 stylesheet를 동적으로 조작할 수 있다는 것이다. inline 태그를 건드리는 것보다 좋다. css object(stylesheet) 하나만 건드리면 스타일이 적용되있는 애에 일괄적으로 적용되니까 좋은 것! 이 경우엔 성능상의 저하가 없을 것이다. (+ 위 예제처럼 태그에는 미리 class를 지정해놓아도 상관없다) dom은 그대로 두고 cssom를 사용해 클래스나 dom구조에 맞게 cssobject만 바꿔주는 것. 하나하나 dom의 style을 조정하는 것보다 훨씬 빠르다. 예를 들어 red라는 이름을 가진 class가 굉장히 많을 때 cssom를 활용하면 위에서 말한 것처럼 일괄적으로 css 적용할 수 있게된다.

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

지금까지 CSS object 모델에 대한 기본을 잡았으니 이를 이용해 CSS 전체를 스크립트를 통해 안정적으로 통제할 수 있는 프레임워크를 만들어볼 것이다.

목표

- Vendor Prefix 해결
- CSS 동적 조정

## 해결해야할 문제들

1. Vendor Prefix

> Vendor Prefix란?
>
> 같은 CSS더라도 웹브라우저마다 다른 방식으로 지원될 수 있다. 이를 균일하게 스타일 속성을 표현하게 할 수 있게 브라우저마다 prefix(접두사)를 붙여 스타일을 지정해줄 수 있는데 이를 Vendor Prefix라고 한다. 예를들면 IE or Edge는 Vendor Prefix가 `-ms-`이다.

Vendor Prefix는 실행중에 속성을 확인해보는 수밖에 없다. 예를 들면 다음과 같은 것이 허용되지 않는다는 것이다. '브라우저가 크롬이라면 border-radius에 webkit을 붙이자' 이런게 통하지 않는다. 크롬 버전 54에서는 webkit을 붙여야하는데 버전66에서는 붙이면 안돼 이런식으로 작동하기 때문. border-radius가 있나를 그때그때 확인할 수 밖에 없다. 미리 공식을 만들 수 없고 어떤 속성이 있을지 없을지는 실행도중에 확인해야한다.

> Runtime Fetch

2. Unsupported Property

브라우저마다 지원하지 않는 속성이나 값이 존재한다. 대표적으로 ie7에 rgba를 사용하면 브라우저가 죽는다.

> Graceful Fail 실패를 조용하게 잘 처리하고 싶다는 것(없었던 일처럼)

3. Hierarchy Optimize

계층구조를 최적화해야하는 일들이 많이 생김. 스타일시트가 수십개 있다면 예를 들어 .red에 대해 계산하려면, stylesheet 객체를 다 돌면서(stylesheet 0번부터 1,2,.. 순으로 계산한다) 그 안의 rule list를 다 돌면서 그 안의 rule를 다 돌며 그안의 속성들을 모두 합쳐 계산을 해야한다.(오래걸림) 그렇기 때문에 style태그나 link태그를 여러개 달면 브라우저가 죽어나는것이다.(CSS 중첩 계산)

css 객체 모델을 이용하면 이를 하나의 객체로 통합하고 sheet.disabled = true; 를 이용해 몇개는 끄면 된다.

## 우리가 만들 프레임워크의 구조

Style(CSSStyleDeclare)

- 가장 의존성이 없음
- dom에도 있고 cssrule에도 있는
- vendor prefix 처리

⬆️ (의존 방향, '알고 있다'는 것)

Rule(CSSRule)

- style을 소요할 수 있는 rule

⬆️

CSS(StyleSheet)

- rule을 여러개 소유할 수 있는 sheet 객체

의존성이 없는 style부터 만들자(그게 쉽다)

Rule 내부에 Style이라는 객체가 들어있다(CSSStyleDeclaration) 이걸 추상화해 하나의 객체로 만들 것이다. 왜 추상화를 하냐면, Style에 날로 속성을 넣으면 Vendor Prefix가 해결이 되지 않기 때문이다. 우리가 만든 구조를 통해 넣어야 Vendor Prefix가 자동으로 처리되도록 하려고 하는 것이다.

### Style

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

- 그전에 vendor prefix 문자열이 필요하다(브라우저에 따라 여러가지 vendor prefix가 있음) split으로 문자열을 쪼개 prefix라는 배열로 가지고 있을 것이다.
- Map을 통해 key는 속성(ex. `background`), value는 해당 브라우저에서 vendor prefix를 포함해 지원하는 진짜 이름이 들어갈 것이다.
- None 어떤 속성은 이 브라우저가 지원하지 않는다는 것을 표시하기 위한 장치
- 위에서도 설명했듯 어떤 속성이 있는지 없는지는 실행도중에 확인해야한다. (ex. border-radius라는 속성이 있나?) 있는지 없는지를 누구에게 물어볼 것인가? 바로 어떤 브라우저나 반드시 가지고 있는 `document.body.style`에 물어보면 된다. body에 있는 속성이라면 있는 것이 확정되는 것!

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

- 진짜 이름은 어떻게 얻나? 표준 이름, 예를 들어 `border-radius`를 보냈을 때 이를 지원하는 어떤 브라우저가 있을 땐 `border-radius`라는 이름을 그대로 받아야 하고, 이를 지원하지 않고 webkit border-radius가 있는 어떤 브라우저는 `webkit border-radius`를 받아야 한다. 아예 지원하지 않는 브라우저라면 NONE을 반환해줘야한다. 이런 역할을 하는 것이 getKey 함수이다. 표준이름을 주면 해당 브라우저가 지원하는 진짜 이름을 반환하는 함수인 것이다.

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
