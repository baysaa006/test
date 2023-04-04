import { gql } from '@apollo/client';
import {
  CHARGES_FIELDS,
  CUSTOMER_FIELDS,
  DISCOUNTS_FIELDS,
  ORDER_FIELDS,
  ORDER_ITEM_FIELDS,
  ORDER_REVIEW_FIELDS,
  TABLE_FIELDS,
  TRANSACTION_FIELDS,
} from '../fragment';

export const GET_ORDERS = gql`
  {
    getSales {
      branch {
        id
        logo
        type
        name
      }
      ...OrderFields
      table {
        ...TableFields
      }
      items {
        ...OrderItemFields
      }
      transactions {
        ...TransactionFields
      }
      discounts {
        ...DiscountsFields
      }
      charges {
        ...ChargesFields
      }
    }
  }
  ${TABLE_FIELDS}
  ${ORDER_FIELDS}
  ${DISCOUNTS_FIELDS}
  ${CHARGES_FIELDS}
  ${ORDER_ITEM_FIELDS}
  ${TRANSACTION_FIELDS}
`;

export const GET_ORDER = gql`
  query getOrder($id: ID!) {
    getOrder(id: $id) {
      branch {
        id
        logo
        type
        name
      }
      ...OrderFields
      table {
        ...TableFields
      }
      items {
        ...OrderItemFields
      }
      transactions {
        ...TransactionFields
      }
      discounts {
        ...DiscountsFields
      }
      charges {
        ...ChargesFields
      }
    }
  }
  ${TABLE_FIELDS}
  ${ORDER_FIELDS}
  ${DISCOUNTS_FIELDS}
  ${CHARGES_FIELDS}
  ${ORDER_ITEM_FIELDS}
  ${TRANSACTION_FIELDS}
`;

export const GET_ORDER_REVIEWS = gql`
  query getOrderReviewsByLimit($offset: Int, $limit: Int) {
    getOrderReviewsByLimit(offset: $offset, limit: $limit) {
      id
      createdAt
      updatedAt
      type

      liked
      comment
      additional
      pictures
      uploads
      order {
        ...OrderFields
      }
      customer {
        ...CustomerFields
      }
    }
  }
  ${CUSTOMER_FIELDS}
  ${ORDER_FIELDS}
`;

// export const GET_ORDER_REVIEW = gql`
//   query getOrderReview($id: ID!) {
//     id
//     createdAt
//     updatedAt
//     order
//     customer
//     type
//     liked
//     comment
//     additional
//     pictures
//     upload
//   }
// `;
