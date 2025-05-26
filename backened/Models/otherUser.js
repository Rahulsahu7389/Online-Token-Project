const mongoose = require('mongoose');
const schema = mongoose.Schema;
const userSchema = new schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    token:{
        type:Number,
    }
});

const otherUserModel = mongoose.model('otherusers', userSchema);
module.exports = otherUserModel;
