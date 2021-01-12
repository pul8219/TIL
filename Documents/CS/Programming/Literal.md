# 상수(constant)

- 변하지 않는 변수

- 상수엔 숫자만 넣어야 한다?(X) 클래스나 기본형에서 파생된 객체등의 데이터도 넣을 수 있다.

ex) 참조변수를 상수로 지정할 때 참조변수의 값인 메모리주소값이 변하지 않는다는 의미이지 해당 주소가 가리키는 인스턴스의 데이터가 상수라는 의미가 아니다.

아래 예제를 보면 더 명확히 이해할 수 있을 것이다.

(상수를 지정할 때 C, C++, C#은 const를, Java는 final 키워드를 사용한다.)

```java
// Test라는 클래스가 있다고 가정할 때,
final Test t1 = new Test();

t1 = new Test(); // 불가

t1.num = 10; // 가능
// 이렇게 참조변수에 인스턴스를 대입하는 것처럼 메모리 주소값을 바꾸는 경우는 불가하지만
// 인스턴스 내 데이터를 바꾸는 것은 상관없다.(그 변수들까지 상수는 아니기 때문에)
```

# 리터럴(literal)

- 변수에 넣는 변하지 않는 데이터 그 자체

```java
int a = 1;
```

int 앞에 final을 붙이면 a는 상수가 된다.
여기서 리터럴은 1이다.

1과 같이 변하지 않는 데이터(boolean, char, int, long, double, ...)를 리터럴(literal)이라 부른다.

인스턴스는 리터럴이 될 수 없다.

다만 데이터가 변하지 않도록 설계한 불변클래스(Immutable class)나(자바의 String, Color와 같은 클래스가 그 예. 한번 생성하면 객체 안의 데이터가 변하지 않는다.) VO Class 등의 경우에 한해서는 리터럴이 될 수 있다.

# 참고 출처

- https://mommoo.tistory.com/14