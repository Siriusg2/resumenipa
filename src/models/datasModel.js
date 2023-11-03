const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const datasSchema = new Schema({

    value: Number,
    data: String,
    userId: String,
    dId: String,
    variable: String,
    time: Number,
    lat: String,
    lng: String
});

const datasModel = mongoose.model('datas', datasSchema);

module.exports = datasModel;
