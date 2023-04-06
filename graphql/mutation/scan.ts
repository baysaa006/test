import { gql } from '@apollo/client';

export const CURRENT_TOKEN = gql`
  mutation getBuyerToken($pin: String, $code: String) {
    getBuyerToken(pin: $pin, code: $code) {
      token
    }
  }
`;
