import { gql } from '@apollo/client';

export const GET_MENUS = gql`
  {
    menu {
      categories {
        id
        name
        sort
        active
        products {
          id
          name
          image
          specification
          description
          variants {
            id
            name
            price
            salePrice
            discount
          }
        }
      }
    }
  }
`;

export const GET_MENU_PRODUCTS_RECOMMENDATIONS = gql`
  query getMenuProductRecommendations($ids: [ID!]!, $menuId: ID!) {
    getMenuProductRecommendations(ids: $ids, menuId: $menuId) {
      id
      name
      image
      specification
      description
      active
      productId
      variants {
        active
        id
        name
        price
        salePrice
        discount
        options {
          active
          id
          price
          name
          type
          values
        }
      }
    }
  }
`;
