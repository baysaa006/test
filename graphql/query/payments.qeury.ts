import { gql } from '@apollo/client';

export const GET_PAYMENTS = gql`
  {
    payments {
      id
      name
      type
    }
  }
`;
