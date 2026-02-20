import { gql } from "@apollo/client";

export const DELETE_PROJECT = gql`
  mutation deleteProject($projectID: UUID!) {
    deleteProject(input: { projectID: $projectID }) {
      ok
      project {
        id
      }
    }
  }
`;

export const TOGGLE_PROJECT_VISIBILITY = gql`
  mutation toggleProjectVisibility($projectID: UUID!, $isPublic: Boolean!) {
    toggleProjectVisibility(
      input: { projectID: $projectID, isPublic: $isPublic }
    ) {
      project {
        id
        publicOn
      }
    }
  }
`;

export const INVITE_PROJECT_MEMBERS = gql`
  mutation inviteProjectMembers($projectID: UUID!, $members: [MemberInvite!]!) {
    inviteProjectMembers(input: { projectID: $projectID, members: $members }) {
      ok
      invitedMembers {
        email
        invitedOn
      }
      members {
        id
        fullName
        profileIcon {
          url
          initials
          bgColor
        }
        username
        role {
          code
          name
        }
      }
    }
  }
`;

export const DELETE_PROJECT_MEMBER = gql`
  mutation deleteProjectMember($projectID: UUID!, $userID: UUID!) {
    deleteProjectMember(input: { projectID: $projectID, userID: $userID }) {
      ok
      member {
        id
      }
      projectID
    }
  }
`;

export const DELETE_INVITED_PROJECT_MEMBER = gql`
  mutation deleteInvitedProjectMember($projectID: UUID!, $email: String!) {
    deleteInvitedProjectMember(
      input: { projectID: $projectID, email: $email }
    ) {
      invitedMember {
        email
      }
    }
  }
`;

export const UPDATE_PROJECT_MEMBER_ROLE = gql`
  mutation updateProjectMemberRole(
    $projectID: UUID!
    $userID: UUID!
    $roleCode: RoleCode!
  ) {
    updateProjectMemberRole(
      input: { projectID: $projectID, userID: $userID, roleCode: $roleCode }
    ) {
      ok
      member {
        id
        role {
          code
          name
        }
      }
    }
  }
`;
