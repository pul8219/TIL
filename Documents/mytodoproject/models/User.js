const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        email:{
            type: String,
            required: true,
        },
        name: String
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User', userSchema);

// const User = mongoose.model('User', userSchema);
// export default User;