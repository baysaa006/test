import { gql } from '@apollo/client';

export const GET_TOKEN = gql`
  mutation ($code: String) {
    getToken(code: $code) {
      token
      id
    }
  }
`;
