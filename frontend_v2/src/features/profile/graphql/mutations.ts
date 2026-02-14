import { gql } from "@apollo/client";

export const UPDATE_USER_INFO = gql`
  mutation updateUserInfo(
    $name: String!
    $initials: String!
    $email: String!
    $bio: String!
  ) {
    updateUserInfo(
      input: { name: $name, initials: $initials, email: $email, bio: $bio }
    ) {
      user {
        id
        email
        fullName
        bio
        profileIcon {
          initials
        }
      }
    }
  }
`;

export const UPDATE_USER_PASSWORD = gql`
  mutation updateUserPassword($userID: UUID!, $password: String!) {
    updateUserPassword(input: { userID: $userID, password: $password }) {
      ok
    }
  }
`;
