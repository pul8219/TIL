// 📁 app.mjs

import { birthday, collabo, Person } from './lib.mjs';

console.log(birthday); // 🍰
console.log(collabo('🥚', '🥗')); // 🥚 + 🥗
console.log(new Person('yurim')); // Person { name: "yurim" }

// 위 코드를 아래 코드처럼 작성하여 한번에 모듈을 가져올 수도 있음

import * as lib from './lib.mjs';

console.log(lib.birthday);
console.log(lib.collabo('🥚', '🥗'));
console.log(new lib.Person('yurim'));

// 모듈을 가져오며 이름 변경도 가능

import { birthday as bd, collabo as mix, Person as P } from './lib.mjs';

console.log(bd);
console.log(mix('🥚', '🥗'));
console.log(new P('yurim'));

// default 키워드를 사용한 모듈을 가져오는 예

import double from './lib.mjs';

console.log(double(2)); // 4
