/** 문제1 배열의 삭제
 다음 배열에서 400, 500을 삭제하는 code를 입력하세요
*/

var nums = [100, 200, 300, 400, 500];
nums.pop();
nums.pop();
console.log(nums);

// 400, 500이 끝에 있는 것을 모르는 경우 for문을 통해 400, 500이면 splice로 삭제하는 걸로 짤 수도 있음


/** 문제2 배열의 내장함수
<pass>부분에 배열 내장함수를 이용하여 코드를 입력하고 다음과 같이 출력되게 하세요.
*/

console.clear();

// 데이터
var arr = [200, 100, 300];
arr.splice(2,0,10000);
console.log(arr);

// 출력
// [200, 100, 10000, 300]


/** 문제3 변수의 타입
 * 다음 출력 값으로 올바른 것은?
 * var arr = [100, 200, 300];
 * console.log(typeof(arr));
 * 1)undefined 2)string 3)number 4)object
 */

// 답: object
// 해설: undefined, string, number은 모두 primitive type(기본 자료형)이다. array, 함수 등은 object이다.

/** 문제41 소수판별
 * 숫자가 주어지면 소수인지 아닌지 판별하는 프로그램을 작성해주세요.
 * 소수이면 YES로, 소수가 아니면 NO로 출력해주세요.
 * (소수 : 1과 자기 자신만으로 나누어떨어지는 1보다 큰 양의 정수)
 */

// const isPrime = (num) => {
//     for(let i = 2; i <= num; i++){
//         if((i!==num)&&(num % i === 0)){
//             console.log('NO');
//             return;
//         }
//     }
//     console.log('YES');
// };
// isPrime(7);

// 리팩토링
// 1은 소수가 아니기 때문에 이를 체크해줘야함

const isPrime = (num) => {
    if(num === 1){ // 빠른 실패 적용
        console.log('NO');
        return;
    }
    for(let i = 2; i < num; i++){ // num 전까지만 루프 돌려도 됨
        if(num % i === 0){ // num전까지만 루프를 돌기 때문에 i와 num이 같지 않은지는 검사하지 않아도 됨
            console.log('NO');
            return;
        }
    }
    console.log('YES');
};

isPrime(3);