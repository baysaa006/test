import { gql } from '@apollo/client';
import {
  CHARGES_FIELDS,
  DISCOUNTS_FIELDS,
  ORDER_FIELDS,
  ORDER_ITEM_FIELDS,
  ORDER_REVIEW_FIELDS,
  TABLE_FIELDS,
  TRANSACTION_FIELDS,
} from '../fragment';

export const CREATE_ORDER = gql`
  mutation createOrder($id: ID, $input: OrderInput!, $participant: ID!) {
    createOrder(id: $id, input: $input, participant: $participant) {
      ...OrderFields
      items {
        ...OrderItemFields
      }
      transactions {
        ...TransactionFields
      }
      table {
        ...TableFields
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
