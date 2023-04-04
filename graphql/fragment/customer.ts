import { gql } from '@apollo/client';

export const CUSTOMER_FIELDS = gql`
  fragment CustomerFields on Customer {
    id
    firstName
    phone
    email
    birthday
  }
`;
