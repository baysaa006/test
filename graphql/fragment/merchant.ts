import { gql } from '@apollo/client';

export const MERCHANT_FIELDS = gql`
  fragment MerchantFields on Merchant {
    id
    name
    domain
    phone
    email
    country
    province
    district
    address
    unit
    currency
    createdAt
    updatedAt
  }
`;
