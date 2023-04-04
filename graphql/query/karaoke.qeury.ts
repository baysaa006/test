import { gql } from '@apollo/client';

export const GET_KARAOKE = gql`
  query getSongs($category: Int!) {
    getSongs(category: $category) {
      id
      name
      code
      artist
    }
  }
`;

export const GET_FEATURES = gql`
  query getFeatures($id: ID!) {
    getFeatures(id: $id) {
      id
      name
    }
  }
`;

export const GET_SONG_CATEGORIES = gql`
  {
    getSongCategories {
      code
      id
      name
      vendor
    }
  }
`;

export const SEARCH_SONGS = gql`
  query searchSongs($category: Int!, $query: String!) {
    searchSongs(category: $category, query: $query) {
      id
      code
      name
      artist
      version
      year
    }
  }
`;
