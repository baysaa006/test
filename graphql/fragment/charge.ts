import { gql } from '@apollo/client';

export const CHARGE_FIELDS = gql`
  fragment ChargeFields on Charge {
    id
    name
    branch {
      id
      name
    }
    channels {
      id
      name
    }
    calculation
    value
    setMinAmount
    minAmount
    auto
    services
    setPriceRange
    minPrice
    maxPrice
    allProducts
    categories {
      id
    }
  }
`;
