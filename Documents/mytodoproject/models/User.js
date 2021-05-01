const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const { Schema } = mongoose;

const todoSchema = new Schema({
    contents: String,
    isCompleted: Boolean,
});

const userSchema = new Schema(
    {
        // email:{
        //     type: String,
        //     required: true,
        // },
        name: String,
        todoList: [todoSchema],
    },
);

module.exports = mongoose.model('User', userSchema);

// const User = mongoose.model('User', userSchema);
// export default User;