import { gql } from '@apollo/client';

export const ALL_NOTIFICATIONS_SUBSCRIPTION = gql`
  subscription AllNotificationsSubscription {
    newNotification {
      id
      editorName
      editorId
      actionType
      modifiedObjectName
      modifiedObjectId
      onName
      onId
      type
      createdAt
      viewedBy
    }
  }
`;
