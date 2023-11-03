const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    message: String,
    timestamp: Date
});

const messagesSchema = new Schema({
    number: String,
    messages: [{
        message: String,
        timestamp: Date
    }]
});

const whatsappModel = mongoose.model('whatsapp', messagesSchema);

module.exports = whatsappModel;
