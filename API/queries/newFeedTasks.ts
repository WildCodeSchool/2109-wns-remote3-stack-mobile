import { gql } from '@apollo/client';

export const GET_NEW_FEED_TASK = gql`
  query getNewFeedTask($objectId: String!) {
    getAllNotificationsFromObject(objectId: $objectId) {
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
