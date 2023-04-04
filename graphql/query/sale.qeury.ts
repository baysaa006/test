import { gql } from '@apollo/client';
import {
  TABLE_FIELDS,
  ORDER_FIELDS,
  DISCOUNTS_FIELDS,
  CHARGES_FIELDS,
  ORDER_ITEM_FIELDS,
  TRANSACTION_FIELDS,
} from '../fragment';
import { SALE_FIELDS, SALE_ITEM_FIELDS } from '../fragment/sale';

export const GET_SALES = gql`
  {
    getSales {
      ...SaleFields
      items {
        ...SaleItemFields
      }
    }
  }
  ${SALE_FIELDS}
  ${SALE_ITEM_FIELDS}
`;

export const GET_SALE = gql`
  query getSale($id: ID!) {
    getSale(id: $id) {
      ...SaleFields
      items {
        ...SaleItemFields
      }
    }
  }
  ${SALE_FIELDS}
  ${SALE_ITEM_FIELDS}
`;
