// ✨ 드림코딩 엘리 2강 async, defer

// 자바스크립트 공부시 공식 사이트인 mdn에서 참고 많이 할 것!
//developer.mozilla.org

// html안에서 어떻게 js를 포함해야 좋을까? 학습할 것

// Case 1
// head 태그에 js 임포트

// Case 2
// body 태그의 끝부분에 js 임포트

// Case 3
// head + async

// async 는 boolean 타입이기 때문에 써주는 것만으로도 true로 설정이되어 사용가능하다.
//html을 파싱하다가 js파일 임포트 부분을 만나면 병렬로 js파일을 다운로드(fetch)하다가 다운로드가 완료되면 파싱을 멈추고 js를 실행하고 그 다음에 html을 마저 파싱

// Case 4
// head + defer


// use strict
'use strict';

// TypeScript를 쓸땐 필요없는 친구
// 순수 자바스크립트(VanilaJS)를 쓸 땐 선언해주는 것이 좋음
// why? 자바스크립트는 빨리 만들어졌고 굉장히 유연한 언어임 -> 유연하다는 것은 때로는 위험할 수 있음(개발자가 실수할 수 있음 - 선언되지 않는 변수에 값을 할당 / 기존에 존재하는 프로토타입을 변경한다던지) ECMAScript5 에서 추가된 use strict를 쓰면 그런 비상식적인 일을 막을 수 있음
// 조금 더 상식적인 범위 안에서 자바스크립트 이용 가능
// JS 엔진이 효율적으로 자바스크립트를 분석할 수 있어 조금 더 나은 성능 개선도 기대 가능

// use strict 선언 전
// a = 6; // 에러 안뜸

// use strict 선언 후
// a = 6;
// a는 정의되어있지 않아! 라는 에러 메시지 뜸
// 다음과 같이 고치기
// let a;
// a = 6;
