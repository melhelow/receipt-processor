// const { AuthenticationError } = require("apollo-server-express");
const { Receipts, Points} = require("../models");
const { getFormattedDate , getFormattedTime} = require("../utils/helpers");

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
   
        createReceipt: async (_, { retailer, items, purchaseDate, purchaseTime }) => {
            const formattedDate = getFormattedDate(purchaseDate);
            const formattedTime = getFormattedTime(purchaseTime);
            console.log('Formatted Date:', formattedDate);

            try {
              const receipt = await Receipts.create({
                retailer,
                purchaseDate: formattedDate,
                purchaseTime: formattedTime,
                items: items.map((ItemsInput) => ({
                  shortDescription: ItemsInput.shortDescription,
                  price: ItemsInput.price,
                })),
                total: items.reduce((accumulator, item) => accumulator + item.price, 0),
              });
        
              return receipt;
            } catch (error) {
              throw new Error("Failed to create receipt: " + error.message);
            }
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
