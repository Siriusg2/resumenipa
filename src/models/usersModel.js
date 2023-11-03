const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    lastlogin: String,
    name: String,
    email: String,
    password: String,
    role: String,
    profile: String,
    status: Boolean,
    registered: String,
    lock: String,
    channel: String,
    owner: String,
    history: {
        create: {
            user: String,
            register: Number
        },
        modify: {
            user: String,
            register: Number
        },
        delete: {
            user: String,
            register: Number
        }
    }
});

const UserModel = mongoose.model('users', userSchema);

module.exports = UserModel;
