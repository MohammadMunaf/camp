const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        require: true,
        unique: true
    }
});

UserSchema.plugin(passportLocalMongoose);  //this will add username,field for passport,salt to our schema

module.exports = mongoose.model('User', UserSchema)