// ✨ 드림코딩 엘리 5강 Arrow function, 함수의 선언과 표현

// 자바스크립트 5. Arrow Function은 무엇인가? 함수의 선언과 표현 | 프론트엔드 개발자 입문편(JavaScript ES6)

// 우리가 사용하고 있는 프로그램들은 각각 저마다의 고유한 기능을 가지고 있는데 그 기능은 함수에 의해 실행됨! 그래서 프로그램에서 함수가 중요! 그래서 함수를 서브프로그램으로 볼 수도 있음

// 함수는 대체적으로 인풋(파라미터)을 받아 이것들을 잘 처리한 다음 아웃풋으로 리턴함

// 언어 자체에 존재하는 함수나 API(Application Programming Interface)를 쓸 때 함수의 이름을 보고 함수가 이런 일을 하는구나 유추 가능, 어떤 값이 리턴되겠구나 기대 가능. -> 인풋, 아웃풋, 함수명 중요!

// 1. Function declaration 함수 정의
// function name(param1, param2){ body... return; }
// one function === one thing 하나의 함수는 한 가지의 일만 하도록 작성하자
// naming: doSomething, command, verb
// 함수명을 짓기 힘들면 함수 안에서 너무 많은 것을 하고 있진 않은지 살펴보기
// e.g. createCardAndPoint -> createCard, createPoint
// function is object in JS | 자바스크립트에서 함수는 객체이다 -> 변수에 할당할 수 있고 파라미터로 전달되고 함수를 리턴도 가능

// 자바스크립트에선 타입이 없음
// 함수자체를 봤을 때 파라미터를 어떤 타입으로 전달해야하는지 명확하지 않음. 
// 타입이 중요한 경우, 자바스크립트는 조금 난해할 수 있음
// 현업에 가면 typescript나 다양한 언어들 쓸거자녀
// 맛보기로 typescript 소개할 것!
// TypeScript 홈페이지에 Playground 가면 TypeScript 코드 작성하면 JS로 변환되서 오른쪽에 나타내줌
// TypeScript에서는 파라미터와 리턴값의 타입값을 명시해야함
// 규모 있는 프로젝트나 현업에서 다양한 개발자들과 일을 하거나 우리가 작성한 것을 라이브러리형태로 API로 제공해야될 때 TypeScript를 쓰는게 더 명확하고 개발일을 더 쉽게 만들어줌 // 함수가 무슨 일을 하는지. 함수명, 전달되어야하는 파라미터와 그 데이터타입, 어떤값이 리턴되는지를 확실하게 확인할 수 있기 때문

// 2. Parameters
// premitive parameter(원시 타입): passed by value
// object(객체): passed by reference // object는 메모리에는 object가 만들어진 reference가 들어가게되고 이 ref는 name: ellie 데이터가 담긴 걸 가리키고 있음 
function changeName(obj){
    obj.name = 'coder';
}

const ellie = { name: 'ellie' };
changeName(ellie);
console.log(ellie); // { name: "coder" }로 변경된 것을 볼 수 있음

// 3. Default parameters (added in ES6)
function showMessage(message, from){
    console.log(`${message} by ${from}`);
}
showMessage('Hi!'); // Hi by undefined // from을 파라미터로 주지 않았기 때문에 undefined로 출력됨

function showMessage(message, from = 'unknown'){
    console.log(`${message} by ${from}`);
}
showMessage('Hi!'); // Hi by unknown // 위와 같이 코드를 작성하면 사용자가 파라미터를 전달하지 않았을 때 이렇게 작성한 것으로 파라미터가 대체됨(default로 파라미터를 지정가능)

// 4. Rest parameters (added in ES6)
// ...args 부분
// 배열 형태로 전달
function printAll(...args){
    for(let i = 0; i < args.length; i++){
        console.log(args[i]);
    }

    // 배열 출력시 팁
    // for of 사용
    // args에 있는 값들이 하나씩 arg에 담기면서 실행됨
    for (const arg of args){
        console.log(arg);
    }

    // 더~ 간단한 방법
    args.forEach((arg) => console.log(arg));
    // 배열에 forEach라는 함수형언어를 이용해 출력할 수도 있음 -> 배열에서 자세히 학습할 것
}
printAll('copy', 'and', 'paste');
// 이 3개의 인자가 ...args에 전달되는데 args는 이 3개의 값이 담긴 배열이됨
// 아직 배열을 배우기 전이지만 이런게 있다 알기!

// +
// function 은 object이다.
// console에서 선언한 함수명을 치고 .(dot)을 눌러보면 함수가 object인걸 알 수 있음. 속성값이 쭈루룩 나옴! -> object, prototype 다룰 때 자세히 배울 것


// 5. Local scope
// 지난 시간에 block 레벨의 스코프와 global 레벨의 스코프를 배웠음
// 나중에 자바스크립트 심화 내용 배울 때 클로저, Lexical scope 배우게 될텐데 이것들은 이 원칙을 상세하게 설명해주는 것들이고 사실은 딱 하나의 개념에서 파생된 애들임.
// 자바스크립트의 스코프 관련, 다음 문장을 꼭 기억할 것

// 밖에서는 안이 보이지 않고 안에서만 밖을 볼 수 있다. ⭐

let globalMessage = 'global'; // global variable
function printMessage(){
    let message = 'hello'; // 지역 변수!
    console.log(message); // local variable
    console.log(globalMessage);

    function printAnother(){
        console.log(message); // 부모 function의 변수 출력 가능 // 안에서는 밖이 보이니까!
        let childMessage = 'hello';
    }
    //console.log(childMessage); // 에러 발생 // 밖에서는 안을 볼 수 없다!
}
printMessage();
//console.log(message); //지역 변수를 밖에서 출력하려고하면 에러가 발생할 것

// 부모 함수에 정의된 변수들을 접근 가능한 것들이 클로저래 -> 나중에 자세히 배울 것


// 6. Return a value

// 리턴하는게 없는 함수는 return undefined;가 생략되어있는것과 마찬가지래
function sum(a,b){
    return a+b;
}
const result = sum(1,2); //3
console.log(`sum: ${sum(1,2)}`);


// 7. Early return, early exit
// 실무에서 early return, early exit해! 라는 지적을 받을 수 있을거임
// 아래 예시를 보면서 무슨 말인지 이해해보자

// bad
// 10 초과일때만 업그레이드를 진행하는 이런 코드가 있는데 // 이렇게 ~일 때에 블록안에서 많은 로직을 작성하면 가독성이 떨어진대
function upgradeUser(user){
    if(user.point > 10){
        // long upgrade logic ...
    }
}

// good
// if와 else를 번갈아 쓰는 것보다는 다음과 같이 코드를 변경
function upgradeUser(user){
    if(user.point <= 10){
        return;
    }
    // long upgrade logic...
}
// 이런식으로 조건이 맞지 않을 때는 빨리 리턴을 해서 함수를 종료하고 조건이 맞을 때만 필요한 로직들을 쭉 실행하는 것이 더 좋음


// =========================================


// 지금까지는 function 선언관련해서 알아봤고 이제 function expression을 공부할 것

// First-class function 일급 어쩌구~
// function are treated like any other variable
// ⭐ can be assigned as a value to variable // 함수는 변수에 할당할 수 있고
// ⭐ can be passed as an argument to other funtions // 다른 함수에 파라미터로 전달도 가능하며
// ⭐ can be returned by another function // 리턴값으로도 리턴이 된다는 것

// 1. Function expression(함수 표현식?)
// a function declaration(아까 배운 함수 선언 방식) can be called earlier than it is defined.(hoisted)
// 호이스팅이 되기 때문에 함수가 선언되기 이전에 호출해도 된다는 것 // js엔진이 선언된 것을 제일 위로 올려주기 때문 -> 나중에 더 자세히 배울 것

// a function expression is created when the execution reaches it.
// 할당된 다음부터 호출이 가능 // 할당 전에 print()이렇게 호출하면 에러뜰 것

// 이렇게 함수에 이름이 없는 것을
// anonymous function 이라고 함(익명 함수)
// 이름이 있는 함수는 named function(뒤에서 자세히 정리할 것)
const print = function(){ // anonymous function // 이렇게 함수를 변수에 할당 가능
    console.log('print');
};
print(); // 함수를 호출하듯 print에 ()붙여 호출
const printAgain = print; // 또 다른 변수에 할당. printAgain은 위의 function을 가리키고 있기 때문에 아래처럼 또 호출 가능하다. 
printAgain();
const sumAgain = sum; // 아까 위에서 sum이라는 함수를 만들었잖어 그걸 쓸 수도 있음
console.log(sumAgain(1,3));


// 2. Callback function using function expression
// 이 함수는 정답과 정답이 맞을 때 호출하게될 함수와 정답이 틀릴 때 호출하게될 함수를 전달하고 있음(함수는 function expression으로 전달하고 있음)
// 이렇게 함수를 전달해서 야! 상황에 맞으면, 원하면 전달된 함수를 불러~ 라며 전달하는 것을 콜백함수라고함
// 2가지의 콜백함수가 파라미터로 전달되고 있음
function randomQuiz(answer, printYes, printNo){
    if (answer === 'love you'){ // 정답이면
        printYes(); // printYes라는 콜백함수를 호출하고
    }
    else{ // 정답이 아니면
        printNo(); // printNo라는 콜백함수를 호출해라
    }
}

const printYes = function(){
    console.log('yes');
};

// named function
// better debugging in debugger's stack traces
// recursions
// 이렇게 function expression에 named function을 쓰는 건, 디버깅 시 스택 trace에 함수 이름이 나오게 하기 위해서 쓰는 것
// 또는 함수 안에서 자신 스스로를 호출할 때 씀(recursions) 재귀함수 -> 피보나치 수를 계산한다던지 반복되는 평균값을 계산한다던지 하는 경우에 쓰일 수 있음 // 함수를 무한대로 호출하다보면 콜스택이 꽉 찼다고 에러가 발생함. 콜스택에 대해서도 나중에 자세히 공부할 것
const printNo = function print(){
    console.log('no');
};
randomQuiz('wrong', printYes, printNo);
randomQuiz('love you', printYes, printNo);


// ✨ Arrow function(화살표 함수)
// 함수를 간결하게 만들어주는 너무 좋은 친구!
// always anonymous // 항상 익명!

// 보통 쓰던 방식
// function 키워드도 써야하고~ {} 블록도 명시해줘야함
const simplePrint = function(){
    console.log('simplePrint!');
};

// 화살표 함수 적용
const simplePrint = () => console.log('simplePrint!');
const add = (a, b) => a + b; // a, b를 받아서 더한걸 리턴. 아까 썼던 sum 함수보다 왕왕 간단하지?!

// 만약 라인 한 줄이 아니라 복잡한 코드를 써야한다면, 블록을 넣어서 처리. 대신 블록을 쓰게 되면 return 키워드를 써야함
const simpleMultiply = (a, b) => {
    return a * b;
};


// IIFE: Immediately Invoked Function Expression
function hello(){
    console.log('IIFE');
}
hello();
// 이렇게 호출하는 것이 아니라
// 함수 선언과 동시에 호출하려면 다음과같이 함수를 ()로 감싸고 ();를 뒤에 붙여주면 됨
(function hello(){
    console.log('IIFE');
})();
// 요즘 자주 쓰이지는 않지만 함수를 바로 호출하고 싶을 때 유용한 친구

// Fun quiz time❤️
// function calculate(command, a, b)
// command: add, substract, divide, multiply, remainder
// 입력받은 커맨드에 따라 a,b의 숫자값을 더하거나 빼거나하는!
// 다른 커맨드가 들어오면 그걸 어떻게 처리할지 퀴즈를 풀어봐