// 이전에 사용하던 생성자 함수 방식
// 관례상 생성자 함수의 첫 문자는 대문자로 표기!

/*
function Book(title, writer){
	this.title = title;
	this.writer = writer;
}

var book1 = new Book("발칸반도", "여행가");
var book2 = new Book("쇼코의 미소", "최은영");

console.log(book1.title + "-" + book1.writer);
console.log(book2.title + "-" + book2.writer);

*/


// ----

// // 클래스 블록에서는 별도의 문법으로 코드를 작성해야한다. 함수 혹은 객체 내부에서 사용하는 문법과 헷갈리지 않도록 주의할 것
// class Person{
// 	console.log('hello');
// }
// // 에러: Unexpected token

// class Person{
// 	name: "nana",
// 	email: "1234@naver.com"
// }
// // 에러: Unexpected token

// ----

// // Class 정의 방법 - 1. 클래스 선언식
// class Book(){
// 	constructor(title, writer){
// 		this.title = title;
// 		this.writer = writer;
// 	}
// }

// ----

// // Class 정의 방법 - 2. 클래스 표현식
// // 익명(unnamed) 클래스 선언 예시
// let Book = class {
// 	constructor(title, writer){
// 		this.title = title;
// 		this.writer = writer;
// 	}
// };

// const book1 = new Book("쇼코의 미소", "최은영");
// console.log(book1.title); // "쇼코의 미소"

// // 이름을 갖는 클래스
// let Book = class Book1{
//     constructor(title, writer){
//     		this.title = title;
//     		this.writer = writer;
//     	}
// };
// console.log(Book.name); //"Book1"

// ----

// // 인스턴스 생성
// class Foo {}
// const foo = new Foo();

// console.log(Foo === Foo.prototype.constructor) //true

//----

// //생성자
// class Foo {} //constructor를 생략하면 constructor() {}가 자동으로 포함된 것처럼 동작한다.

// const foo = new Foo();
// console.log(foo); // Foo {}

// foo.num = 1; // 클래스 프로퍼티의 동적 할당 및 초기화가 가능하다
// console.log(foo); // Foo { num: 1 }

//----

// // Getter, Setter
// class Foo{
// 	constructor(bar){
// 		this.bar = bar;
// 	}
// 	get met(){
// 		return this.bar;
// 	}
// 	set met(newBar){
// 		this.bar = newBar;
// 	}
// }

// let foo = new Foo("hello");
// console.log(foo.bar); // "hello"
// console.log(foo.met); // "hello"
// foo.met = "hi";
// console.log(foo.met); // "hi"

// ----

// // 상속
// class animal{ // 부모 클래스 Animal
// 	static region = "KR";
// 	static jump(){
// 		console.log("jump!");
// 	}
// 	stop(){
// 		console.log("stop");
// 	}
// }

// class cat extends animal{ // 자식 클래스 Cat

// }

// cat.jump(); // "jump!" 자식클래스를 통해 부모클래스의 정적메소드 사용 가능
// console.log(cat.region); // "KR" 자식클래스를 통해 부모클래스의 정적 속성 사용 가능

// let c = new cat();
// c.stop(); // "stop" 자식클래스의 인스턴스를 통해 부모클래스의 인스턴스 메소드와 인스턴스 속성을 사용 가능

// ----


// // super
// class writing{
// 	getMedia(){
// 		return 'book';
// 	}
// }

// class essay extends writing{
// 	getMedia(){
// 		return super.getMedia() + ' or brunch';
// 	}
// }

// let e = new essay();
// console.log(e.getMedia()); // "book or brunch"