import { gql } from '@apollo/client';
import { ORDER_FIELDS, TABLE_FIELDS, ORDER_ITEM_FIELDS, TRANSACTION_FIELDS } from '../fragment';
import { SALE_FIELDS, SALE_ITEM_FIELDS } from '../fragment/sale';

export const GET_PAY_SALE = gql`
  mutation confirmSale($id: ID!, $pin: String!, $preOrderDate: AWSDate, $comment: String) {
    confirmSale(id: $id, pin: $pin, preOrderDate: $preOrderDate, comment: $comment) {
      ...SaleFields
      items {
        ...SaleItemFields
      }
    }
  }
  ${SALE_FIELDS}
  ${SALE_ITEM_FIELDS}
`;
export const CANCEL_SALE = gql`
  mutation cancelSale($id: ID!) {
    cancelSale(id: $id)
  }
`;
