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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

