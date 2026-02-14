import { gql } from "@apollo/client";

export const NOTIFICATION_ADDED = gql`
  subscription notificationAdded {
    notificationAdded {
      id
      read
      readAt
      notification {
        id
        actionType
        data {
          key
          value
        }
        causedBy {
          username
          fullname
          id
        }
        createdAt
      }
    }
  }
`;
