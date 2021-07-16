# AJAX

AJAX(Asynchronous JavaScript And XML)

AJAX는 <u>자바스크립트를 사용해 비동기적으로 데이터를 받아와 동적으로 DOM을 갱신 및 조작하는 기법</u>을 의미한다. **비동기적**으로 동작하기 때문에 서버와 통신할 때 페이지를 새로고침(리로드)하지 않고도 데이터 변경, 페이지 업데이트가 가능하다.약자에 XML이 있는 이유는 예전에 데이터 포맷으로 XML을 많이 사용했기 때문이다.

`XMLHttpRequest`(XHR) 객체를 이용해 서버와 데이터를 주고 받는다. `XML` 뿐만 아니라 `JSON`, `HTML`, 텍스트 파일 등 다양한 포맷의 파일을 주고 받을 수 있다. `HTTP` 이외의 프로토콜도 지원한다.(`file`, `ftp` 등)

`XMLHttpRequest` 말고 `fetch API`를 사용할 수도 있다. (IE에선 지원하지 않는다.) `fetch API`는 ES2015(ES6)에서 표준이 되었고 `Promise`를 리턴한다.

# XMLHttpRequest API

`XMLHttpRequest`을 통해 `XML`뿐만 아니라 `JSON` 데이터도 주고 받을 수 있다. (+ 이벤트를 기반으로 동작한다.) 코드를 통해 `XMLHttpRequest` API를 사용해보자.

HTTP 통신을 테스트하기 위해 <https://reqres.in/> 에서 제공하는 API를 사용할 것이다. 여러가지 API 명세 중에 사용해볼 것은 다음 두 가지 이다.

- GET: LIST USERS

![](https://images.velog.io/images/pul8219/post/cb1dccb5-9a87-4fb5-883d-b3877a69b3f9/image.png)

- POST: REGISTER - SUCCESSFUL & UNSUCCESSFUL

![](https://images.velog.io/images/pul8219/post/6c63fb79-1867-4939-8900-95448db4e452/image.png)

![](https://images.velog.io/images/pul8219/post/69067837-83ac-437c-9000-8afef2d518f2/image.png)

![](https://images.velog.io/images/pul8219/post/bc96dea3-1722-408b-b90e-ab4098c77351/image.png)

UNSUCCESSFUL한 경우는 에러처리를 할 때 테스트 해볼 것이다.

```html
<!-- 📁 index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>http request & javascript</title>
    <link rel="stylesheet" href="" />
    <script src="xhr.js" defer></script>
  </head>
  <body>
    <section id="control-center">
      <button id="get-btn">GET Data</button>
      <button id="post-btn">POST Data</button>
    </section>
  </body>
</html>
```

- `index.html` 실행 결과

![](https://images.velog.io/images/pul8219/post/b6277277-0008-4529-a82b-65074a7fe423/image.png)

```js
// 📁 xhr.js
const getBtn = document.getElementById('get-btn');
const postBtn = document.getElementById('post-btn');

// GET Data 버튼을 누르면 처리되는 getData() 함수
const getData = () => {
  const xhr = new XMLHttpRequest(); // XMLHttpRequest 객체 생성
  xhr.open('GET', 'https://reqres.in/api/users'); // 요청 보낼 준비 (*prepare* request)

  xhr.responseType = 'json';

  // use response
  xhr.onload = () => {
    // console.log(xhr.response); // console에 response가 출력됨

    // // convert data from json to real js data
    // const data = JSON.parse(xhr.response);
    // console.log(data);

    // xhr.responseType='json'을 설정해주면 위처럼 JSON.parse를 사용해 변환할 필요가 없다.
    const data = xhr.response;
    console.log(data);
  };

  xhr.send(); // 서버로 요청을 보냄(send request to server)
};

// POST Data 버튼을 클릭하면 호출되는 sendData() 함수
const sendData = () => {
  // ...
};

getBtn.addEventListener('click', getData);
postBtn.addEventListener('click', sendData);
```

먼저 GET 요청을 처리하는 getData() 함수를 작성했다. 실행 결과, 요청이 성공적으로 처리된다.

![](https://images.velog.io/images/pul8219/post/a65f260d-febd-49c1-84c0-02eb705df915/image.png)

브라우저에서 `GET Data` 버튼을 누르면 요청이 이루어지고 개발자 도구(F12)의 `Network` 탭에서 request(req 헤더 내용 포함)와 response(Preview 탭에서 확인 가능) 내용을 확인할 수 있다.

![](https://images.velog.io/images/pul8219/post/9555ea6c-3d1e-472b-b2f0-6051e4931640/image.png)

![](https://images.velog.io/images/pul8219/post/e47763e1-fa9a-41e4-b388-7cfd219216ec/image.png)

이제 POST 요청을 처리하는 sendData() 함수를 만들어볼건데, getData() 함수와 상당 부분 내용이 중복되므로 재사용할 수 있는 함수를 만들 것이다. 그리고 비동기 작업을 직관적으로 처리하기 위해 비동기 코드 부분을 `Promise`로 래핑해준다.

```js
// 📁 xhr.js
const getBtn = document.getElementById('get-btn');
const postBtn = document.getElementById('post-btn');

const sendHttpRequest = (method, url, data) => {
  // ➕ POST 요청도 처리하기 위해 인자에 data를 추가한다.
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);

    xhr.responseType = 'json';

    // ➕ 보내는 데이터가 json이라고 헤더에 명시해줘야 한다.(post 요청 고려)
    if (data) {
      xhr.setRequestHeader('Content-Type', 'application/json');
    }

    xhr.onload = () => {
      resolve(xhr.response);
    };

    xhr.send(JSON.stringify(data));
  });
  return promise;
};

const getData = () => {
  sendHttpRequest('GET', 'https://reqres.in/api/users').then((responseData) =>
    console.log(responseData)
  );
};

const sendData = () => {
  sendHttpRequest('POST', 'https://reqres.in/api/register', {
    email: 'eve.holt@reqres.in',
    password: 'pistol',
  }).then((responseData) => console.log(responseData));
};

getBtn.addEventListener('click', getData);
postBtn.addEventListener('click', sendData);
```

![](https://images.velog.io/images/pul8219/post/3758fc2c-1003-4775-a9bc-ee99eb1fd352/image.png)

POST 요청도 잘 실행된다. (유의: reqres.in 홈페이지의 `api/register` API에 있는 email, password값을 넣어야 정상작동한다.)

에러 처리도 해주자.

```js
// 📁 xhr.js
const getBtn = document.getElementById('get-btn');
const postBtn = document.getElementById('post-btn');

const sendHttpRequest = (method, url, data) => {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);

    xhr.responseType = 'json';

    if (data) {
      xhr.setRequestHeader('Content-Type', 'application/json');
    }

    xhr.onload = () => {
      resolve(xhr.response);
    };

    // ➕ 에러 핸들링
    xhr.onerror = () => {
      reject('Something went wrong!');
    };

    xhr.send(JSON.stringify(data));
  });
  return promise;
};

const getData = () => {
  sendHttpRequest('GET', 'https://reqres.in/api/users')
    .then((responseData) => console.log(responseData))
    .catch((err) => console.error(err));
    );
};

const sendData = () => {
  sendHttpRequest('POST', 'https://reqres.in/api/register', {
    email: 'eve.holt@reqres.in',
    //   password: 'pistol' // ➕ 에러 핸들링을 테스트해보기 위해 주석처리
  })
  .then(responseData => console.log(responseData))
    .catch(err => console.error(err));
};

getBtn.addEventListener('click', getData);
postBtn.addEventListener('click', sendData);
```

그런데 이 상태에서 POST 요청을 잘못 보내면 (예를 들어 email, password를 모두 body에 넣어야 하는데 password를 빼먹은 경우) 에러가 sendData()함수의 `catch`가 아닌 (첫번째) `then`에서 잡혀버린다.

이렇게 요청의 body가 잘못 됐거나 데이터 요청에서 오류가 난 경우를 `xhr.onload` 내에서 처리해줘야한다. 그래야 `catch`에서 에러가 잡힌다. (`xhr.error` 라인은 네트워크 통신 실패 등의 에러를 캐치함) 다음과 같이 코드를 수정한다.

```js
// 📁 xhr.js
const getBtn = document.getElementById('get-btn');
const postBtn = document.getElementById('post-btn');

const sendHttpRequest = (method, url, data) => {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);

    xhr.responseType = 'json';

    if (data) {
      xhr.setRequestHeader('Content-Type', 'application/json');
    }

    xhr.onload = () => {
        // ➕ 이렇게 수정
        if(xhr.status >= 400) reject(xhr.response);
        else resolve(xhr.response);
    };

    xhr.onerror = () => {
      reject('Something went wrong!');
    };

    xhr.send(JSON.stringify(data));
  });
  return promise;
};

const getData = () => {
  sendHttpRequest('GET', 'https://reqres.in/api/users')
    .then((responseData) => console.log(responseData))
    .catch((err) => console.error(err));
    );
};

const sendData = () => {
  sendHttpRequest('POST', 'https://reqres.in/api/register', {
    email: 'eve.holt@reqres.in',
    //   password: 'pistol' // ➕ 에러 핸들링을 테스트해보기 위해 주석처리
  })
  .then(responseData => console.log(responseData))
    .catch(err => console.error(err));
};

getBtn.addEventListener('click', getData);
postBtn.addEventListener('click', sendData);

```

![](https://images.velog.io/images/pul8219/post/613a2701-3567-41c5-9419-59b5f2538e20/image.png)

실행 결과이다. console 옆에 찍힌 라인번호를 확인해보자. 발생한 에러가 catch에서 잘 잡히는 것을 볼 수 있다.

# fetch API

- AJAX를 구현할 수 있는 방법 중 최신 방법(`XHR`을 보완)
- `Promise`를 기반으로 하기 때문에 로직을 추가하고 처리하기 쉽다. `fetch API`의 리턴 타입은 `Promise` 객체이다.
- `async/await`을 사용하여 비동기 코드를 간결하게 작성할 수도 있다.
- 기본적으로 쿠키를 전송하는 `XHR`와 달리, 쿠키를 전송하지 않는다. 하지만 자격증명(credentials) 옵션을 통해 전달할 수 있다.
- `404: Page Not Found`, `500: Internal Server Error` HTTP 에러를 Promise.reject로 잡아낼 수 없다. 네트워크 장애나 요청이 완료되지 못한 경우, CORS가 잘못 설정된 경우 같은 에러만 reject로 잡아낼 수 있다.
- IE나 구형 브라우저에서 지원하지 않는다.

간단한 fetch 예시

```js
fetch('http://example.com/movies.json')
  .then((response) => response.json())
  .then((data) => console.log(data));
```

위 코드는 JSON 파일을 네트워크로부터 받아와 콘솔에 출력하는 코드이다. fetch의 첫번째 인자에 자원의 경로를 주면 된다. fetch는 response를 담은 Promise 객체를 반환한다.

사실 response는 HTTP response이고 그 자체로 JSON은 아니다. 따라서 Response.json() 메소드를 통해 response의 body에서 JSON을 추출한다.

request 옵션을 적용한 fetch 예제도 봐보자.

```js
// Example POST method implementation:
async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

postData('https://example.com/answer', { answer: 42 }).then((data) => {
  console.log(data); // JSON data parsed by `data.json()` call
});
```

위에서 언급했듯이 `fetch()`는 상태 코드 404 에러로 요청에 실패한 경우에도 Response 객체를 반환한다. 즉 요청이 실패하는 경우를 catch 메소드만으로 처리할 수 없기 때문에 아래 방법을 쓴다.

`fetch()`가 성공적으로 이루어졌는지 체크하기 위해 promise가 resolve 됐는지 체크하고 `Response.ok` 속성이 true인지 체크한다. 아래 예제를 봐보자.

```js
fetch('flowers.jpg')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.blob();
  })
  .then((myBlob) => {
    myImage.src = URL.createObjectURL(myBlob);
  })
  .catch((error) => {
    console.error('There has been a problem with your fetch operation:', error);
  });
```

```js
fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then((data) => {
    if (!data.ok) {
      throw new Error(data.status);
    }
    return data.json();
  })
  .then((post) => {
    console.log(post.title);
  })
  .catch((error) => {
    console.log(error);
  });
```

## Response 객체

- `Response` 객체는 우리가 보통 필요로 하는 body(본문, 데이터)외에도 상태 코드, 헤더 등 다양한 정보를 가지고 있다. 따라서 `response.json()`과 같이 우리가 원하는 형태로 Response 객체를 변환하여 사용한다.
- `Response` 객체는 `fetch()`의 promise가 resolve될 때 반환된다.

- `Response.status`: HTTP 상태 (응답) 코드를 포함한 정수(default: 200)
- `Response.statusText`: HTTP 상태 코드 메시지를 나타내는 문자열(default: "")
- `Response.ok`: 200 ~ 299를 포함하는 상태코드인지 확인하여 `Boolean`을 반환한다.

## Body

Request, Response 모두 body 데이터를 포함할 수 있다. body 객체에는 다음과 같은 타입들이 담길 수 있다.

- `ArrayBuffer`
- `ArrayBufferView`
- `Blob/File`
- String
- `URLSearchParams`
- `FormData`

또한 Request, Response는 body로부터 데이터를 추출하는 인터페이스를 제공한다. 아래 인터페이스들은 모두 프로미스를 반환한다.

- `Request.arrayBuffer()` / `Response.arrayBuffer()`
- `Request.blob()` / `Response.blob()`
- `Request.formData()` / `Response.formData()`
- `Request.json()` / `Response.json()`
- `Request.text()` / `Response.text()`

## fetch 예제

`XMLHttpRequest` API를 공부할 때 작성했던 예제와 같은 기능을 구현할 것이다. `index.html`의 내용은 같고 API 테스트를 위해 <https://reqres.in> 사이트를 이용하는 것도 동일하다.

```html
<!-- 📁 index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>http request & javascript</title>
    <link rel="stylesheet" href="" />
    ript> -->
    <script src="fetch.js" defer></script>
  </head>
  <body>
    <section id="control-center">
      <button id="get-btn">GET Data</button>
      <button id="post-btn">POST Data</button>
    </section>
  </body>
</html>
```

```js
// 📁 fetch.js
const getBtn = document.getElementById('get-btn');
const postBtn = document.getElementById('post-btn');

const getData = () => {
  fetch('https://reqres.in/api/users').then((response) =>
    console.log(response)
  );

  // 이렇게 옵션이 없으면 기본적으로 GET 요청을 보낸다.
  // fetch는 response를 담은 Promise 객체를 리턴한다.
  // (body: ReadableStream) 그런데 이렇게만 해서는 우리가 원하는 데이터 스냅샷을 볼 수 없다.(response 객체에 들어있는 것이 모두 출력됨)
};

const sendData = () => {
  // ...
};

getBtn.addEventListener('click', getData);
postBtn.addEventListener('click', sendData);
```

![](https://images.velog.io/images/pul8219/post/020793ce-7f00-4391-84d6-db8ef6b9b05d/image.png)

- `Response.json()` 사용

```js
// 📁 fetch.js
const getBtn = document.getElementById('get-btn');
const postBtn = document.getElementById('post-btn');

const getData = () => {
  fetch('https://reqres.in/api/users') // 1) get data
    .then((response) => {
      // 2) extract data
      return response.json(); // Response 객체의 data stream body을 > snapshot > json > javascript data type 으로 변환해준다. // Response.json() 도 Promise를 반환한다.
    })
    .then((responseData) => {
      console.log(responseData); // 3) use it
    });
};

const sendData = () => {
  // ...
};

getBtn.addEventListener('click', getData);
postBtn.addEventListener('click', sendData);
```

Response 객체에 들어있던 (우리가 원하는) 데이터가 자바스크립트 데이터 형식으로 잘 출력되는 것을 볼 수 있다.

![](https://images.velog.io/images/pul8219/post/c6b13e8f-b9fe-4d18-8f63-8af5c59ab328/image.png)

- GET, POST 사용을 위한 함수 유틸화

```js
// 📁 fetch.js
const getBtn = document.getElementById('get-btn');
const postBtn = document.getElementById('post-btn');

const sendHttpRequest = (method, url, data) => {
  return fetch(url, {
    method: method,
    body: JSON.stringify(data),
    headers: data ? { 'Content-Type': 'application/json' } : {}, // data 가 falsy한 값일 경우 그냥 어떤 헤더도 추가하지 않겠다는 뜻
  }).then((response) => {
    return response.json();
  });
};

const getData = () => {
  sendHttpRequest('GET', 'https://reqres.in/api/users').then((responseData) => {
    console.log(responseData);
  });
};

const sendData = () => {
  sendHttpRequest('POST', 'https://reqres.in/api/register', {
    email: 'eve.holt@reqres.in',
    password: 'pistol',
  }).then((responseData) => {
    console.log(responseData);
  });
};

getBtn.addEventListener('click', getData);
postBtn.addEventListener('click', sendData);
```

- 에러 처리 적용하기

지금까지 짠 코드에서 POST 요청을 잘못 보내보자. 에러가 발생하지만 그 에러가 sendData의 첫번째 then이 나타내는 success 블록에서 잡혀버린다. catch를 통해 에러를 처리하자.

```js
// 📁 fetch.js
const getBtn = document.getElementById('get-btn');
const postBtn = document.getElementById('post-btn');

const sendHttpRequest = (method, url, data) => {
  return fetch(url, {
    method: method,
    body: JSON.stringify(data),
    headers: data ? { 'Content-Type': 'application/json' } : {}, // data 가 falsy한 값일 경우 그냥 어떤 헤더도 추가하지 않겠다는 뜻
  }).then((response) => {
    return response.json();
  });
};

const getData = () => {
  sendHttpRequest('GET', 'https://reqres.in/api/users').then((responseData) => {
    console.log(responseData);
  });
};

const sendData = () => {
  sendHttpRequest('POST', 'https://reqres.in/api/register', {
    email: 'eve.holt@reqres.in',
    // password: 'pistol',
  })
    .then((responseData) => {
      console.log(responseData);
    })
    .catch((err) => {
      console.error(err);
    });
};

getBtn.addEventListener('click', getData);
postBtn.addEventListener('click', sendData);
```

하지만 catch 코드를 작성해도 여전히 에러가 then의 success 블록에서 잡힌다.

이는 네트워크 통신 장애나 테크니컬한 에러가 아니면 상태 코드(status code)가 40x, 50x인 에러들은 fetch가 캐치를 못하고 정상적으로 응답을 반환하기 때문이다. `sendHttpRequest()`내에 응답을 처음 받아오는 부분에서 이를 해결해보자.

```js
// 📁 fetch.js
const getBtn = document.getElementById('get-btn');
const postBtn = document.getElementById('post-btn');

const sendHttpRequest = (method, url, data) => {
  return fetch(url, {
    method: method,
    body: JSON.stringify(data),
    headers: data ? { 'Content-Type': 'application/json' } : {},
  }).then((response) => {
    // ✏️ 40x, 50x 에러 처리를 위한 if문
    if (response.status >= 400) {
      // !response.ok를 사용해도 된다.
      // throw new Error('Something went wrong!');// 여기서 에러를 던지게 되면 reject되는 것이고 다음 promise chain에서 catch로 가게될 것이다.

      // ⭐
      // 그런데, 이게 무슨 에러인지 커스텀 에러에 Response의 에러 내용을 담고 싶다면 어떻게 해야할까? 여기선 중첩 promise를 사용해 해결했다.
      return response.json().then((errResData) => {
        // 에러가 담긴 Response 객체를 스냅샷으로 변환(.json())
        const error = new Error('Something went wrong!'); // 커스텀 에러
        error.data = errResData;
        throw error;
      });
    }
    return response.json();
  });
};

const getData = () => {
  sendHttpRequest('GET', 'https://reqres.in/api/users').then((responseData) => {
    console.log(responseData);
  });
};

const sendData = () => {
  sendHttpRequest('POST', 'https://reqres.in/api/register', {
    email: 'eve.holt@reqres.in',
    // password: 'pistol' // ✏️ 에러 테스트를 위해 주석 처리
  })
    .then((responseData) => {
      console.log(responseData);
    })
    .catch((err) => {
      console.error(err, err.data); // ✏️ 에러의 data 속성도 출력해준다.
    });
};

getBtn.addEventListener('click', getData);
postBtn.addEventListener('click', sendData);
```

![](https://images.velog.io/images/pul8219/post/f0a8432e-8364-44aa-ae2d-8a4cb34c62cf/image.png)

에러가 catch문에서 잘 잡히고 Response로 부터 가져온 에러 내용도 잘 출력되는 것을 볼 수 있다.

# References

- [AJAX - MDN](https://developer.mozilla.org/en-US/docs/Web/Guide/AJAX/Getting_Started)
- [XMLHttpRequest - MDN](https://developer.mozilla.org/ko/docs/Web/API/XMLHttpRequest)
- [AJAX - 취준생이 반드시 알아야 할 프론트엔드 지식들](https://github.com/baeharam/Must-Know-About-Frontend/blob/main/Notes/javascript/ajax.md)
- [AJAX란? XMLHttpRequest 사용법](https://kamang-it.tistory.com/entry/RESTfulajaxajax%EB%9E%80-XMLHttpRequest%EC%82%AC%EC%9A%A9%EB%B2%95-1)
- [AJAX와 JSON](https://kamang-it.tistory.com/entry/RESTfulajaxajax%EB%9E%80-XMLHttpRequest%EC%82%AC%EC%9A%A9%EB%B2%95-1)
- [Sending JavaScript Http Requests with XMLHttpRequest - Youtube](https://www.youtube.com/watch?v=4K33w-0-p2c) 코드 참고
- [AJAX란 무엇인가? / 비동기 방식 / AJAX의 단점](https://velog.io/@surim014/AJAX%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80_)
- [XMLHttpRequest, fetch API](https://velog.io/@lingodingo/ES6-XMLHttpRequest)
- [Using Fetch - MDN](https://developer.mozilla.org/ko/docs/Web/API/Fetch_API/Using_Fetch)
- [fetch API](http://hacks.mozilla.or.kr/2015/05/this-api-is-so-fetching/) fetch API의 mode 옵션에 대해 서치한 것
