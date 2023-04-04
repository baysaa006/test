import { SALE_FIELDS, SALE_ITEM_FIELDS } from './../fragment/sale';
import { gql } from '@apollo/client';
import {
  CHARGES_FIELDS,
  DISCOUNTS_FIELDS,
  ORDER_FIELDS,
  ORDER_ITEM_FIELDS,
  TABLE_FIELDS,
  TRANSACTION_FIELDS,
} from '../fragment';

export const ON_TRACK_ORDER = gql`
  subscription onTrackSale($buyer: ID!) {
    onTrackSale(buyer: $buyer) {
      branch
      buyer
      event
      id
      sale {
        ...SaleFields
        items {
          ...SaleItemFields
        }
      }
    }
  }
  ${SALE_FIELDS}
  ${SALE_ITEM_FIELDS}
`;
