// exception

// try-catch-finally

try {
  console.log('잘 실행되는 중');
  new Array(-1); // 🏁
  console.log('에러 발생 후 코드는 실행되지 않음');
} catch (e) {
  console.log('에러가 발생해 코드의 실행 흐름이 catch 블록으로 옮겨왔음');
  console.log(`에러명: ${e.name} 내용: ${e.message}`);
} finally {
  console.log('finally');
}

// 실행 결과
// '잘 실행되는 중'
// '에러가 발생해 코드의 실행 흐름이 catch 블록으로 옮겨왔음'
// '에러명: RangeError 내용: Invalid array length'
// 'finally'

// finally

for (let i of [1, 2, 3]) {
  try {
    if (i === 3) {
      break;
    }
  } finally {
    console.log(`현재 i의 값: ${i}`);
  }
}

// 실행 결과
// '현재 i의 값: 1'
// '현재 i의 값: 2'
// '현재 i의 값: 3'

// throw & error customizing

// (1)
const even = parseInt(prompt('짝수를 입력하세요'));

if (even % 2 !== 0) {
  throw new Error('짝수가 아닙니다.');
}

// (2)

class MyError extends Error {
  constructor(value, message, ...params) {
    super(...params);
    this.value = value;
    this.message = message;
    this.name = 'MyError';
  }
}

try {
  const even = parseInt(prompt('짝수를 입력하세요'));
  if (even % 2 !== 0) {
    throw new MyError(even, '짝수가 아닙니다.');
  }
} catch (e) {
  if (e instanceof MyError) {
    console.log(e.value); // 사용자가 입력한 정수가 저장된 변수 even의 값
    console.log(e.message); // 인수로 넘겨준 메시지 '짝수가 아닙니다.'
    console.log(e.name); // 지정한 에러 이름 'MyError'
  }
}

// promise

const p = new Promise((resolve) => {
  const even = parseInt(prompt('짝수를 입력하세요'));
  if (even % 2 !== 0) {
    throw new Error('짝수가 아닙니다.');
  } else {
    resolve(even);
  }
});

p.then(
  (even) => {
    return '짝수입니다.';
  },
  (e) => {
    // 에러시 실행되는 콜백(두 번째 인수로 넘겨준 콜백)
    return e.message;
  }
).then(alert);

// 비동기 함수

// (1)
async function func() {
  try {
    const res = await fetch('https://nonexistent-domain.nowhere');
  } catch (e) {
    console.log(e.message);
  }
}

func(); // 실행 결과: Failed to fetch

// (2)
async function func() {
  try {
    fetch('https://nonexistent-domain.nowhere');
  } catch (e) {
    console.log(e.message);
  }
}

func(); // 실행 결과: 아무것도 출력되지 않음

// (2)의 해결
// then 메소드의 두 번째 인수 혹은 catch 메소드로 해결
async function func() {
  fetch('https://nonexistent-domain.nowhere').catch((e) =>
    console.log(e.message)
  );
}

func(); // 실행 결과: Failed to fetch
