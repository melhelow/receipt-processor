// build the Points model
// 
const mongoose = require('mongoose');

const {Schema} = mongoose;

const pointsSchema = new Schema({

    receiptId: String,
    points: Number,
    alphNumChar: String,
    roundDollar: Number,
    totalMultipleOfQuarter: Number,
    pairItems: Number,
    trimmedLenghtItems: Number,
    oddDays: Boolean,
    peakTime: Boolean,
    


});

const Points = mongoose.model('Points', pointsSchema);
module.exports = { Points};