import { gql } from '@apollo/client';

export const CHANNEL_TABLE_FIELDS = gql`
  fragment ChannelTableFields on ChannelTable {
    id
    code
    name
    active
  }
`;
