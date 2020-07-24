# STEP 3

* 스터디 주제: FrontEnd <https://gitlab.com/siots-study/topics/-/wikis/%EC%8B%AC%ED%99%941>

* 공부 범위: `심화1` this ~ 화살표 함수

* 보충 필요

엄격모드? 비엄격모드?
자바스크립트에서 객체 선언 방법
inner

# Javascript

## 목차

* [this](#this)


* [Reference](#Reference)



## this

- 실행 컨텍스트가 활성화될 때 실행 컨텍스트의 `thisBinding`에 this가 가리키는 객체가 저장된다.

- 대부분의 경우, 함수를 호출할 때 this가 결정된다.(상황에 따라 this가 달라짐)

### 1. 전역 공간에서의 this

```js
브라우저에서 전역객체는 window 객체이다.
console.log(this === window); // true

var a = "js"
console.log(a, window.a, this.a); // "js" "js" "js"

this.b = "ES6"
console.log(b, window.b, this.b); // "ES6" "ES6" "ES6"

```

### 2. 메서드 호출시 메서드 내부에서의 this

#### [참고] 함수 vs 메서드
어떤 함수를 실행하는 방법은 여러 가지가 있는데, 대표적인 방법은 함수로서 호출하는 경우와 메서드로서 호출하는 경우이다.

```js
var func = function (x){
    console.log(this, x);
};
func(1) // Window { ... } 1 => 함수로서 호출됨

var obj = {
    method: func  // obj 객체의 method 프로퍼티에 앞에서 만든 func 함수를 할당
};
obj.method(1); // { method: f } 1 => 메서드로서 호출됨
obj['method'](2); // { method: f } 2 => 메서드로서 호출됨
```


#### 2-1. 메서드 내부에서의 this

- 해당 메서드를 호출한 객체

```js
var obj = {
		methodA: function(){console.log(this);},
		inner: {
			methodB: function(){console.log(this);}
		}
	}
	obj.methodA(); // {inner: {…}, methodA: ƒ}  (=== obj)
	obj['methodA'](); //{inner: {…}, methodA: ƒ} (=== obj)

	obj.inner.methodB(); //{methodB: ƒ} (=== obj.inner)
	obj.inner['methodB'](); //{methodB: ƒ} (=== obj.inner)
```


#### 2-2 함수 호출시 함수 내부에서의 this

##### 2-2-1. 함수 내부에서의 this
전역 객체를 가리킨다.

##### 2-2-2. 메서드의 내부함수에서의 this
```js
var obj1 = {
		outer: function(){
			console.log(this); // (1)
			var innerFunc = function(){
				console.log(this); //(2) (3)
			}
			innerFunc();


			var obj2 = {
				innerMethod: innerFunc
			};

			obj2.innerMethod();
		}
	};
	obj1.outer();

//결과
// (1) obj1 => this는 메서드를 호출한 객체 obj를 가리킨다.
// innerFunc(); 실행시 (2) window => innerFunc(); 함수로서 호출했기 때문에 this가 지정되지 않고 자동으로 스코프 체인상 최상위 객체인 전역객체(window)가 바인딩됨
// obj2.innerMethod(); 실행시 (3) obj2 => this는 메서드를 호출한 객체 obj2를 가리킨다.
```
(2)는 outer 메서드 내부의 함수를 함수로서 호출했고, (3)은 같은 함수를 메서드로서 호출했다.(obj2.innerMethod() 이런식으로 객체로 메서드를 호출했기 때문)


### 생성자 함수 내부에서의 this

new 명령어와 함께 함수를 호출하면 해당 함수는 생성자로서 동작
이 경우, 해당 함수 내부에서의 this는 곧 만들 인스턴스 자신이 된다

> **생성자**
> 구체적인 인스턴스를 만들기 위한 '틀' (프로그래밍적인 의미)

```js
var Dog = function(name, age){
	this.bark = '멍멍';
	this.name = name;
	this.age = age;
};
var choco = new Dog('초코', 7);
var cogi = new Dog('코기',5);
console.log(choco, cogi); // choco 인스턴스, cogi 인스턴스가 각각 출력된다.
```


## 명시적으로 this를 바인딩하는 방법

bind, apply, call

내용 추가 필요

## 화살표 함수
this를 바인딩하지 않는 화살표 함수 (ES6에서 추가)
화살표 함수는 실행 컨텍스트를 생성할 때 this 바인딩 과정 자체가 빠지기 때문에 상위 스코프의 this를 그대로 활용 가능

```js
var obj1 = {
		outer: function(){
			console.log(this); // (1)
			var innerFunc = () =>{ // 화살표 함수 사용
				console.log(this); //(2)
			}
			innerFunc();
	};
	obj1.outer();

//결과
// (1) outer
// (2) outer
```



## Reference

- [코어 자바 스크립트](http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=9791158391720&orderClick=LEa&Kc=)


