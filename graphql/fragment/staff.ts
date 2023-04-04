import { gql } from '@apollo/client';

export const STAFF_FIELDS = gql`
  fragment StaffFields on Staff {
    id
    name
    firstName
    lastName
    phone
    email
    username
    roles
    state
  }
`;
