const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const saltRounds = 10


const userSchema = mongoose.Schema({
    name:{
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: String,
    tokenExp: Number,
})

// model을 save 하기 전에 무언가를 하겠다는 뜻
userSchema.pre('save', function(next){
    
    // 비밀번호 암호화

    var user = this;

    if(user.isModified('password')){ //비밀번호 암호화가 비밀번호가 바뀔때만 동작할 수 있도록 조건문을 건다
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err);
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err);
                user.password = hash;
                next();
            }); // hash에는 암호화된 비밀번호가 담긴다.
        });
    }

    else{
        next();
    }
})
// next는 model을 save하는 곳으로 보내주는 function이다.


// comparePassword라는 메소드명은 index.js의 메소드명과 같아야한다.
userSchema.methods.comparePassword = function(plainPassword, cb){
    // 사용자가 입력한 plainPassword와 데이터베이스의 암호화된 비밀번호가 서로 같은지 확인해야한다.
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        // 비밀번호가 서로 일치할 경우 isMatch 인자에 true가 담기고, 그렇지 않을경우 false가 담긴다.
        if(err) return cb(err);
        cb(null, isMatch); // 에러는 없으니 null을 전달

    });

}



const User = mongoose.model('Boileruser', userSchema)

module.exports = { User }