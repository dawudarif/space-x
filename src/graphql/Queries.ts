import { gql } from '@apollo/client';

export const GET_PAST_LAUNCHES = gql`
  query LaunchesPast {
    launchesPast {
      id
      details
      launch_date_utc
      mission_name
      rocket {
        rocket_name
        rocket {
          boosters
          engines {
            number
            layout
          }
        }
      }
    }
  }
`;
