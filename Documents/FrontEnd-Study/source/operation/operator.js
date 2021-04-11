// ✨ 드림코딩 엘리 4강 operator, if, for loop

// 드림코딩 엘리 유튜브 강의 기반 작성
// 자바스크립트 4. 코딩의 기본 operator, if, for loop 코드리뷰 팁 | 프론트엔드 개발자 입문편 (JavaScript ES6)

// 1. String concatenation

console.log('hello' + 'world');
console.log('1' + 2); // 문자열에 숫자를 더해주면 숫자가 문자열로 변환되어 붙음 // 12

// backtick(`) 사용
// 아래 라인에서 ${}안에 포함된 것을 계산해서 문자열로 포함해줌
console.log(`string literals: 1 + 2 = ${1 + 2}`); // string literals: 1 + 2 = 3

console.log(`string literals: 1 + 2 

= ${1 + 2}`); //줄바꿈도 인식 가능

console.log('yurim\'s \n\tpost') // single quote(')는 특수기호 출력시 \(backslash)를 붙여줘야하며 개행 탭 하고싶을 때 \n, \t 등을 사용해야함


// 2. Numeric operators

// 덧셈, 뺄셈, 곱셈, 나눗셈, 나머지(%)
// exponentiation
console.log(2 ** 3); // 2의 3승

// 3. Increment and decrement operators
let counter = 2;

const preIncrement = ++counter;
// 위 코드를 풀어쓰면 아래와 같다.
// counter = counter + 1;
// preIncrement = counter;
console.log(`preIncrement: ${preIncrement}, counter: ${counter}`); // preIncrement: 3, counter: 3

const postIncrement = counter++;
// 위 코드를 풀어쓰면 아래와 같다.
// postIncrement = counter;
// counter = counter + 1;
console.log(`postIncrement: ${postIncrement}, counter: ${counter}`); // postIncrement: 3, counter: 4

// Decrement도 Increment와 같은 원리

// 4. Assignment operators
let x = 3;
let y = 6;
x += y; // x = x + y;
x -= y;
x *= y;
x /= y;

// 5. Comparison operators
console.log(10 < 6); // less than
console.log(10 <= 6); // less than or equal
console.log(10 > 6); // greater than
console.log(10 >= 6); // greater than or equal

// ⭐ 6. Logical operators: ||(or), &&(and), !(not)

const value1 = true;
const value2 = 4 < 2; // value2값은 false

// || (or)
console.log(`or: ${value1 || value2 || check()}`);
// 중요한 것은 ||(or)는 처음으로 true를 만나면 멈춘다는 것! why? 하나라도 true면 true니까
// value1이 true일 경우 check() 함수의 😱는 출력되지 않는 것을 볼 수 있다.
// 그러므로! 연산이 많고 오래걸리는 친구를(여기선 check()함수에 해당하는 친구를) 식 앞쪽에 넣는 것을 지양해야겠지!

function check(){
    for (let i = 0; i < 10; i++){
        // wasting time...
        console.log('😱');
    }
    return true; // 어쨌든 true를 리턴하는 함수
}

// && (and)
// 모두 true여야 true!
// or와 같은 원리로 false를 만나면 뒤에 볼 것없이 멈춤!

// 이러한 원리가 있기 때문에, &&은 null 체크할 때도 많이 쓰인대
// if문을 압축시켜줄 수 있음
// nullableObject && nullableObject.something // 앞에 객체가 null이면 false라 뒤에껄 실행하지 않겠지! (null검사를 간결하게 할 수 있음)
//위 주석은 아래 코드와 같은 의미
if(nullableObject != null){
    nullableObject.somthing;
}

// !(not)
// 값을 반대로 바꿔줌(true면 false로 바꿔줌)

// 7. Equality

const stringOne = '1';
const numberOne = 1;

// == loose equality, with type conversion
// 타입을 변경해서 검사를 해줌
console.log(stringOne == numberOne); // true (같아) // stringOne 문자열이긴 한데 안에 들어있는 건 숫자 1이잖아~ 이런 느낌
console.log(stringOne != numberOne); // false (다르지 않아)

// === strict equality, no type conversion
// 타입이 다르면 너넨 달라!
// == 보다 ===를 사용하는 것을 권장
console.log(stringOne === numberOne); // false
console.log(stringOne !== numberOne); // true

// ⭐ object equality by reference
const yurim1 = { major: 'SW' };
const yurim2 = { major: 'SW' };
const yurim3 = yurim1;
console.log(yurim1 == yurim2); // false // 각각 다른 레퍼런스를 가리키기 때문에
console.log(yurim1 === yurim2); // false // 같은 타입이든 아니든 각각 다른 레퍼런스를 가리키기 때문에
console.log(yurim1 === yurim3); // true // 1,3은 같은 레퍼런스를 가리키기 때문에

// ⭐ equality - puzzler // 결과 예측해보기
//0, null, undefined, ''(empty string)은 모두 false로 간주될 수 있음
console.log(0 == false); // true // 위 주석 참고
console.log(0 === false); // false // 0은 boolean 타입이 아니기 때문에 둘은 다름
console.log('' == false); // true
console.log('' === false); // false
console.log(null == undefined); // true ⭐
console.log(null === undefined); // false ⭐ // null과 undefined는 다른 타입

// 8. Conditional operators: if
// if, else if, else
const name = 'yurim';
if (name === 'yurim'){
    console.log('Welcome, yurim!');
} else if(name === 'coder'){
    console.log('You are amazing coder');
} else{
    console.log('unknown');
}

// 9. Ternary operator: ?
// if를 좀 더 간단하게 쓸 수 있음 (중첩해서 쓰는 건 권장하지 않음. 중첩해야할 경우 if나 switch로 대체하기)
// condition ? value1 : value2;
// true이면 value1을, false이면 value2를 실행
console.log(name === 'yurim' ? 'yes' : 'no');

// 10. Switch statement
// use for multiple if checks(if, else if 이런거 반복해야할 때 쓰기 좋음)
// use for enum-like value check
// use for multiple type checks in TS // TypeScript 정해진 타입을 검사하거나 이런 애들 검사할 때 switch 쓰는 것이 좋음
const browser = 'IE';
switch(browser){
    case 'IE':
        console.log('go away!');
        break;
    case 'Chrome': // case에 따라 할 행동이 같은 경우 이렇게 묶어 써줄 수 있음
    case 'Firefox':
        console.log('love you!');
        break;
    default:
        console.log('same all!');
        break;
}

// 11. Loops

// while loop
// 조건절이 참인 동안 body code가 실행됨
let i = 3;
while(i > 0){
    console.log(`while: ${i}`);
    i--;
}

// do while loop
// 먼저 블록을 실행하고 조건을 검사
do{
    console.log(`do while: ${i}`);
    i--;
}while(i > 0);

// for loop
// for(begin; condition; step)
// begin은 딱 한번만 실행
// 그 다음 블록 실행 전 조건을 검사한 다음에 조건에 맞으면 블록을 실행하고 블록 다 실행되면 step 실행. 조건이 안 맞을 때까지 반복하겠지
for(i = 3; i > 0; i--){
    console.log(`for: ${i}`);
}

for(let i = 3; i > 0; i = i-2){
    // inline variable declaration // for문 안에 지역변수를 선언해서 작성하는 법
    console.log(`inline variable for: ${i}`);
}

// nested loops
for(let i = 0; i < 10; i++){
    for(let j = 0; j < 10; j++){
        console.log(`i: ${i}, j: ${j}`);
    }
}
// O(n)이라 cpu에 좋지 않음. 되도록 피하기

// break(루프를 완전히 끝내는 것), continue(지금껏만 스킵하고 다음 반복으로 넘어감)
// Q1. iterate from 0 to 10 and print only even(짝수) numbers (use continue)
for(let i = 0; i<11; i++){
    if (i % 2 !== 0){
        continue; // 짝수가 아니면 스킵하고 다음 반복으로 넘어가기
    }
    console.log(`Q1: ${i}`);
}

// Q2. iterate from 0 to 10 and print numbers until reaching 8 (use break)
for(let i = 0; i<11; i++){
    if (i > 8){
        break;
    }
    console.log(`Q2: ${i}`);
}