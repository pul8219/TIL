// 📁 module.mjs

export const birthday = '🍰';

export function collabo(a, b) {
  return `${a} + ${b}`;
}

export class Person {
  constructor(name) {
    this.name = name;
  }
}

// 모듈밖으로 내보낼 때 한번에 내보내고 싶다면 위 코드에서 export 키워드를 제거한 다음, 추가로 다음과 같이 써준다.
export { birthday, collabo, Person };

// 하나의 데이터만 export할 경우 default 사용

export default functon(x){
  return x + x;
}
