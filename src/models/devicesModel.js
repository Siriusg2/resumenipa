const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const devicesSchema = new Schema({

    selected: Boolean,
    icon: String,
    status: Boolean,
    sim: Number,
    contacts: String,
    sos: Boolean,
    name: String,
    dId: String,
    templateId: String,
    templateName: String,
    lat: String,
    lastUbication: String,
    userId: String,
    createdTime: Number,
    password: String,
    lng: String,
    data: String,

});

const devicesModel = mongoose.model('devices', devicesSchema);

module.exports = devicesModel;
