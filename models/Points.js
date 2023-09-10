const mongoose = require('mongoose');

const {Schema} = mongoose;

const pointsSchema = new Schema({

    receiptId: String,
    points: Number,

});

module.exports = mongoose.model('Points', pointsSchema);