import { gql } from '@apollo/client';

export const DEVICE_FIELDS = gql`
  fragment DeviceFields on Device {
    id
    key
    name
    type
  }
`;
