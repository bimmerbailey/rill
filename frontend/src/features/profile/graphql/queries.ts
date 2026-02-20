import { gql } from "@apollo/client";

export const GET_MY_PROFILE = gql`
  query GetMyProfile {
    me {
      user {
        id
        fullName
        username
        email
        bio
        profileIcon {
          initials
          bgColor
          url
        }
      }
      teamRoles {
        teamID
        roleCode
      }
      projectRoles {
        projectID
        roleCode
      }
    }
  }
`;
