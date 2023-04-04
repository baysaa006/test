import { gql } from '@apollo/client';

export const SEARCH_LOCATIONS = gql`
  query searchLocations($query: String!, $lat: Float, $lon: Float) {
    searchLocations(query: $query, lat: $lat, lon: $lon) {
      address
      addressEn
      description
      district
      distance
      province
      region
    }
  }
`;
