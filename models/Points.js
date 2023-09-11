// build the Points model
// 
const mongoose = require('mongoose');

const {Schema} = mongoose;

const pointsSchema = new Schema({

    receiptId: String,
    points: Number,

});

const Points = mongoose.model('Points', pointsSchema);
module.exports = { Points};