import { gql } from "@apollo/client";

export const CREATE_TASK_COMMENT = gql`
  mutation CreateTaskComment($taskID: UUID!, $message: String!) {
    createTaskComment(input: { taskID: $taskID, message: $message }) {
      taskID
      comment {
        id
        message
        pinned
        createdAt
        updatedAt
        createdBy {
          id
          fullName
          profileIcon {
            initials
            bgColor
            url
          }
        }
      }
    }
  }
`;

export const UPDATE_TASK_COMMENT = gql`
  mutation UpdateTaskComment($commentID: UUID!, $message: String!) {
    updateTaskComment(input: { commentID: $commentID, message: $message }) {
      taskID
      comment {
        id
        message
        updatedAt
      }
    }
  }
`;

export const DELETE_TASK_COMMENT = gql`
  mutation DeleteTaskComment($commentID: UUID!) {
    deleteTaskComment(input: { commentID: $commentID }) {
      taskID
      commentID
    }
  }
`;

export const CREATE_TASK_CHECKLIST = gql`
  mutation CreateTaskChecklist(
    $taskID: UUID!
    $name: String!
    $position: Float!
  ) {
    createTaskChecklist(
      input: { taskID: $taskID, name: $name, position: $position }
    ) {
      id
      name
      position
      items {
        id
        name
        taskChecklistID
        complete
        position
      }
    }
  }
`;

export const DELETE_TASK_CHECKLIST = gql`
  mutation DeleteTaskChecklist($taskChecklistID: UUID!) {
    deleteTaskChecklist(input: { taskChecklistID: $taskChecklistID }) {
      ok
      taskChecklist {
        id
      }
    }
  }
`;

export const UPDATE_TASK_CHECKLIST_NAME = gql`
  mutation UpdateTaskChecklistName($taskChecklistID: UUID!, $name: String!) {
    updateTaskChecklistName(
      input: { taskChecklistID: $taskChecklistID, name: $name }
    ) {
      id
      name
    }
  }
`;

export const CREATE_TASK_CHECKLIST_ITEM = gql`
  mutation CreateTaskChecklistItem(
    $taskChecklistID: UUID!
    $name: String!
    $position: Float!
  ) {
    createTaskChecklistItem(
      input: {
        taskChecklistID: $taskChecklistID
        name: $name
        position: $position
      }
    ) {
      id
      name
      taskChecklistID
      position
      complete
    }
  }
`;

export const SET_TASK_CHECKLIST_ITEM_COMPLETE = gql`
  mutation SetTaskChecklistItemComplete(
    $taskChecklistItemID: UUID!
    $complete: Boolean!
  ) {
    setTaskChecklistItemComplete(
      input: { taskChecklistItemID: $taskChecklistItemID, complete: $complete }
    ) {
      id
      complete
    }
  }
`;

export const DELETE_TASK_CHECKLIST_ITEM = gql`
  mutation DeleteTaskChecklistItem($taskChecklistItemID: UUID!) {
    deleteTaskChecklistItem(
      input: { taskChecklistItemID: $taskChecklistItemID }
    ) {
      ok
      taskChecklistItem {
        id
        taskChecklistID
      }
    }
  }
`;

export const UPDATE_TASK_CHECKLIST_ITEM_NAME = gql`
  mutation UpdateTaskChecklistItemName(
    $taskChecklistItemID: UUID!
    $name: String!
  ) {
    updateTaskChecklistItemName(
      input: { taskChecklistItemID: $taskChecklistItemID, name: $name }
    ) {
      id
      name
    }
  }
`;

export const CREATE_DUE_DATE_NOTIFICATIONS = gql`
  mutation CreateDueDateNotifications(
    $input: [CreateTaskDueDateNotification!]!
  ) {
    createTaskDueDateNotifications(input: $input) {
      notifications {
        id
        period
        duration
      }
    }
  }
`;

export const DELETE_DUE_DATE_NOTIFICATIONS = gql`
  mutation DeleteDueDateNotifications(
    $input: [DeleteTaskDueDateNotification!]!
  ) {
    deleteTaskDueDateNotifications(input: $input) {
      notifications
    }
  }
`;

export const TOGGLE_TASK_WATCH = gql`
  mutation ToggleTaskWatch($taskID: UUID!) {
    toggleTaskWatch(input: { taskID: $taskID }) {
      id
      watched
    }
  }
`;

export const UPDATE_TASK_CHECKLIST_LOCATION = gql`
  mutation updateTaskChecklistLocation(
    $taskChecklistID: UUID!
    $position: Float!
  ) {
    updateTaskChecklistLocation(
      input: { taskChecklistID: $taskChecklistID, position: $position }
    ) {
      checklist {
        id
        position
      }
    }
  }
`;

export const UPDATE_TASK_CHECKLIST_ITEM_LOCATION = gql`
  mutation updateTaskChecklistItemLocation(
    $taskChecklistID: UUID!
    $taskChecklistItemID: UUID!
    $position: Float!
  ) {
    updateTaskChecklistItemLocation(
      input: {
        taskChecklistID: $taskChecklistID
        taskChecklistItemID: $taskChecklistItemID
        position: $position
      }
    ) {
      taskChecklistID
      prevChecklistID
      checklistItem {
        id
        taskChecklistID
        position
      }
    }
  }
`;
