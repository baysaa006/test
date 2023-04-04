import { gql } from '@apollo/client';

export const TRANSACTION = gql`
  query getTransaction($id: ID!) {
    transaction(id: $id) {
        state
        links{
            name
            description
            logo
            link
        }}
    }
 
`;

