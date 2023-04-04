import { gql } from '@apollo/client';
import { ORDER_FIELDS, ORDER_ITEM_FIELDS } from '../fragment/order';
import { TABLE_FIELDS } from '../fragment/table';
import { TRANSACTION_FIELDS } from '../fragment/transaction';

export const GET_PAY_ORDER = gql`
  mutation payOrder($input: TransactionInput!) {
    payOrder(input: $input) {
      order {
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
      }
      transaction {
        ...TransactionFields
      }
    }
  }
  ${ORDER_FIELDS}
  ${TABLE_FIELDS}
  ${ORDER_ITEM_FIELDS}
  ${TRANSACTION_FIELDS}
`;

export const GONFIRM_ORDER = gql`
  mutation confirmOrder($id: ID!) {
    confirmOrder(id: $id) {
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
    }
  }
  ${ORDER_FIELDS}
  ${ORDER_ITEM_FIELDS}
  ${TRANSACTION_FIELDS}
  ${TABLE_FIELDS}
`;

export const CANCEL_ORDER = gql`
  mutation cancelOrder($id: ID!) {
    cancelOrder(id: $id)
  }
`;

export const COMPLETE_ORDER = gql`
  mutation completeOrder($id: ID!) {
    completeOrder(id: $id) {
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
    }
  }
  ${ORDER_FIELDS}
  ${ORDER_ITEM_FIELDS}
  ${TRANSACTION_FIELDS}
  ${TABLE_FIELDS}
`;
