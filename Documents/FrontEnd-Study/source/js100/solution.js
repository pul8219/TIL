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
