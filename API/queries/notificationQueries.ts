import { gql } from '@apollo/client';

export const GET_ALL_NOTIFICATIONS = gql`
  query GetAllNotifications {
    getAllNotifications {
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

export const GET_USER_NOTIFICATIONS = gql`
  query GetUserNotifications {
    getUserNotifications {
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

export const GET_ONE_NOTIFICATION = gql`
  query GetNotificationByID($getNotificationByIdId: String!) {
    getNotificationByID(id: $getNotificationByIdId) {
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
