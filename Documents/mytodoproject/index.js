const express = require('express');
const server = express();
const port = 3000;
const User = require('./models/User');
const bodyParser = require('body-parser'); //json 형식을 읽을 수 있게 도와줌
server.use(bodyParser.json());


// url 들어가면 생성되도록 test
// server.get('/', (req, res) => {
//     const newUser = new User();
//     newUser.email = "aaa@naver.com";
//     newUser.name = "dalgom";
//     newUser.save().then((user) => {
//         console.log(user);
//         res.json({
//             message: 'user created successfully'
//         })
//     }).catch((err) => {
//         res.json({
//             message: err.toString()
//         })
//     })
// });

server.post('/', async (req, res) => {
    // console.log(req.body);
    const newUser = new User(req.body);
    try{
        await newUser.save();
        res.json({message: 'User 정보 저장 성공'});
    }
    catch(e){
        res.status(500).json({
            message: "User 정보 저장 실패",
        });
    }
});

server.get('/users', async(req, res) => {
    try{
        const users = await User.find({});
        res.status(200).send(users);
    }
    catch(e){
        res.status(500).json({
            message: "User 조회 실패",
        });
    }
});

server.get('/users/:name', async(req, res) => {
    const name = req.params.name;

    try{
        const user = await User.find({ name: name });
        if(!user){
            return res.status(400).send();
        }
        res.status(200).send(user);
    }
    catch(e){
        res.status(500).json({
            message: "User 조회 실패",
        });
    }
});

const mongoose = require('mongoose');
require('dotenv').config({ path: "variables.env" });
// console.log(process.env.MONGODB_URL);
// mongoose.connect(process.env.MONGODB_URL, {
//     useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
// }).then(() => console.log('MongoDB connected...')).catch(error => console.log(error));

server.listen(port, (err) => {
    if(err){
        return console.log(err);
    }
    else{
        mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false}, (err) => {
            if(err){
                console.log(err);
            }
            else{
                console.log('Connected to database successfully');
            }
        });
    }
});





// app.get('/', (req, res) => res.send('hello world'));
// app.listen(port, () => console.log(`server is listening at localhost:${port}`));

// const Schema = mongoose.Schema;
// const todoSchema = new Schema({
//     id: {type: String, required: true, unique: true},
//     todoItems: [{
//         contents: String,
//         isCompleted: Boolean
//     }]

// });