# STEP 5

💡질의응답은 <https://github.com/pul8219/TIL> `Issues` 탭의 알맞은 step 이슈안에 남겨주세요.

- 스터디 주제: FrontEnd <https://gitlab.com/siots-study/topics/-/wikis/%EC%8B%AC%ED%99%941>

- 공부 범위: [Iterable](https://gitlab.com/siots-study/topics/-/wikis/Iterable) 
    - Iteration protocol
    - Iterable의 사용
    - Generator 함수
    
- 기한: 8/8(토) ~ 8/11(화)

- 보충 필요

    - ES6 = ECMAScript 2015(ES2015)
    - prototype chain
    <https://victorydntmd.tistory.com/52>

# Javascript

## 목차

- [Iteration](#Iteration(이터레이션))

- [Generator 함수](#Generator-함수)

- [Reference](#Reference)


---

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

- for ... of 구문을 사용할 수 있다.

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
let iterator = someString[Symbol.iterator]();

console.log(iterator.next()); // { value: "h", done: false}
console.log(iterator.next()); // { value: "i", done: false}
console.log(iterator.next()); // { value: undefined, done: true}

// spread 연산자 사용
console.log([...someString]); // ["h", "i"]
```

### Iterator(이터레이터)

**Iterator protocol**
반복 가능한 객체를 순서에 따라(시퀀스대로) 처리하는 프로토콜이다.

iterator 객체는 iterator protocol을 따르는 객체를 의미하며 해당 객체에는 next 메서드가 존재하고 그 메서드는 done과 value 속성을 가지는 객체를 반환한다.

> `done` 속성: iterator가 다음 순서의 값을 순회할 수 있을 때 done 속성은 false값을 갖는다. 아닌 경우는 true 값을 갖는다.
> `value` 속성:
>
>

---

## Generator 함수



---

## Reference

Iteration 관련

- [iterable, iterator](https://jongbeom-dev.tistory.com/139)

- [Iterable](https://helloworldjavascript.net/pages/260-iteration.html)

- [Iteration protocols - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols)

- [for in와 for of 비교 - Iteration](https://victorydntmd.tistory.com/89)

- [iterables와 iterator 이해하기](https://wonism.github.io/javascript-iteration-protocol/)