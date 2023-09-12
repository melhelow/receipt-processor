// const { AuthenticationError } = require("apollo-server-express");
const { Receipts, Points} = require("../models");
const {calculateTotalPoints,
    calculatePeakTimePoints,
    calculateOddDayPoints,
    forPairedItems,
    totalMulOfQuarter,
    calculateRoundDollarPoints,
    alphNumCharResults,
    mapItemsFormat ,
    calculateTotalPrice, 
    getFormattedDate , 
    getFormattedTime
} = require("../utils/helpers");

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
        getTotalPoints: async (_, { alphNumChar, roundDollar, totalMultipleOfQuarter, pairItems, oddDays, peakTime }) => {
          const calculatedAlphNumChar = alphNumCharResults(alphNumChar);
          console.log('calculatedAlphNumChar:', calculatedAlphNumChar);
          const roundDollarPoints = calculateRoundDollarPoints(roundDollar);
          console.log('roundDollarPoints:', roundDollarPoints);
          const mulOfDollar = totalMulOfQuarter(totalMultipleOfQuarter);
          console.log('mulOfDollar:', mulOfDollar);
          const numOfPairedItems = forPairedItems(pairItems);
          console.log('numOfPairedItems:', numOfPairedItems);
          const oddDayPoints = calculateOddDayPoints(oddDays);
          console.log('oddDayPoints:', oddDayPoints);
          const peakTimePoints = calculatePeakTimePoints(peakTime);
          console.log('peakTimePoints:', peakTimePoints);
        
          const totalPoints = calculateTotalPoints([
            calculatedAlphNumChar,
            roundDollarPoints,
            mulOfDollar,
            numOfPairedItems,
            oddDayPoints,
            peakTimePoints,
          ]);
        
          return totalPoints;
        },

        
          
        
        
   
          //  getTotalPoints: async (_, args) => {
          //   const points = await Points.findById(args._id);
          //   if (!points) {
          //       throw new Error(`Receipt with ID ${args._id} not found`);
          //   }
          //   const {alphNumChar, roundDollar, totalMultipleOfQuarter, pairItems, oddDays, peakTime} = points;
          //    const pointsArray = [alphNumChar, roundDollar, totalMultipleOfQuarter, pairItems, oddDays, peakTime];
          //    const totalPoints = calculateTotalPoints(pointsArray);
          //       return totalPoints;
          //   },
        
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

        //   createPoints: async (_, { alphNumChar, roundDollar, totalMultipleOfQuarter, pairItems, oddDays, peakTime,points}) => {
        //     const calculatedAlphNumChar = alphNumCharResults(alphNumChar);
        //     console.log('calculatedAlphNumChar:', calculatedAlphNumChar); 
        //     const roundDollarPoints = calculateRoundDollarPoints(roundDollar);
        //     console.log('roundDollarPoints:', roundDollarPoints);
        //     const mulOfDollar = totalMulOfQuarter(totalMultipleOfQuarter);
        //     console.log('mulOfDollar:', mulOfDollar);
        //     const numOfPairedItems = forPairedItems(pairItems);
        //     console.log('numOfPairedItems:', numOfPairedItems);
        //     const oddDayPoints = calculateOddDayPoints(oddDays);
        //     console.log('oddDayPoints:', oddDayPoints);
        //     const peakTimePoints = calculatePeakTimePoints(peakTime);
        //     console.log('peakTimePoints:', peakTimePoints);
        //     const totalPoints = calculateTotalPoints([
        //       calculatedAlphNumChar,
        //       roundDollarPoints,
        //       mulOfDollar,
        //       numOfPairedItems,
        //       oddDayPoints,
        //       peakTimePoints,
        //     ]);
            


          
        //     try {
        //       const points = await Points.create({
        //         alphNumChar: calculatedAlphNumChar,
        //         roundDollar: roundDollarPoints,
        //         totalMultipleOfQuarter: mulOfDollar,
        //         pairItems: numOfPairedItems,
        //         oddDays: oddDayPoints,
        //         peakTime: peakTimePoints,
        //         totalpoints: totalPoints
                
        //       });
          
        //       return points;
        //     } catch (error) {
        //       throw new Error("No Points Created" + error.message);
        //     }
        //   }
        // },
        // };     
        
        createPoints: async (_, { alphNumChar, roundDollar, totalMultipleOfQuarter, pairItems, oddDays, peakTime }) => {
          const calculatedAlphNumChar = alphNumCharResults(alphNumChar);
          const roundDollarPoints = calculateRoundDollarPoints(roundDollar);
          const mulOfDollar = totalMulOfQuarter(totalMultipleOfQuarter);
          const numOfPairedItems = forPairedItems(pairItems);
          const oddDayPoints = calculateOddDayPoints(oddDays);
          const peakTimePoints = calculatePeakTimePoints(peakTime);
      
          const totalPoints = calculateTotalPoints([
            calculatedAlphNumChar,
            roundDollarPoints,
            mulOfDollar,
            numOfPairedItems,
            oddDayPoints,
            peakTimePoints,
          ]);
      
          const points = new Points({
            alphNumChar,
            roundDollar,
            totalMultipleOfQuarter,
            pairItems,
            oddDays,
            peakTime,
            totalPoints, 
          });
      
          try {
            await points.save(); 
            return { ...points._doc, _id: points.id, totalPoints }; 
          } catch (error) {
            throw new Error("Failed to create points: " + error.message);
          }
        },
      },
    };
          
          










module.exports = resolvers;
