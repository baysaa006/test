import { gql } from '@apollo/client';
import { TIMETABLE_FIELDS } from './timetable';

export const DISCOUNT_FIELDS = gql`
  fragment DiscountFields on Discount {
    id
    name
    calculation
    value
    setMaxAmount
    maxAmount
    auto
    branch {
      id
      name
    }
    channels {
      id
      name
    }
    services
    allProducts
    categories {
      id
      name
    }
    setMinPrice
    minPrice
    setTimetable
    timetable {
      ...TimeTableFields
    }
    setDateRange
    startDate
    endDate
  }
  ${TIMETABLE_FIELDS}
`;
