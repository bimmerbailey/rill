import { gql } from "@apollo/client";

export const GET_PROJECTS = gql`
  query GetProjects {
    organizations {
      id
      name
    }
    teams {
      id
      name
      createdAt
    }
    projects {
      id
      shortId
      name
      team {
        id
        name
      }
    }
  }
`;

export const CREATE_PROJECT = gql`
  mutation CreateProject($teamID: UUID, $name: String!) {
    createProject(input: { teamID: $teamID, name: $name }) {
      id
      shortId
      name
      team {
        id
        name
      }
    }
  }
`;

export const CREATE_TEAM = gql`
  mutation CreateTeam($name: String!, $organizationID: UUID!) {
    createTeam(input: { name: $name, organizationID: $organizationID }) {
      id
      createdAt
      name
    }
  }
`;

export const GET_PROJECT_BOARD = gql`
  query GetProjectBoard($projectID: UUID!) {
    findProject(input: { projectID: $projectID }) {
      id
      name
      taskGroups {
        id
        name
        position
        tasks {
          id
          name
          position
        }
      }
    }
  }
`;

export const CREATE_TASK_GROUP = gql`
  mutation CreateTaskGroup(
    $projectID: UUID!
    $name: String!
    $position: Float!
  ) {
    createTaskGroup(
      input: { projectID: $projectID, name: $name, position: $position }
    ) {
      id
      name
      position
    }
  }
`;

export const CREATE_TASK = gql`
  mutation CreateTask(
    $taskGroupID: UUID!
    $name: String!
    $position: Float!
    $assigned: [UUID!]
  ) {
    createTask(
      input: {
        taskGroupID: $taskGroupID
        name: $name
        position: $position
        assigned: $assigned
      }
    ) {
      id
      name
      position
    }
  }
`;
