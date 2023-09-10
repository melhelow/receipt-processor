const mongoose = require('mongoose');

const {Schema} = mongoose;

const receiptsSchema = new Schema({
    retailer: String,
    purchaseDate:{
        type: Date,
        default: Date.now
    },
    purchaseTime: String,
    items : [
        {shortDescription: String,
            price: Number,
        }
    ],
    total: Number,
});

const Receipts = mongoose.model('Receipts', receiptsSchema);
module.exports = { Receipts };