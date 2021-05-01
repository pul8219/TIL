const express = require('express');
const server = express();
const port = 3000;
const User = require('./models/User');
const bodyParser = require('body-parser'); //json 형식을 읽을 수 있게 도와줌
server.use(bodyParser.json());


const mongoose = require('mongoose');
require('dotenv').config({ path: "variables.env" });
// console.log(process.env.MONGODB_URL);
// mongoose.connect(process.env.MONGODB_URL, {
//     useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
// }).then(() => console.log('MongoDB connected...')).catch(error => console.log(error));


// url 들어가면 생성되도록 test
// server.get('/createUser', (req, res) => {
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


// 수정필요
// url 들어가면 생성되도록 test
server.get('/createUser', (req, res) => {
    const newUser = new User();
    newUser.name = "Dalgom";
    newUser.todoList = [
        {
            contents: "Yoga",
            isCompleted: false,
        },
        {
            contents: "Study",
            isCompleted: false,
        }
    ]
//     newUser.email = "aaa@naver.com";
//     newUser.name = "dalgom";
    newUser.save().then((user) => {
        console.log(user);
        res.json({message: 'user created successfully'});
    }).catch((err) => {
        res.json({
            message: err.toString()
        })
    })
});

// User의 todoItem 추가
server.post('/users/:userId/items', (req, res) => {
   // 기존 todolist 받아오기 결국 update 하는 방향으로 가야됨
   try{
       const userId = req.params.userId;
       User.findByIdAndUpdate(userId, 
        {$push: {"todoList": req.body}},
        
        function(err, doc){
            if(err){
                throw err;
            }
            console.log(doc);
        }
        );
    
       res.json({message: 'Add todoitem successfully'});
   }
   catch(err){
       res.json({message: err.toString()});
   }
});

// body
// {
//     "contents": "writing",
//     "isCompleted": false,
// }

//    const user = User.findById(userId);
    //    user.todoList.push(req.body);
    //    user.save();

// User의 특정 todoItem 삭제
server.delete('/users/:userId/items/:itemId', async (req, res) => {
    
    const userId = mongoose.mongo.ObjectID(req.params.userId);
    const itemId = mongoose.mongo.ObjectID(req.params.itemId);

    await User.findByIdAndUpdate(
        userId,
        {$pull: {'todoList': {'_id': itemId}}},
        function(err){
            if(err){
                console.log(err);
                res.status(500);
            }
            else{
                res.send('success');
            }
        }
    );
    
});

// ㄴ 요청의 body에 내용을 지우니 정상적으로 작동했다


// User의 특정 todoItem의 contents 속성 수정
server.put('/users/:userId/items/:itemId', async (req, res) => {
    const userId = mongoose.mongo.ObjectID(req.params.userId);
    const itemId = mongoose.mongo.ObjectID(req.params.itemId);

    await User.findOneAndUpdate(
        {_id: userId, todoList: {$elemMatch: {_id: itemId}}},
        {$set: {'todoList.$.contents': req.body.contents}},
        {'new': true},
        function(err, docs){
            if(err){
                res.status(500);
            }
            else{
                res.send(docs);
            }
        }
    );
});

// 요청에 담기는 body엔 아래 json을 담아 요청했음

// {
//     "contents": "singing-new"
// }

// ================================================

// User 추가하기
// User의 name을 입력받으면(req.body로) User 데이터를 추가해주는 코드
server.post('/users', (req, res) => {
    const newUser = new User({
        name: req.body.name,
        todoList: [],
    });

    newUser.save();
    res.json({message: 'User 정보 저장 성공'});

});

// 수정 필요
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

// User 전체 불러오기
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

// name으로 특정 User 불러오기
server.get('/users/:name', async(req, res) => {
    const name = req.params.name;

    try{
        const user = await User.find({ name });
        // const user = await User.find({ name: name }); // 와 같은 코드
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

// User 삭제하기
server.delete('/users/:userId', async(req, res) => {
    const userId = req.params.userId;
    try{
        const user = await User.findByIdAndDelete(userId);
        if(!user){
            return res.status(404).send();
        }
        res.status(200).send(user);
    }
    catch(err){
        res.status(500).json({
            message: "User 삭제 실패",
        });
    }
});

// 모든 User 삭제하기
// 주의: remove()는 권장하지 않는 함수라고 본 것 같음(deprecated 되었다는...)
server.delete('/users', async(req, res) => {
    try{
        await User.remove({});
        res.json('delete all success');
    }
    catch(err){
        res.status(404).json({message: "모든 User 삭제 실패"});
    }
});


// User 정보 수정
server.put('/users/:userId', (req, res) => {
    User.findByIdAndUpdate(
        req.params.userId,
        {$set: {'name': req.body.name}},
        {'new': true},
        function(err, docs){
            if(err){
                res.status(500);
            }
            else{
                res.send(docs);
            }
        }

    );
});

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