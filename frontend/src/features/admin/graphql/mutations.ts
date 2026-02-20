import { gql } from "@apollo/client";

export const UPDATE_USER_ROLE = gql`
  mutation updateUserRole($userID: UUID!, $roleCode: RoleCode!) {
    updateUserRole(input: { userID: $userID, roleCode: $roleCode }) {
      user {
        id
        role {
          code
          name
        }
      }
    }
  }
`;
