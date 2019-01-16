const mongoose = require('mongoose');


const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = mongoose.Schema({
    username: String,
    password: String,
    following: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    followers: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', UserSchema);