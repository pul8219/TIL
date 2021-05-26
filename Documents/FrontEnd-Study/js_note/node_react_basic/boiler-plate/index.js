const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser')
const { User } = require('./models/User')

const config = require('./config/key')

// application/x-www-form-urlencoded 형식으로된 데이터를 가져올 수 있게함
app.use(bodyParser.urlencoded({extended: true}))
// application/json 형식으로된 데이터를 가져올 수 있게함
app.use(bodyParser.json())

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World! 새해 복 많이')
})

// 회원가입 route
app.post('/register', (req, res) => {
    // 회원가입할 때 필요한 정보들을 client에서 가져와 데이터베이스에 넣어주는 코드

    const user = new User(req.body)

    // mongoDB 메소드인 save를 사용. 정보들이 user모델에 저장된다.
    user.save((err, userInfo) => {
        if(err) return res.json({ success: false, err })
        return res.status(200).json({ success: true })
    })
    // res.json() 응답을 json으로 하겠다는 것
    
})

// 로그인 route
app.post('/login', (req, res) => {

  // 요청된 이메일이 데이터베이스에 있는지 찾는다.
  User.findOne({email: req.body.email}, (err, user) => {
    if(!user){
      return res.json({
        loginSuccess: false,
        message: "가입된 이메일이 아닙니다."
      });
    }
    
    // 요청된 이메일이 데이터베이스에 있다면, 비밀번호가 맞는지 확인한다.
    // (지금 user 변수에는 해당 user의 이메일, 비밀번호 등이 담겨있을 것이다.)
    // comparePassword라는 이 메소드는 User.js 즉 모델에 만들어놓으면 된다.
    user.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch) return res.json({loginSuccess: false, message: "비밀번호가 틀렸습니다."});
  
      // 비밀번호가 맞다면 유저를 위한 토큰 생성
      user.generateToken((err, user) => {
  
      });
  
    });



  });

});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

