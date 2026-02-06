import { gql } from "@apollo/client";

export const GET_DASHBOARD_DATA = gql`
  query GetDashboardData {
    me {
      user {
        id
        fullName
        username
        email
        profileIcon {
          initials
          bgColor
          url
        }
      }
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
    teams {
      id
      name
    }
  }
`;

export const GET_MY_TASKS = gql`
  query GetMyTasks($status: MyTasksStatus!, $sort: MyTasksSort!) {
    myTasks(input: { status: $status, sort: $sort }) {
      tasks {
        id
        shortId
        name
        complete
        taskGroup {
          id
          name
        }
      }
      projects {
        projectID
        taskID
      }
    }
  }
`;
