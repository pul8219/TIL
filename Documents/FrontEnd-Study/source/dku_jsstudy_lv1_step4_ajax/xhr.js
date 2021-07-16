const getBtn = document.getElementById("get-btn");
const postBtn = document.getElementById("post-btn");

// get, post의 내용이 중복되니 함수로 묶어주기
const sendHttpRequest = (method, url, data) => { // ➕ POST 요청도 처리하기 위해 인자에 data를 추가한다.

    const promise = new Promise((resolve, reject) => {
        // 비동기 작업
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);

        xhr.responseType = 'json';

        // ➕ 보내는 데이터가 json이라고 헤더에 명시해줘야 한다.(post 요청 고려)
        if(data){
            xhr.setRequestHeader('Content-Type', 'application/json');
        }
        
        xhr.onload = () => {
            if(xhr.status >= 400) reject(xhr.response);
            else resolve(xhr.response);
            // resolve(xhr.response);
        };


        // error handling
        // 네트워크 통신이 실패했을 때나 그럴 때 에러가 잡힌다.
        xhr.onerror = () => {
            reject('Something went wrong!');
        };

        xhr.send(JSON.stringify(data));
    });
    return promise;
};

// GET Data 버튼을 클릭하면 처리되는 getData() 함수
const getData = () => {
    
    sendHttpRequest('GET', 'https://reqres.in/api/users')
    .then(responseData => console.log(responseData))
    .catch(err => console.error(err));

    // ================================== (GET,POST를 함수로 묶기 이전) 초기 getData() 함수
    // const xhr = new XMLHttpRequest(); // XMLHttpRequest 객체 생성
    // xhr.open('GET', 'https://reqres.in/api/users'); // 요청 보낼 준비 (*prepare* request)

    // xhr.responseType = 'json';

    // // use response
    // xhr.onload = () => {
    //     // console.log(xhr.response); // console에 response가 출력됨

    //     // // convert data from json to real js data
    //     // const data = JSON.parse(xhr.response);
    //     // console.log(data);

    //     // xhr.responseType='json'을 설정해주면 위처럼 JSON.parse를 사용해 변환할 필요가 없다.
    //     const data = xhr.response;
    //     console.log(data);
    // };

    // // xhr.addEventListener() 방식은 지원하지 않는 브라우저가 있을 수 있기 때문에 onload를 사용했다.

    // xhr.send(); // 서버로 요청을 보냄(send request to server)
    // ==================================
};


const sendData = () => {
    // 유의) reqres.in 홈페이지에 있는 email, password를 넣어야 정상작동한다.
    sendHttpRequest('POST', 'https://reqres.in/api/register', {
        email: 'eve.holt@reqres.in'
        // password: 'pistol'
    })
    .then(responseData => console.log(responseData))
    .catch(err => console.error(err));
};

getBtn.addEventListener('click', getData);
postBtn.addEventListener('click', sendData);