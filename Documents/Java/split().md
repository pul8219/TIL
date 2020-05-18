## split()

정규식을 이용해 문자열을 분할하는 함수

* String[] split(String regex)
인자로 주어진 정규식을 구분자로 하여 문자열을 분할
* String[] split(String regex, int limit)
인자로 주어진 정규식을 구분자로 하여 문자열을 분할
두 번째 인자인 limit으로 정규식을 적용하는 횟수를 제한

> limit 음수인 경우: 구분자로 끝까지 분할 가능하고, 마지막 요소가 빈문자열인 경우 이것도 포함
>
> limit 0인 경우: 구분자로 끝까지 분할 가능하고, 마지막 요소가 빈문자열일 경우 버림 (= 두번째 인자가 없는 split() 함수와 같은 기능)
> 문자열 분할 후 뒤에 구분자에 의해 나눠진 빈문자열들은 버려짐
>
> limit 양수인 경우: 문자열이 분할되어 담길 수 있는 배열의 길이 나타냄 = limit-1 만큼 구분자로 분할이 가능하다는 뜻

예제:
```java
String str = "010-1234-5678-99";
String[] arr = str.split("-", 2);
System.out.println(arr[0]); // 출력: 010
System.out.println(arr[1]); // 출력: 1234-5678-99
```
