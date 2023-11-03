const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const channelSchema = new Schema({
    channels: Boolean,
    name: String,
    cuit: String,
    address: String,
    iva: String,
    owner: String,
    registered: String,
    status: Boolean,
    contacts: String
});

const channelsModel = mongoose.model('channels', channelSchema);

module.exports = channelsModel;
