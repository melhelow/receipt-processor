const { gql } = require("apollo-server-express");
const typeDefs = gql`

type Receipts {
    _id: ID
    retailer: String
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
alphNumChar: Int
roundDollar: Int
totalMultipleOfQuarter: Float
pairItems: Int
trimmedLenghtItems: Int
oddDays: Int
peakTime: Int
totalPoints: Int

}

type Query {
    getReceipt(_id: ID!): Receipts
    getAllReceipts: [Receipts]
    getPoints(_id: ID!): Points
    getAllPoints: [Points]
}

type Mutation {
createReceipt(retailer: String!, items: [ItemsInput] , total: Float): Receipts
createPoints(alphNumChar: Int, roundDollar: Int, totalMultipleOfQuarter: Float, pairItems: Int, trimmedLenghtItems: Int, oddDays: Int, peakTime: Int, totalPoints: Int): Points
}

`;



module.exports = typeDefs;
