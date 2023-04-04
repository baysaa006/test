import { gql } from '@apollo/client';

export const CHANNEL_FIELDS = gql`
  fragment ChannelFields on Channel {
    id
    name
    type
    menuId
    services
    createdAt
    updatedAt
    orderable
    deliveryRangeSize
    deliveryRangeState
    payments {
      id
      name
    }
    advancePayment
    active
  }
`;
