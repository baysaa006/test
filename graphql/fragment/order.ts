import { gql } from '@apollo/client';

export const ORDER_FIELDS = gql`
  fragment OrderFields on Order {
    id
    type
    date
    number
    state
    reviewed
    branchId
    customerId
    isRead
    paymentState
    address
    contact
    comment
    deliveryDate
    totalAmount
    discountAmount
    taxAmount
    grandTotal
    paidAmount
    debtAmount
    createdAt
    updatedAt
    register
    buyer
    vatState
    vatType
    vatAmount
    cityTax
    vatBillId
    vatDate
    vatLottery
    vatData
  }
`;

export const ORDER_ITEM_OPTION_FIELDS = gql`
  fragment OrderItemOptionFields on OrderItemOption {
    id
    value
    price
    name
  }
`;

export const ORDER_ITEM_FIELDS = gql`
  fragment OrderItemFields on OrderItem {
    id
    state
    quantity
    comment
    reason
    name
    price
    discount
    createdAt
    updatedAt
    completedAt
    image
    options {
      id
      value
      price
      name
    }
  }
`;

export const DISCOUNTS_FIELDS = gql`
  fragment DiscountsFields on OrderDiscount {
    amount
    calculation
    createdAt
    discountId
    state
    id
    name
    type
    updatedAt
    value
  }
`;

export const CHARGES_FIELDS = gql`
  fragment ChargesFields on OrderCharge {
    calculation
    amount
    createdAt
    id
    state
    name
    chargeId
    type
    value
    updatedAt
  }
`;
export const ORDER_REVIEW_FIELDS = gql`
  fragment OrderReviewFields on OrderReview {
    id
    createdAt
    updatedAt
    type
    liked
    comment
    additional
  }
`;

// export const ORDER_SUMMARY_FIELDS = gql`
//   fragment OrderSummaryFields on OrderSummary {
//     date
//     average
//     count
//     total
//   }
// `;
