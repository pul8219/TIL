# STEP 1
* 스터디 주제: FrontEnd <https://gitlab.com/siots-study/topics/-/wikis/%EC%8B%AC%ED%99%941>
* 공부 범위: 심화1의 const와 let의 차이 ~ 네스팅된 스코프(Nested scopes)에서의 렉시컬 스코핑(Lexical scoping)

## 목차
* [const와 let](#const와-let)
* [Scope](#Scope)
* [Lexical Scope](#Lexical-Scope)
* [Hoisting](#Hoisting)
* [궁금증](#공부하면서-생긴-궁금증)
* [참고 자료](#참고-자료)

## const와 let

### var
- `function-level-scope` (함수 스코프)

`var`는 함수 코드 블록만 [Scope](#Scope)로 인정하기 때문에 함수 외부에서 선언된 모든 변수는 전역변수다.

- `var`로 변수 생성시 선언과 초기화가 동시에 이루어지기 때문에 [호이스팅 현상](#Hoisting)이 나타난다.

```js
var x = 0;
{
    var x = 1;
    console.log(x); // 1
}
console.log(x); // 1 👈 코드 블록({})내에 선언된 x값도 전역변수이기 때문에 1이 출력된다. (var는 !함수! 블록 스코프를 따르는 걸 명심하자.)
```

```js
var sum = 0;
for(var i = 0; i < 10; i++){
    sum += i;
}
console.log(sum);
console.log(i); // 10 출력 👈 var는 function 레벨 스코프이기 때문에 for문 안에서 선언된 변수는 for block 밖에서도 유효하다.
```

- 재선언 가능

- 전역 변수로 이용하는 경우 변수명이 겹칠 수 있고 호이스팅 관련 문제 때문에 `var`는 사용을 지양하는 것이 좋다. 대신에 `let`과 `const`를 사용해보자.


### const와 let의 공통점

- `block-level-scope` (블록 스코프)

```js
let foo = 123; // 전역 변수
{
    let foo = 456; // 지역 변수 👈 전역에서 선언된 변수 foo와는 다른 별개의 변수이다.
    let bar = 456; // 지역 변수
}
console.log(foo); // 123
console.log(bar); // ReferenceError: bar is not defined 👈 전역에서는 코드 블록 내에 선언된 bar 변수를 참조할 수 없다. let은 블록 레벨 스코프이기 때문! 
```

- 중복된 이름을 갖는 변수 재선언 불가

```js
var foo = 123;
var foo = 456; // 중복 선언 가능

let bar = 123;
let bar = 456; // Uncaught SyntaxError 👈 중복 선언 불가
```

> [참고] 함수 scope와 블록 scope
>
> 함수 scope: 함수 단위로 범위를 지정
>
> 블록 scope: 중괄호({}) 단위로 범위를 지정


### const와 let의 차이점

- `let`은 재할당 가능, `const`는 재할당 불가 (변하지 않는 값에는 `const`(상수)를 사용하자)

- `const`는 선언과 할당을 **동시에** 해줘야 한다.

```js
let x; // 이렇게 초기화하지 않으면 undefined가 할당된다.
// const x; // const 키워드는 반드시 선언과 할당을 동시에 해야하기 때문에 이렇게 작성하면 에러가 발생한다.
```

### const와 let은 호이스팅이 될까?

- 그 전에, [Hoisting이란?](#Hoisting)

- const, let은 변수가 초기화되기 전에 접근하려고 하면 `undefined`가 출력되는게 아니라, `ReferenceError`가 발생한다.

**Why?** const, let은 `TDZ`에 의해 제약받기 때문이다.

```js
console.log(x); // ReferenceError: x is not defined
const x = 'hello';
```

- **TDZ?**

풀어쓰면 `Temporal Dead Zone(일시적 사각지대)`로 변수의 선언부터 변수에 할당되는 부분을 만나기 전까지 변수가 잠시 죽어있는 구간이라고 생각하면 된다.

호이스팅시 `undefined`로 값이 자동 초기화되는 `var`와 달리 `const`와 `let`의 경우 초기 값이 설정되지 않는다.

(**const와 let도 호이스팅되긴 한다는 뜻이다.**)

다음 예제로 `const`와 `let`을 사용할 때 `TDZ`의 제약을 받는 상황을 생각해보자.

```js
const test = '123';
function a(){
    console.log(test);
    let test = '456';
}
a(); // ?
```

`호이스팅`이 일어나지 않았다면 `a()` 함수 호출의 결과로 `123`이 출력될 것이다.
그러나 위 코드를 실행하면 `123`이 출력되는 것이 아니라 `ReferenceError`가 발생한다. `const`와 `let`은 초기화되기 전까지는 액세스할 수 없는 `TDZ`현상이 일어나기 때문이다. 위 코드가 실행되는 내부적인 과정은 다음과 같다.

```js
const test = '123';
function a(){
    // let test; // 호이스팅에 의해 변수 선언부가 스코프 상단으로 끌어올려진다.
    // 변수가 선언됐지만 아직 초기화 구문을 만나지 않았다.
    // 그러므로 아래 test = '456';에서 할당이 이뤄지기 전까지 TDZ구간이 형성된다.
    console.log(test); // Reference Error 발생! 👈 TDZ 구간에서는 해당 변수를 액세스할 수 없다.
    let test = '456'; // 변수가 할당된 시점부터는 TDZ 상태를 떠나게되고, 변수를 사용할 수 있게 된다.
}
a();
```

## Scope

Scope(스코프, 유효범위)는 참조 대상 식별자(identifier, 변수, 함수의 이름 등)를 찾아내기 위한 규칙이다.

어떤 변수에 접근할 수 있는지를 정의한다.

**종류**

* 전역 스코프

* 지역 스코프
    * 함수 스코프
    
        함수 내부에서 변수를 선언할 경우, 해당 변수는 선언한 함수 내부에서만 사용이 가능하다.
    
    * 블록 스코프
    
        중괄호 `{}` 내부에서 `const` 또는 `let`으로 변수를 선언할 경우, 해당 변수들은 중괄호 블록 내부에서만 사용이 가능하다.

[Scope 더보기(1)](https://poiemaweb.com/js-scope)

[Scope 더보기(2)](https://tyle.io/blog/54)

### Scope Chain(스코프 체인)
식별차를 찾는 일련의 과정 변수가 스코프 안에 선언되지 않았다면, 그 변수를 찾기 위해 부모 스코프로 올라가고, 거기에도 없다면 또 그 부모 스코프에 올라가서 찾는다.

## Lexical Scope
자바스크립트에서는 함수를 어디에 **선언**했는지에 따라 상위 스코프가 결정된다.

다음 예제를 보자.

```js
var x = 1;

function foo(){
    var number = 10;
    bar();
}

function bar(){
    console.log(number);
}

foo(); // ?
bar(); // ?
```

위 예제의 결과 `10`과 `1`이 출력되는 것이 아닌, `1`과 `1`이 출력된다. 자바스크립트는 Lexical Scope를 따르기 때문에 함수의 호출이 아닌 함수의 선언에 따라 상위 스코프가 결정된다. 위 코드에서 `bar()` 함수의 상위 스코프는 전역을 가리키기 때문에 전역 변수인 x값인 `1`이 두번 출력되었음을 알 수 있다. 만약 `bar()` 함수가 `foo()`함수 내에 선언되어있었다면 `bar()`함수의 상위 스코프는 `foo()`함수일 것이다.

> [참고] Dynamic Scope
>
> 함수의 호출에 따라 상위 스코프가 정해지는 것


## Hoisting
- `호이스팅`은 끌어올려진다는 의미 -> 무엇이 끌어올려지나?

변수의 `선언부` 또는 함수가 현재 [스코프](#Scope) 의 최상단으로 끌어올려진다!

- 변수의 경우, 함수내에서 정의되었을 경우엔 선언이 함수의 최상단으로, 함수 바깥에서 정의되었을 경우는 전역 영역의 최상단으로 끌어올려진다.

```js
hoisting();

function hoisting(){
    console.log(x);
    var x = 'hello';
}
```

위 예제를 실행하면 오류가 발생하지 않고 `undefined`가 출력된다. 그 이유는 자바스크립트엔진 내부적으로 위 코드를 다음과 같이 해석하기 때문이다.

```js
hoisting();

function hoisting(){
    var x; // 👈 변수 선언을 끌어올린다.(변수 호이스팅) 이 시점의 var값은 할당 전이고, var의 특성상 선언과 초기화가 동시에 이루어지기 때문에 undefined로 초기화된다.
    console.log(x); // undefined 출력
    x = 'hello'; // 여기서 undefined에서 'hello'로 할당이 이뤄진다.
}
```

**함수 호이스팅**

함수 선언문 방식도 호이스팅된다. (단, 함수 표현식과 new 키워드를 이용한 함수 정의시엔 호이스팅 안됨)

```js
// 함수 선언문의 경우 - 호이스팅, 에러 발생X
hoisting();
function hoisting(){
    console.log(x);
    var x = 'hello';
}

// 함수 표현식의 경우 - 호이스팅X, 에러 발생
var hoisting = function(){
    console.log(x);
    var x = 'hello';
}

// new 함수 객체 생성 - 호이스팅X, 에러 발생
hoisting();
var hoisting = new Function("", console.log("hello"));
```

## 공부하면서 생긴 궁금증

### Arrow Function(화살표 함수) (ES6 문법)

- 항상 익명이다.

```js
// 일반 함수
var foo = function(){ console.log("foo") };

// 화살표 함수
var bar = () => console.log("bar"); // 매개변수가 없는 경우
```

[화살표 함수 더보기(1)](https://velog.io/@ki_blank/JavaScript-%ED%99%94%EC%82%B4%ED%91%9C-%ED%95%A8%EC%88%98Arrow-function)

[화살표 함수 더보기(2)](https://www.w3schools.com/js/js_function_definition.asp)


### 즉시 실행 함수
함수를 정의하고 바로 실행하는 방식

- 기본 형태

```js
(function () {
    // statements
})()
```

[즉시 실행 함수 더보기](https://beomy.tistory.com/9)


### 콜백 함수
추가 예정


### this
추가 예정


## 참고 자료
- let, const란? 그리고 왜 써야만 하는가?(ES6)
<https://happycording.tistory.com/entry/let-const-%EB%9E%80-%EC%99%9C-%EC%8D%A8%EC%95%BC%EB%A7%8C-%ED%95%98%EB%8A%94%EA%B0%80-ES6>

- let과 const는 호이스팅될까?
<https://medium.com/korbit-engineering/let%EA%B3%BC-const%EB%8A%94-%ED%98%B8%EC%9D%B4%EC%8A%A4%ED%8C%85-%EB%90%A0%EA%B9%8C-72fcf2fac365>

- Hoisting
<https://velog.io/@marcus/Javascript-Hoisting>

- Scope와 Hoisting을 알아보자
<https://web-front-end.tistory.com/23>

- var를 사용할 때 발생하는 문제들
<https://www.daleseo.com/js-var-issues/>

- Lexical Scope
<https://medium.com/@yeon22/javascript-lexical-scope-static-scope-and-dynamic-scope-c4a9e941fab3>

- 호이스팅, TDZ
<https://thisblogbusy.tistory.com/entry/Hoisting>
<https://nenara.tistory.com/86>

- Scope chain이란?
<https://web-front-end.tistory.com/23>