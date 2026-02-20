import { gql } from "@apollo/client";

export const NOTIFICATION_TOGGLE_READ = gql`
  mutation notificationToggleRead($notifiedID: UUID!) {
    notificationToggleRead(input: { notifiedID: $notifiedID }) {
      id
      read
      readAt
    }
  }
`;

export const NOTIFICATION_MARK_ALL_READ = gql`
  mutation notificationMarkAllRead {
    notificationMarkAllRead {
      success
    }
  }
`;
