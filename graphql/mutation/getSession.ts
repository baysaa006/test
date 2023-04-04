import { gql } from '@apollo/client';

export const GET_SESSION = gql`
  mutation getSession($phone: String!, $type: SessionType!) {
    getSession(phone: $phone, type: $type)
  }
`;

export const VERIFY_SESSION = gql`
  mutation verifySession($id: String!, $pin: String!) {
    verifySession(id: $id, pin: $pin)
  }
`;

export const UPDATE_PHONE = gql`
  mutation updatePhone($pin: String!, $session: String!) {
    updatePhone(pin: $pin, session: $session)
  }
`;

export const UPDATE_PROFILE = gql`
  mutation updateProfile($input: ProfileInput!) {
    updateProfile(input: $input) {
      id
      gender
      firstName
      lastName
      email
      createdAt
    }
  }
`;