import { gql } from '@apollo/client';

export const PRODUCT_FIELDS = gql`
  fragment ProductFields on Product {
    id
    name
    description
    specification
    image
    upload
    kitchen
    price
    createdAt
    updatedAt
  }
`;

export const VARIANT_FIELDS = gql`
  fragment VariantFields on Variant {
    id
    active
    code
    name
    price
    createdAt
    updatedAt
  }
`;
