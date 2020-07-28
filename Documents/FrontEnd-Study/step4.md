# STEP 4

* 스터디 주제: FrontEnd <https://gitlab.com/siots-study/topics/-/wikis/%EC%8B%AC%ED%99%941>

* 공부 범위: `심화1` 

* 보충 필요

    - 외부 함수?

**인터넷 자료마다 깊이에 따라 이해하기가 들쑥날쑥해서 코어자바스크립트 내용에서 이해한 것 중심으로 작성하였습니다.**

# Javascript

## 목차

* [자바스크립트의 함수형 프로그래밍](#자바스크립트의-함수형-프로그래밍)

* [클로저](#클로저)

* [객체 더 알아보기](#객체-더-알아보기)

* [Symbol](#Symbol)


* [Reference](#Reference)

---

## 자바스크립트의 함수형 프로그래밍

### 함수형 프로그래밍이란?

- 순수함수
- 고계함수: 함수를 값으로 간주해 함수의 인자 혹은 반환값으로 사용할 수 있는 함수

### 자바스크립트에서의 함수형 프로그래밍

자바스크립트에서도 다음과 같은 개념?을 지원하기 때문에 함수형 프로그래밍이 가능하다.

- 일급 객체로서의 함수
- 클로저


```
<일급 객체>

여기 x라는 것이 있다.

x를 변수에 담을 수 있다.
x를 매개변수에 넘길 수 있다.
x를 함수에서 반환할 수 있다.
x를 만족할 때, 이를 일급객체라고 한다.

즉, 자바스크립트의 함수는 일급객체이므로

함수를 변수에 담을 수 있다.
함수를 매개변수로 넘길 수 있다.
함수를 함수에서 반환할 수 있다.
위의 같은 조건을 만족한다.
```
출처: 개발자 황준일

### 클로저
이미 실행 컨텍스트가 사라진 외부 함수의 변수를 참조하는 함수를 클로저라고 한다.

```js
function outer func(){
    var x = 1;
    return function(){
        // x와 arguments를 이용한 코드
    }
}

var new_func = outerFunc();

new_func();

```

위 코드는 클로저를 구현하는 전형적인 패턴이다. 외부함수 outerFunc()가 실행되고 그 결과로 함수가 반환된다. 반환된 함수가 클로저이고 이 함수는 외부함수의 변수인 x를 참조하고 있다. outerFunc()의 실행 컨텍스트가 끝났음에도 new_func()에서 새로운 함수는 외부함수의 x를 사용한다. 이는 자바스크립트의 함수가 일급 객체로 취급되기 때문에, 그리고 외부 함수의 컨텍스트가 사라지더라도 변수 객체는 반환되는 함수의 스코프 체인에 그대로 남아있기 때문이다.


---

## 객체 더 알아보기

### 자바스크립트의 객체
* 원시타입(primitive type)을 제외한 모든 값은 객체다. 자바스크립트에서 배열, 함수, 정규표현식 등은 모두 객체이다.
* '이름(key):값(value)' 형태의 프로퍼티들을 저장하는 컨테이너다. `해시(Hash)`라는 자료구조와 유사하다. 객체의 어떤 프로퍼티가 함수를 포함하는 경우 이러한 프로퍼티를 `메서드`라고 부른다.

### 객체 생성 방법

1.Object() 생성자 함수 이용

```js
// Object() 이용, a라는 빈 객체 생성
var a = new Object();

// a 객체의 프로퍼티 생성
a.name = 'a';
a.age = '22';
```

2.객체 리터럴 방식
중괄호({})를 이용해 객체를 생성

```js
var foo = {
    name: 'foo',
    age: 33
};

```

3.생성자 함수 이용

4.new 연산자 이용

```js
const a = new Object();
const b = new Array();
```


## Symbol
원시 타입의 데이터형 중 하나로 객체 프로퍼티에 대한 식별자로 사용될 수 있다. `Symbol`로부터 반환되는 모든 심볼 값은 고유하다. 

```
const symbol1 = Symbol();
const symbol2 = Symbol(42);
const symbol3 = Symbol('foo');

console.log(typeof symbol1);
// "symbol"

console.log(symbol2 === 42);
// false

console.log(symbol3.toString());
// "Symbol(foo)"

console.log(Symbol('foo') === Symbol('foo'));
// false

```

---

## Reference

- 도서 [인사이드 자바스크립트]()

- [개발자 황준일](https://junilhwang.github.io/TIL/Javascript/Execution-Context/)

- [MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Symbol)