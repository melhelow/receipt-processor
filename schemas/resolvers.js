// const { AuthenticationError } = require("apollo-server-express");
const { Receipts, Points} = require("../models");
const {calculateRoundDollarPoints,alphNumCharResults,mapItemsFormat ,calculateTotalPrice, getFormattedDate , getFormattedTime} = require("../utils/helpers");

const resolvers = {
    Query: {
        getReceipt: async (parent, args) => {
            return await Receipts.findById(args._id);
        },
        getAllReceipts: async () => {
            return Receipts.find();
        },
        getPoints: async (parent, args) => {
            console.log(args);
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

          createPoints: async (_, { alphNumChar, roundDollar }) => {
            const calculatedAlphNumChar = alphNumCharResults(alphNumChar);
            console.log('calculatedAlphNumChar:', calculatedAlphNumChar); 
            const roundDollarPoints = calculateRoundDollarPoints(roundDollar);
            console.log('roundDollarPoints:', roundDollarPoints);

          
            try {
              const points = await Points.create({
                alphNumChar: calculatedAlphNumChar,
                roundDollar: roundDollarPoints,
                
              });
          
              return points;
            } catch (error) {
              throw new Error("No Points Created" + error.message);
            }
          }
        },
        };          
          
          










module.exports = resolvers;
