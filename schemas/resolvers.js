// const { AuthenticationError } = require("apollo-server-express");
const { Receipts, Points} = require("../models");
const {totalPoints,mapItemsFormat ,calculateTotalPrice, getFormattedDate , getFormattedTime} = require("../utils/helpers");

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
            const total = calculateTotalPrice(items);
            const mapItems = mapItemsFormat(items);
            console.log('Formatted Date:', formattedDate);

            try {
              const receipt = await Receipts.create({
                retailer,
                purchaseDate: formattedDate,
                purchaseTime: formattedTime,
                items: mapItems,
                total,
              });
        
              return receipt;
            } catch (error) {
              throw new Error("Failed to create receipt: " + error.message);
            }
          },

        

        
    
        createPoints: async (_,{ alphNumChar, roundDollar, totalMultipleOfQuarter, pairItems, trimmedLenghtItems, oddDays, peakTime, totalPoints }) => {
            const alphNumCharResults = totalPoints(Receipts);
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
            try {
            const points = await Points.create({
                alphNumChar:alphNumCharResults,
                roundDollar,
                totalMultipleOfQuarter,
                pairItems,
                trimmedLenghtItems,
                oddDays,
                peakTime,
                totalPoints,
            });
            return points;
        } catch (error) {
            throw new Error("Failed to create points: " + error.message);
        }
    }
    }
};









module.exports = resolvers;
