import { gql } from '@apollo/client';

export const CATEGORY_FIELDS = gql`
  fragment CategoryFields on Category {
    id
    name
  }
`;
