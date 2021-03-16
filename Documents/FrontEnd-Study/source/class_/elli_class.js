// class // 연관있는 속성(fields)과 행동(methods)을 묶어놓은 것. (속성만 있는 경우도 있음) 클래스 안에서도 내부적으로 보여지는 변수와 밖에서 보일 수 있는 변수를 나누어 캡슐화. class 이용 상속과 다형성 나타날 수 있음. 이런 모든 것이 가능한게 객체지향언어.
// 일상에 있는 것들을 class로 어떻게 만들 수 있을지 생각해봐 // 쇼핑몰을 만들거나 수강신청 프로그램을 만들 때 어떻게 클래스로 잘 정의할 수 있을지 생각해봐

// 클래스는 붕어빵을 만들 수 있는 틀! 클래스자체에는 데이터가 들어있지 않고 틀만, template만 정의해놓는거다. 템플릿을 정의해놓고 한번만 정의!
// 실제로 클래스를 이용해 실제 데이터를 넣어 만드는 것이 object! 클래스를 이용해 새로운 인스턴스를 생성하면 오브젝트가 되는거지. 얘는 실제로 데이터를 넣었기 때문에 메모리에 올라감

// ======================================

// 오늘은 클래스에 집중해 공부할 것!

// Object-oriented programming

// class: template
// object: instance of a class

// JavaScript classes
//  - introduced in ES6
//  - syntactical sugar over prototype-based inheritance
// 기존에 존재하던 프로토타입을 베이스로 그 위에 간편하게 쓸 수 있는 문법으로만 클래스가 추가된것임. 이걸 syntatical sugar 라고 함. 이런 사항은 언어 구현 사항 디테일. 이걸 자세히 이해하려면 프로토타입을 배워야하는데 다음에 배울 것

// 자바스크립트는 ES6에서 class 개념이 추가되었음. 그럼 클래스가 없었을 땐 뭘로 만들었나요? 객체지향언어가 아니었나요? => 클래스 정의하지 않고 바로 object 만들 수 있었음. object 만들 때 function 이용해 템플릿을 만드는 방법이 있었는데 이건 다음 시간에 알아볼 것


'use strict';


// 1. Class declarations
// 클래스 선언
class Person{
    //constructor
    constructor(name, age){
        //fields
        this.name = name;
        this.age = age;
    }

    //methods
    speak(){
        console.log(`${this.name}: hello!`);
    }
}

// object를 만들 때 사용하는 키워드 new
const ellie = new Person('ellie', 20);
console.log(ellie.name);
console.log(ellie.age);
ellie.speak();
// this 생성된 오브젝트를 나타내는 것과 같음

// 2. Getter and Setters
// 여기서 엘리님이 커피자판기 예시를 통해 설명하신 객체지향에서의 캡슐화와 Getter setter 얘기 이해가 쏙쏙 잘된다.(다시 듣기⭐)

// 나이가 음수가 될 수 없음. 맘대로 이렇게 값을 바꾸는걸 방지하기 위해 getter 로 받아오고 setter로 설정하는 것

// 콜스택 에러가 나는 이유?
//  age라는 getter 정의하는 순간 this.age 에서 메모리에 올라간걸 읽어오는 것이 아니라 getter를 호출하게됨
// setter를 정의하는 순간 this.age = age; 에서 바로 메모리에 값을 할당하는 게 아니라 setter를 호출하게됨. 그럼 this.age = value; 에서도 setter를 호출하게 되고 이게 무한 반복됨 그래서 콜스택오류나는것
// 해결을 위해 getter setter에 age의 변수명을 _age 이런식으로 바꿔주면 해결됨

class User{
    constructor(firstName, lastName, age){
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }

    get age(){
        return this._age;
    }
    set age(value){
        // if (value < 0){
        //     throw Error('age can not be negative');
        // }
        this._age = value < 0 ? 0 : value;
    }
    
    
}

const user1 = new User('Lim', 'Kim', -1);
console.log(user1.age);


// 3. Field(public, private)
// 추가된지 정말 얼마 안 된 문법! Too soon!
// 최신브라우저에서 지원하지 않음. 사파리에서도 동작 안 한대. Babel을 이용해야 쓸 수 있음 // 쓰기엔 좀 이른듯!
class Experiment{
    publicField = 2; // public

    // 클래스 내부에서만 값이 보여지고 (접근되고) 변경 가능 // 클래스 외부에서는 값을 읽거나 변경할 수 없음.
    #privateField = 0;
}

const experiment = new Experiment();
console.log(experiment.publicField);
console.log(experiment.privateField);


// 4. Static properties and methods
// Too soon! // 알아만 두기
// class 기반으로 object를 만들게되면 class에 정의한 틀의 복제본이 만들어지는 것과 같음. 그런데 간혹 object에 상관없이 클래스가 가진 고유한 값이나 동일하게 사용되는 메소드가 있을 수 있겠지 그걸 static 붙여 만들면 클래스 자체에 연결된(붙은) 게 됨
// 타입스크립트에도 많이 쓰임
// 들어오는 데이터에 상관없이 공통적으로 쓸 수 있는거면 이거 사용해서 작성하는게 좋겠지. 메모리 사용을 줄여줄 수 있을 것!

class Article{
    static publisher = 'Dream Coding';
    constructor(articleNumber){
        this.articleNumber = articleNumber;
    }

    static printPublisher(){
        console.log(Article.publisher);
    }
}

const article1 = new Article(1);
const article2 = new Article(2);

console.log(article1.publisher); // publisher에 static이 붙지 않았다면 출력됐겠지만 결과는 undefined가 나올 것
console.log(Article.publisher); // 클래스에 연결된 속성이기 때문에 클래스 이름으로 접근해야함
Article.printPublisher();


// 상속 & 다형성
// 동그라미 세모 네모를 다 따로 만드는 것보다 Shape이라는 클래스를 만들고 이를 상속하는 게 좋을 것
// 5. Inheritance
// a way for one class to extend another class.

class Shape{
    constructor(width, height, color){
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw(){
        console.log(`drawing ${this.color} color of`);
    }
    getArea(){
        return this.width * this.height;
    }
}

// extends 상속
class Rectangle extends Shape{}
class Triangle extends Shape{
    // 다형성
    getArea(){ // 재정의 -> 오버라이딩
        return (this.width * this.height) / 2;
    }

    draw(){
        super.draw(); // 부모 것도 쓰고 싶다면? 이렇게 super 쓰면됨
        console.log('🔺');
    }
}

const rectangle = new Rectangle(20, 20, 'blue');
rectangle.draw();
console.log(rectangle.getArea());

const triangle = new Triangle(20, 20, 'red');
triangle.draw();
console.log(triangle.getArea());


// 6. Class checking: instanceof
console.log(rectangle instanceof Rectangle); // 뒤에 오는 클래스에 의해 만들어진 것이 맞는지 알아내기 위해 사용하는 operator! // true
console.log(triangle instanceof Rectangle);
console.log(triangle instanceof Triangle);
console.log(triangle instanceof Shape); // Shape를 상속한 클래스에서 만들어진 object이기 때문에 이것도 true
console.log(triangle instanceof Object);
// 자바스크립트의 모든 객체나 클래스는 최상위 조상인 Object를 상속한 것이다. 그렇기에 결과는 true!
// Object에 Ctrl+클릭 해보면 자세히 알 수 있음
// 어떤 오브젝트이던지 toString() 메소드를 쓸 수 있는거지. (이런 toString() 메소드도 오버라이딩 가능)

// 사이트 추천 MDN
// 자바스크립트 내부 object를 보여줌
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference

// 백엔드에서 데이터를 비동기적으로 받아올 수 있는 promise도 있는 걸 볼 수 있음

// this, binding, closure 는 나중에 따로 배울 것

// 강의5에서 냈던 숙제 체크