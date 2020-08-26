# STEP 5

💡질의응답은 <https://github.com/pul8219/TIL> `Issues` 탭의 알맞은 step 이슈안에 남겨주세요.

- 작성자: 박유림/pul8219

- 스터디 주제: FrontEnd 면접 스터디 <https://gitlab.com/siots-study/topics/-/wikis/%EC%8B%AC%ED%99%941>

- 공부 범위: [Iterable](https://gitlab.com/siots-study/topics/-/wikis/Iterable) 
    - Iteration protocol
    - Iterable의 사용
    - Generator 함수
    
- 기한: 8/8(토) ~ 8/11(화)

- 보충 필요

    - ES6 = ECMAScript 2015(ES2015)? (O)
    - prototype chain
    <https://victorydntmd.tistory.com/52>

    - `=>` 와 `<=` 의 의미
    - `프로퍼티명: () => {}` 의미
    - `${}`
    
# Javascript

## 목차

- [Iteration](#Iteration(이터레이션))

- [Generator 함수](#Generator-함수)

- [Q&A](#Q&A)

- [Reference](#Reference)


---
**공부 덜 한듯??**

## Iteration(이터레이션)
'반복'을 의미하며 for, while등의 문법을 Iteration이라고 한다.(for, do while, while, for in, for of, ...)

### Iteration protocol
Iteration과 관련된 규약으로 ES6에서 추가되었다. **Iterable protocol**과 **Iterator protocol**이 있다. 이 두 프로토콜을 모두 만족해야만 해당 객체가 Iteration을 수행할 수 있다.

### Iterable(이터러블)
- 순회 가능한 자료 구조를 의미
- Iterable은 반복 가능한 객체(Iterable object)를 말한다. Iterable 객체는 Symbol.iterator라는 Symbol 타입의 값을 속성으로 가진다. 배열은 대표적인 iterable 객체이다. 어떤 객체가 반복가능한 객체일 경우 해당 객체는 iterable protocol을 만족한다고 말한다.

> `Symbol.iterator` : 인자가 없는 함수로 iterator protocol을 따르는 객체를 반환하는 함수이다.

```js
    let arr = [1,2,3];
    console.log(arr[Symbol.iterator]()); // 출력결과: Array Iterator
```


**Iterable 객체(반복 가능한 객체)**

- 배열(Array)
- 문자열(String)
- Map
- Set

**Iterable의 사용**

- `for ... of` 구문을 사용할 수 있다.

```js
for (variable of iterable){
    statements
}
```
variable엔 변수가, iterable엔 iterable 객체가 와야한다.

```js
let a = 'hello';
for(let value of a){
    console.log(value);
}
```

위 코드 출력결과: 
```js
h
e
l
l
o
```

- spread 연산자 `...` 를 사용할 수 있다

```js
let someString = 'hi';

// spread 연산자 사용
console.log([...someString]); // ["h", "i"]
```

### Iterator(이터레이터)

**Iterator protocol**
반복 가능한 객체를 순서에 따라(시퀀스대로) 처리하는 프로토콜이다.

iterator 객체는 iterator protocol을 따르는 객체를 의미하며 해당 객체에는 next 메서드가 존재하고 그 메서드는 done과 value 속성을 가지는 객체를 반환한다.

> `done` 속성: iterator가 다음 순서의 값을 순회할 수 있을 때 done 속성은 false값을 갖는다. 아닌 경우는 true 값을 갖는다.
>
> `value` 속성:
>
>

```js
let someString = 'hi';
let iterator = someString[Symbol.iterator]();

console.log(iterator.next()); // { value: "h", done: false}
console.log(iterator.next()); // { value: "i", done: false}
console.log(iterator.next()); // { value: undefined, done: true}
```

---

## Generator 함수

우리가 직접 Iterable한 객체를 만들 수는 없을까?

Iteration Protocol을 구현하면 어떤 객체든 Iterable이 될 수 있다.

Iterable한 객체를 구현하는 방법은 ES2015에 도입된 **Generator 함수**를 사용하는 것이다.

Generator 함수는 iterable 객체를 반환하는 특별한 형태의 함수이다. 이때 반환되는 iterable 객체를 Generator라고 한다.

### Generator 함수 정의 방법

일반함수와 달리, function의 우측에 *를 표시한다.

```js
// 함수 선언문을 이용하여 generator 함수를 정의
function* gen(){
    // ...
}

// 함수 표현식을 이용하여 generator 함수를 정의
const gen = function*{
    // ...
}

```

Generator 함수를 호출하면 iterable 객체가 반환되고 이 객체는 iterable protocol을 만족한다. 따라서 위에서 언급한 `Symbol.iterator` 속성을 갖게된다.

```js
function* gen1(){ // Generator 함수 정의
    yield 1;
    yield 2;
    yield 3;
}

const iter = gen1(); // 위에서 정의한 Generator 함수 호출, iterable 객체가 반환된다.

console.log(iter[Symbol.iterator]); // Symbol.iterator 속성을 출력하여 확인
//결과: [Function]
```

Generator 함수 내에서는 `yield`라는 특별한 키워드를 사용할 수 있다. `yield`는 Generator 함수 실행을 정지시키는 역할을 하며 iterable 기능을 사용할 때 `yield` 키워드 뒤에 있는 값들을 순서대로 넘겨준다.

Generator 함수를 이용해 iterable 객체를 만들고 iterator 기능을 통해 `next()` 메서드를 호출하여 객체를 순회하게 되면 동작 방식은 다음과 같다.
Generator 함수를 실행하다가 `yield` 구문까지만 실행하고 종료한다.
`next()` 메서드를 재호출할 경우 마지막 `yield` 지점에서 시작한다.

```js
function* gen1(end){
    let index = 0;

    while(index < end){
        yield index++;
    }
}

const iter = gen1(7);

console.log(iter.next()); // {value: 0, done: false}
console.log(iter.next()); // {value: 1, done: false}
console.log(iter.next()); // {value: 2, done: false}
console.log(iter.next()); // {value: 3, done: false}
console.log(iter.next()); // {value: 4, done: false}
console.log(iter.next()); // {value: 5, done: false}
console.log(iter.next()); // {value: 6, done: false}
console.log(iter.next()); // {value: undefined, done: true}
```

### Generator 함수 사용시 주의할 점

- Generator 함수로부터 생성된 iterable 객체는 한 번만 사용될 수 있다.
- Generator 함수 내부에서 정의된 일반 함수에서는 `yield` 키워드를 사용할 수 없다.

---

## Q&A

### 팀원들의 스터디 결과물

은영
<https://eyabc.github.io/Doc/dev/core-javascript/Iteration%20%ED%94%84%EB%A1%9C%ED%86%A0%EC%BD%9C.html#reference>

정웅
<https://jeongshin.github.io/JeongShin_Blog/TIL/study/JavaScript.html#step-5>

형욱
<https://github.com/khw970421/js-interview/blob/master/const/project5.js>

노원
<https://github.com/quavious/hell_script/blob/master/chapter5.js>

유림


### by 은영
Q.
generator 함수를 호출할 때마다 iterator 가 만들어 진다.
하지만 generator 는 iterable 이 아닌데 iterator 객체를 반환 할 줄 안다.
for..of 를 쓸 수 없다.
하지만 generator 가 반환한 iterator 객체는 iterable 이기도 하다.
for..of 을 쓸 수 있다.

`Generator 함수는 iterable 객체를 반환하는 특별한 형태의 함수이다.` ,
`Generator 함수를 호출하면 iterable 객체가 반환되고`

A.
이터러블한 객체라는 것은 Symbol.iterator 속성을 가지고 있어 이터러블 프로토콜을 만족하는 반복 가능한 객체를 의미
이터레이터 객체라는 것은 이터레이터 프로토콜을 구현한 객체를 말하며 value, done 속성을 가진 객체를 리턴하는 next() 메소드를 가지고 있다.
이터러블 객체는 symbol.iterator 속성을 가지고 있다. 이를 호출하면 이터레이터 오브젝트를 생성하여 반환한다. 이터레이터 객체이니 next() 메소드를 사용할 수 있다(?)

### to 은영
Q. 이터레이터랑 이터러블을 제가 좀 요상하게(?) 이해하고 있던 것 같습니다. 은영님 글 보고 제가 이해한 것이 맞는지 궁금하여 남깁니다. 아래 문장이 맞는 말인가요?

이터러블 객체는 symbol.iterator 속성을 가지고 있다. 이를 호출하면 이터레이터 오브젝트를 생성하여 반환한다. 이터레이터 객체이니 next() 메소드를 사용할 수 있다(?)

A. 그렇습니다 iterator 객체의 인터페이스는 next 의 키를 갖고 iterator result object 를 반환하는 것이지요!
   그리고 iterable 객체의 인터페이스는 Symbol.iterater 키를 갖고 값은. Iterator 객체를 반환하는 함수 입니다.

### to 정웅

Q. 잘 읽었습니다. 다만 아래 부분에서요! 궁금한 게 있는데요,

`또한 속성 값이 동일 또는 유사한 객체들은 같은 Iterator 로 순회 할 수 있다.`

그러면 속성값이 비슷하지만 달라도 같은 iterator로 순회할 수 있는 건가요?...

+++ 에고 제가 잘못이해했네요
속성명이랑 헷갈렸어요. 같은 iterator로 순회하려면 속성명은 같아야하는거죠?

A.
@pul8219
네 동일한 속성을 공통적으로 가진 객체라면 같은 iterator 로 순회가 가능할 듯 하네요,,

```
const obj1 = { 'a' : 1 , 'b' : 2 }
const obj2 = { 'a' : 3, 'b' : 4, 'c' : 6 }
```
이라 가정하면 obj1, obj2 는 a, b 속성에 한하여 공통적인 속성을 가지기 때문에 인자로 전달하여 가능할 듯해요

사용해본적이 없어서 정확히는 모르겠네요 ㅠ

### to 형욱

정리하신 것 내부의 코드 보고 js 문법 찾아보는 기회가 됐습니다. 잘 읽었습니다.


---

## Reference

[스터디의 전반적인 틀](https://gitlab.com/siots-study/topics/-/wikis/Iterable)

Iteration 관련

- [iterable, iterator](https://jongbeom-dev.tistory.com/139)

- [Iterable](https://helloworldjavascript.net/pages/260-iteration.html)

- [Iteration protocols - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols)

- [for in와 for of 비교 - Iteration](https://victorydntmd.tistory.com/89)

- [iterables와 iterator 이해하기](https://wonism.github.io/javascript-iteration-protocol/)

Genarator 관련

- [Generator, MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator)

- [Generator 함수](https://helloworldjavascript.net/pages/260-iteration.html)

- [Iterators and generators, MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators)

- [generator](https://jongbeom-dev.tistory.com/140?category=863255)

- [yield, MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield)

- [Generator와 Yield](https://kamang-it.tistory.com/entry/JavaScript-16Generator%EC%99%80-Yield)


