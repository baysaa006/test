import { gql } from '@apollo/client';

export const SALE_FIELDS = gql`
  fragment SaleFields on Sale {
    id
    branchId
    buyerId
    createdAt
    updatedAt
    orderedAt
    acceptedAt
    deliveringAt
    deliveredAt
    completedAt
    cancelledAt
    number
    date
    state
    paymentState
    isRead
    comment
    deliveryDate
    totalAmount
    grandTotal
    name
    address
    contact
    register
  }
`;
export const SALE_ITEM_FIELDS = gql`
  fragment SaleItemFields on SaleItem {
    id
    createdAt
    updatedAt
    state
    name
    type
    variantName
    image
    quantity
    actuallyQuantity
    price
    total
    comment
    reason
    unitType
    unitValue
  }
`;
