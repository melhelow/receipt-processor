const { gql } = require("apollo-server-express");
const typeDefs = gql`

type Receipts {
    id: ID
    retailer: String
    purchaseDate: String
    purchaseTime: String
    items: [Items]
    total: Float
    }

    type Items {
        shortDescription: String
        price: Float
    }

input ItemsInput {
shortDescription: String
price: Float
}

type Points {
  id: ID
  alphNumChar: String
  roundDollar: Boolean
  totalMultipleOfQuarter: Float
  pairItems: Int
  trimmedLenghtItems: Int
  oddDays: String
  peakTime: String
  totalPoints: Int  
}


type Query {
    
    getReceipt(id: ID!): Receipts
    getAllReceipts: [Receipts]
    getPointsById(id: ID!): Points
    getTotalPoints: Int 
    getCalculatedTotalPoints(
    alphNumChar: String
    roundDollar: Boolean
    totalMultipleOfQuarter: Float
    pairItems: Int
    oddDays: String
    peakTime: String
  ): Int
}

type Mutation {
createReceipt(id: ID,retailer: String!, items: [ItemsInput] , total: Float): Receipts
createPoints(id: ID,alphNumChar: String, roundDollar: Boolean, totalMultipleOfQuarter: Float, pairItems: Int, trimmedLenghtItems: Int, oddDays: String, peakTime: String, totalPoints: Int): Points
}

`;



module.exports = typeDefs;
