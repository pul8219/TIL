const getBtn = document.getElementById('get-btn');
const postBtn = document.getElementById('post-btn');

const getData = () => {
    // index.html에서 CDN으로 axios를 가져왔음. global하기 때문에 이렇게 axios 사용 가능함
    axios.get('https://reqres.in/api/users')
    .then(response => {
        console.log(response);
    });
};

const sendData = () => {
    axios.post('https://reqres.in/api/register', {
        email: 'eve.holt@reqres.in',
        // password: 'pistol'
    })
    .then(response => {
        console.log(response);
    })
    .catch(err => {
        console.error(err, err.response);
    });

};

getBtn.addEventListener('click', getData);
postBtn.addEventListener('click', sendData);