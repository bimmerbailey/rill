import { gql } from "@apollo/client";

export const GET_NOTIFICATIONS = gql`
  query notifications(
    $limit: Int!
    $cursor: String
    $filter: NotificationFilter!
  ) {
    notified(input: { limit: $limit, cursor: $cursor, filter: $filter }) {
      totalCount
      pageInfo {
        endCursor
        hasNextPage
      }
      notified {
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
  }
`;

export const HAS_UNREAD_NOTIFICATIONS = gql`
  query hasUnreadNotifications {
    hasUnreadNotifications {
      unread
    }
  }
`;

export const TOP_NAVBAR = gql`
  query topNavbar {
    notifications {
      id
      read
      readAt
      notification {
        id
        actionType
        causedBy {
          username
          fullname
          id
        }
        createdAt
      }
    }
    me {
      user {
        id
        fullName
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
