import { gql } from "@apollo/client";

export const DELETE_TEAM = gql`
  mutation deleteTeam($teamID: UUID!) {
    deleteTeam(input: { teamID: $teamID }) {
      ok
      team {
        id
      }
    }
  }
`;

export const CREATE_TEAM_MEMBER = gql`
  mutation createTeamMember($userID: UUID!, $teamID: UUID!) {
    createTeamMember(input: { userID: $userID, teamID: $teamID }) {
      team {
        id
      }
      teamMember {
        id
        username
        fullName
        role {
          code
          name
        }
        profileIcon {
          url
          initials
          bgColor
        }
      }
    }
  }
`;

export const DELETE_TEAM_MEMBER = gql`
  mutation deleteTeamMember($teamID: UUID!, $userID: UUID!, $newOwnerID: UUID) {
    deleteTeamMember(
      input: { teamID: $teamID, userID: $userID, newOwnerID: $newOwnerID }
    ) {
      teamID
      userID
    }
  }
`;

export const UPDATE_TEAM_MEMBER_ROLE = gql`
  mutation updateTeamMemberRole(
    $teamID: UUID!
    $userID: UUID!
    $roleCode: RoleCode!
  ) {
    updateTeamMemberRole(
      input: { teamID: $teamID, userID: $userID, roleCode: $roleCode }
    ) {
      member {
        id
        role {
          code
          name
        }
      }
      teamID
    }
  }
`;
