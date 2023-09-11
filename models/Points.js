// build the Points model
// 
const mongoose = require('mongoose');

const {Schema} = mongoose;

const pointsSchema = new Schema({

    receiptId: String,
    points: Number,
    alphNumChar: String,
    roundDollar: Boolean,
    totalMultipleOfQuarter: Number,
    pairItems: Number,
    trimmedLenghtItems: Number,
    oddDays: Boolean,
    peakTime: Boolean,
    totalPoints: Number,
    

});

const Points = mongoose.model('Points', pointsSchema);
module.exports = { Points};