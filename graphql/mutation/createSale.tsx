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

export const CREATE_SALE = gql`
  mutation createSale($input: SaleInput!) {
    createSale(input: $input) {
      ...SaleFields
      items {
        ...SaleItemFields
      }
    }
  }
  ${SALE_FIELDS}
  ${SALE_ITEM_FIELDS}
`;
