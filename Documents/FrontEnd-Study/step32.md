[문서 목록으로 돌아가기](README.md)

> # STEP 32
>
> 💡질의응답은 <https://github.com/pul8219/TIL> `Issues` 탭의 알맞은 step 이슈안에 남겨주세요. ➡️ [Issue탭으로 이동](https://github.com/pul8219/TIL/issues)
>
> - 작성자: Wol-dan (@pul8219)
> - 스터디 주제: FrontEnd 면접 스터디 <https://gitlab.com/siots-study/topics/-/wikis/%EC%8B%AC%ED%99%941>
> - 공부 범위: STEP 32 [코드스피츠 객체지향 자바스크립트 - 3회차](https://www.youtube.com/watch?v=D450fPGffTg)
> - 기한: 03/20(토) ~ 03/23(화)

# 보충 필요

# 목차

💬

- [Comment](#comment)
- [References](#references)
- [팀원들 결과물‍](#팀원들-결과물)

model의 값의 변화를 자동으로 인식하진 않고 수동으로 binder를 call했던 저번 모델을 binder가 model이 변하면 자동으로 변화하게 하고싶음 -> observer pattern 적용 필요

> 출처: 코드스피츠 강의

# Strategy

프로그램을 짰을 때, 어떤 문제를 해결하기 위한 핵심적인 **지식**을 의미

- binder의 내부 구조 관련 문제(strategy가 아님)

  ![image](https://user-images.githubusercontent.com/33214449/112159711-cb2b6300-8c2c-11eb-96b8-ca9e6203633a.png)

![image](https://user-images.githubusercontent.com/33214449/112159923-fdd55b80-8c2c-11eb-96a7-8bb5ec0973aa.png)

- `Strategy` 부분을 분리하고 싶은데 이 부분은 structure 와 떼려야 뗄 수 없음. 따라서 structure에 대한 포인터가 있어야됨

- `composition`: code->object 로 바꾸기(클래스나 인터페이스와 같은 형으로 도출해야한다. 그래야만 형에 대한 규격에 따라 코드가 반응할 수 있게끔 할 수 있음)

- 객체 또한 어떤 객체인지 알 방법이 필요 -> `type`을 정의해야함

- strategy를 외부의 객체로 해결하고 싶고 (이유는 그렇게 하지 않으면 변화 생길 때마다 코드를 고쳐야하기 때문) 코드부분을 객체로 바꿔주면 binder는 그 객체에 대한 의존성이 생김. (객체 의존성)

- 이 의존성을 내부에서 type의 subtype을 만들어내는 것이 아니라 외부에서 공급받아야함. 그래야 내부에는 형에 대한 의존성만 있고 특정 객체에 대한 의존성이 없어짐 (Dependency Injection)

- Dependency가 만들어지는 순간 Dependency Injection도 따라와야함

> 여기서 `연역적 추리` 필요
>
> 다양한 현상으로부터 추상화가 되는 일반성을 도출해내는 것

## Dependency Injection(주입)의 방향

1. 외부에서 객체를 직접 주입받는 것

2. 자식과의 injection을 성립시키는 것(내부에서 자식한테 위임시키는 방법) = 템플릿 메소드

아래 코드에선 2의 방법을 사용했음

![image](https://user-images.githubusercontent.com/33214449/112165410-1005c880-8c32-11eb-8dde-9090c5f27746.png)

```js
const Processor = class {
  // ...
};
```

- 외부에선 process(템플릿)로 보이지만, 내부에선 자식 쪽에 의존하고있는 메소드(훅)에 의존하고 있음(`_process`)

- 이 클래스는 process를 외부에 노출하고 있는데 process를 호출하면 `_process`를 호출할 것이다. 근데 그 `_process`를 호출하면 throw 당한다. 즉 이 클래스를 확장한 (오버라이드한) `_process`를 갖고있는 클래스의 인스턴스만 무사히 프로세스를 처리할 수 있다는 것이다. -> 추상 클래스를 가정하고 있는 것

## process와 structure의 연결

![image](https://user-images.githubusercontent.com/33214449/112165499-257af280-8c32-11eb-8a2a-a83f18d2aa17.png)

- 카테고리 이름(cat)을 받아 불변값으로 처리

- styles라는 키를 갖는 `_process`는 이렇게 처리할 것이라는 것

- class를 값으로 넘겨줌 -> 이 클래스의 인스턴스를 **하나**만 만들게 하려고 의도한 것(익명 (상속된)클래스의 장점)

- 이 네 가지 인스턴스들이 process라는 형으로 인식되게 되었다. (binder의 render는 이들을 process로 인식할 것)

## binder 개조

아래 스크린샷은 structure 관련 코드만 표시된 것임

![image](https://user-images.githubusercontent.com/33214449/112177263-19942e00-8c3c-11eb-9367-c5493b5a1331.png)

![image](https://user-images.githubusercontent.com/33214449/112177364-2fa1ee80-8c3c-11eb-9210-6fab232528ef.png)

- `#processors` 정의 - processor들을 담을 수 있는 그릇
- `this.#processors[v.cat] = v;` 카테고리 당(ex. styles) 하나의 프로세서만 등록할 수 있도록 이렇게 짠 것(v.cat이 같은 애가 오면 v로 덮어써버리겠지)
- v.cat 이 외부에 노출됐고 문자열이라 (값 사용) binder의 processor를 담는 그릇은 set이 될 수 없었던 것(담아도 소용 없음) 카테고리가 값(value)이니까 ❓

- binder가 processor랑 계약했기 때문에 processor의 cat, process를 쓸 수 있게 되었음 (💡알고리즘의 일반화; 제네릭 알고리즘 - 복잡한 코드들의 공통점을 모아 객체를 형으로 뺀 뒤에 그 형과 계약하고 형에서 계약된 내용으로 알고리즘을 바꾸는 것을 의미.) binder와 processor 사이의 관계처럼 (`processores.forEach(([pk, processor]))` ~ 부분)

- 이제 형인 processor이 바뀌지 않는한 코드가 바뀌지 않을 것

> 해야하는 것
>
> - strategy와 structure의 분리
> - strategy를 뽑기 위한 공통점 찾아내기
> - 알고리즘 일반화 (제일 어려움🌟)

기존의 render와 비교해보기

![image](https://user-images.githubusercontent.com/33214449/112178699-514fa580-8c3d-11eb-8350-7e7f22508042.png)

![image](https://user-images.githubusercontent.com/33214449/112179475-139f4c80-8c3e-11eb-9e62-e43e5acb8318.png)

- binder가 processor를 의존하게 되었다. (화살표는 의존하고 있는 쪽이 의존대상을 향해 가리킴) processor는 binder가 뭘하든 아무 영향이 없음

# Observer

...

# Comment

# References

# 팀원들 결과물

- [@pul8219]()
- [@eyabc]()
- [@khw970421]()
- [@JeongShin]()
