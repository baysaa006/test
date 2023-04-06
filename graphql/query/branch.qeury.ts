import { gql } from '@apollo/client';

export const GET_BRANCHES = gql`
  {
    getParticipantBuyers {
      id
      branch {
        id
        type
        name
        description
        background
        logo
        dayClose
        phone
        email
        address
        services
        tags {
          name
          icon
        }
        timetable {
          fri
          friClose
          friOpen
          id
          mon
          monClose
          monOpen
          sat
          satClose
          satOpen
          sun
          sunClose
          sunOpen
          thu
          thuClose
          thuOpen
          tue
          tueClose
          tueOpen
          updatedAt
          wedClose
          wed
          wedOpen
        }
      }
    }
  }
`;

export const GET_BRANCH = gql`
  query getParticipantBuyer {
    getParticipantBuyer {
      id
      branch {
        id
        type
        name
        banner
        background
        description
        logo
        dayClose
        facebook
        phone
        email
        latitude
        longitude
        instagram
        website
        address
        images
        tags {
          name
          icon
        }
        timetable {
          fri
          friClose
          friOpen
          id
          mon
          monClose
          monOpen
          sat
          satClose
          satOpen
          sun
          sunClose
          sunOpen
          thu
          thuClose
          thuOpen
          tue
          tueClose
          tueOpen
          updatedAt
          wedClose
          wed
          wedOpen
        }
      }

      menu {
        name
        categories {
          name
          sort
          active
          color
          icon
          id
          children {
            name
            sort
            active
            color
            icon
            id
            products {
              name
              active
              description
              id
              image
              specification
              variants {
                active
                discount
                id
                name
                price
                salePrice
                unitValue
                unitType
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
          products {
            name
            active
            description
            id
            image
            specification
            variants {
              active
              discount
              id
              name
              price
              salePrice
              unitValue
              unitType
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
        description
        id
      }
      buyer {
        id
        menuId
        name
        code
        logo
        upload
        email
        address
        phone
        register
      }
    }
  }
`;
