import { gql } from '@apollo/client';

// ── Queries ──────────────────────────────────────────────────────────────────

export const GET_ALL_RECEIPTS = gql`
  query GetAllReceipts {
    getAllReceipts {
      id
      retailer
      purchaseDate
      purchaseTime
      total
      items {
        shortDescription
        price
      }
    }
  }
`;

export const GET_RECEIPT = gql`
  query GetReceipt($id: ID!) {
    getReceipt(id: $id) {
      id
      retailer
      purchaseDate
      purchaseTime
      total
      items {
        shortDescription
        price
      }
    }
  }
`;

export const GET_POINTS_BY_ID = gql`
  query GetPointsById($id: ID!) {
    getPointsById(id: $id) {
      id
      alphNumChar
      roundDollar
      totalMultipleOfQuarter
      pairItems
      oddDays
      peakTime
      totalPoints
    }
  }
`;

// ── Mutations ─────────────────────────────────────────────────────────────────

export const CREATE_RECEIPT = gql`
  mutation CreateReceipt(
    $retailer: String!
    $items: [ItemsInput]
    $purchaseDate: String
    $purchaseTime: String
  ) {
    createReceipt(
      retailer: $retailer
      items: $items
      purchaseDate: $purchaseDate
      purchaseTime: $purchaseTime
    ) {
      id
      retailer
      purchaseDate
      purchaseTime
      total
      items {
        shortDescription
        price
      }
    }
  }
`;

export const CREATE_POINTS = gql`
  mutation CreatePoints(
    $id: ID
    $alphNumChar: String
    $roundDollar: Boolean
    $totalMultipleOfQuarter: Float
    $pairItems: Int
    $oddDays: String
    $peakTime: String
  ) {
    createPoints(
      id: $id
      alphNumChar: $alphNumChar
      roundDollar: $roundDollar
      totalMultipleOfQuarter: $totalMultipleOfQuarter
      pairItems: $pairItems
      oddDays: $oddDays
      peakTime: $peakTime
    ) {
      id
      totalPoints
      alphNumChar
      roundDollar
      totalMultipleOfQuarter
      pairItems
      oddDays
      peakTime
    }
  }
`;
