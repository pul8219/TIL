const getBtn = document.getElementById("get-btn");
const postBtn = document.getElementById("post-btn");

const sendHttpRequest = (method, url, data) => {
    return fetch(url, {
        method: method,
        body: JSON.stringify(data),
        headers: data ? {'Content-Type': 'application/json'} : {} // data 가 falsy한 값일 경우 그냥 어떤 헤더도 추가하지 않겠다는 뜻
    })
        .then(response => {
            if(response.status >= 400){ // !response.ok
                // throw new Error('Something went wrong!');// 여기서 에러를 던지게 되면 reject되는 것이고 다음 promise chain에서 catch로 가게될 것이다.
                
                // 그런데, 이게 무슨 에러인지 담고 싶다면 어떻게 해야할까? response에 담긴 에러관련 내용을 담아 에러를 처리해보자. 여기선 중첩 promise를 사용했다.
                return response.json().then(errResData => {
                    const error = new Error('Something went wrong!');
                    error.data = errResData;
                    throw error;
                });

            }
            return response.json();
        });
};

const getData = () => {

    // // ==========================================
    // 이렇게 옵션이 없으면 기본적으로 GET 요청을 보낸다.
    // fetch는 response를 담은 Promise 객체를 리턴한다.
    // fetch('https://reqres.in/api/users')
    // .then(response => console.log(response));
    // // (body: ReadableStream) 그런데 이렇게만 해서는 우리가 원하는 데이터 스냅샷을 볼 수 없다.(response 객체에 들어있는 것이 모두 출력됨)
    // // ==========================================


    // // ==========================================
    // fetch('https://reqres.in/api/users') // 1) get data
    // .then(response => {
    //     return response.json(); // Response 객체의 data stream body을 > snapshot > json > javascript data type 으로 변환해준다. // Response.json() 도 Promise를 반환한다. // 2) extract data
    // })
    // .then(responseData => {
    //     console.log(responseData); // 3) use it
    // });
    // // ==========================================

    sendHttpRequest('GET', 'https://reqres.in/api/users')
        .then(responseData => {
            console.log(responseData);
        });
    

};

const sendData = () => {

    sendHttpRequest('POST', 'https://reqres.in/api/register', {
        email: 'eve.holt@reqres.in',
        // password: 'pistol'
    })
    .then(responseData => {
        console.log(responseData);
    })
    .catch(err => {
        console.error(err, err.data); // ✏️
    });

    // fetch('https://reqres.in/api/users')
    // .then(response => {
    //     return response.json();
    // })
    // .then(responseData => {
    //     console.log(responseData);
    // });
};

getBtn.addEventListener('click', getData);
postBtn.addEventListener('click', sendData);

