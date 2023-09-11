const { gql } = require("apollo-server-express");
const typeDefs = gql`

type Receipts {
    _id: ID
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
    _id: ID
alphNumChar: String
roundDollar: Boolean
totalMultipleOfQuarter: Float
pairItems: Int
trimmedLenghtItems: Int
oddDays: Boolean
peakTime: Boolean
totalPoints: Int

}

type Query {
    getReceipt(_id: ID!): Receipts
    getAllReceipts: [Receipts]
    getPoints(_id: ID!): Points
    getAllPoints: [Points]
}

type Mutation {
createReceipt(_id: ID,retailer: String!, items: [ItemsInput] , total: Float): Receipts
createPoints(_id: ID,alphNumChar: String, roundDollar: Boolean, totalMultipleOfQuarter: Float, pairItems: Int, trimmedLenghtItems: Int, oddDays: Boolean, peakTime: Boolean, totalPoints: Int): Points
}

`;



module.exports = typeDefs;
