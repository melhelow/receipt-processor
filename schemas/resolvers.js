// const { AuthenticationError } = require("apollo-server-express");
const { Receipts, Points} = require("../models");

const resolvers = {
    Query: {
        getReceipt: async (parent, args) => {
            return await Receipts.findById(args._id);
        },
        getAllReceipts: async () => {
            return Receipts.find();
        },
        getPoints: async (parent, args) => {
            return await Points.findById(args._id);
        },
        getAllPoints: async () => {
            return Points.find();
        },
    },
    Mutation: {
        createReceipt:  (_, {retailer, items,purchaseDate ,purchaseTime,total  }) => {
     
            const receipt = {
                retailer,
                purchaseDate,
                purchaseTime,
                items : items.map((itemInput) => ({
                    shortDescription: itemInput.shortDescription,
                    price: itemInput.price,
                })),

                total,
            };
            return receipt;
        },
    
        createPoints: async (parent, { alphNumChar, roundDollar, totalMultipleOfQuarter, pairItems, trimmedLenghtItems, oddDays, peakTime, totalPoints }) => {
            console.log({
                alphNumChar,
                roundDollar,
                totalMultipleOfQuarter,
                pairItems,
                trimmedLenghtItems,
                oddDays,
                peakTime,
                totalPoints,
            });
            const points = await Points.create({
                alphNumChar,
                roundDollar,
                totalMultipleOfQuarter,
                pairItems,
                trimmedLenghtItems,
                oddDays,
                peakTime,
                totalPoints,
            });
            return points;
        },
    }

};









module.exports = resolvers;