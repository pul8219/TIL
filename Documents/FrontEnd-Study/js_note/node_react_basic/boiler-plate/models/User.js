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

    if(user.isModified('password')){ //비밀번호 암호화가 비밀번호가 바뀔때만 동작할 수 있도록 제한
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err);
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err);
                user.password = hash;
                next()
            }); // hash에는 암호화된 비밀번호가 담긴다.
        });
    }
})
// next는 model을 save하는 곳으로 보내주는 function이다.

const User = mongoose.model('Boileruser', userSchema)

module.exports = { User }