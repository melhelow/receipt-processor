// build the Points model
// 
const mongoose = require('mongoose');

const {Schema} = mongoose;

const pointsSchema = new Schema({

    receiptId: String,
    totalpoints: Number,
    alphNumChar: String,
    roundDollar: Number,
    totalMultipleOfQuarter: Number,
    pairItems: Number,
    trimmedLenghtItems: Number,
    oddDays: String,
    peakTime: String,
    


});

const Points = mongoose.model('Points', pointsSchema);
module.exports = { Points};