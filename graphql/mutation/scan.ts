import { gql } from '@apollo/client';

export const CURRENT_TOKEN = gql`
  mutation getToken($code: String) {
    getToken(code: $code) {
      token
    }
  }
`;
