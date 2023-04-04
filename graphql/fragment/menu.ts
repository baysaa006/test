import { gql } from '@apollo/client';

export const MENU_FIELDS = gql`
  fragment MenuFields on Menu {
    id
    name
    description
  }
`;

export const MENU_CATEGORY_FIELDS = gql`
  fragment MenuCategoryFields on MenuCategory {
    id
    icon
    color
    name
    sort
    color
    active
  }
`;

export const MENU_PRODUCT_FIELDS = gql`
  fragment MenuProductFields on MenuProduct {
    id
    name
    description
    specification
    image
    active
    productId
    sort
  }
`;

export const MENU_VARIANT_FIELDS = gql`
  fragment MenuVariantFields on MenuVariant {
    id
    name
    price
    salePrice
    discount
    active
  }
`;
