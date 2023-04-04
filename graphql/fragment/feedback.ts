import { gql } from '@apollo/client';

export const FEEDBACK_FIELDS = gql`
  fragment FeedbackFields on Feedback {
    id
    name
    phone
    comment
    isRead
    createdAt
    updatedAt
  }
`;
