import { gql } from '@apollo/client';
import {
  CUSTOMER_FIELDS,
  ORDER_FIELDS,
  ORDER_REVIEW_FIELDS,
} from '../fragment';

export const CREATE_ORDER_REVIEW = gql`
  mutation createOrderReview($id: ID!, $input: OrderReviewInput!) {
    createOrderReview(id: $id, input: $input) {
      ...OrderReviewFields
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
  ${ORDER_REVIEW_FIELDS}
`;
