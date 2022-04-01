import { gql } from '@apollo/client';

export const GET_ALL_PROJECTS = gql`
  query GetAllProjects {
    getAllProjects {
      id
      name
      status
      startDate
      endDate
      estimeeSpentTime
    }
  }
`;
export const GET_ONE_PROJECT = gql`
  query getProjectByIdId($getProjectByIdId: String!) {
    getProjectByID(id: $getProjectByIdId) {
      id
      name
      description
      status
      tasks {
        id
        name
        description
        projectId
        startDate
        endDate
        comments {
          id
          text
          createdAt
          updatedAt
          userId
          taskId
        }
        estimeeSpentTime
        advancement
      }
      members {
        projectId
        projectRole
        userId
      }
      startDate
      endDate
      estimeeSpentTime
    }
  }
`;

export const DELETE_USER_PROJECT = gql`
  mutation DeleteUserProject($projectId: String!, $userId: String!) {
    deleteUserProject(projectId: $projectId, userId: $userId) {
      userId
      projectId
      projectRole
    }
  }
`;

export const CREATE_USER_PROJECT = gql`
  mutation CreateUserProject(
    $userId: String!
    $projectId: String!
    $projectRole: String!
  ) {
    createUserProject(
      userId: $userId
      projectId: $projectId
      projectRole: $projectRole
    ) {
      userId
      projectId
      projectRole
    }
  }
`;

export const GET_ALL_NOTIFICATION_PROJECT = gql`
  query getAllNotifactionProject($objectId: String!) {
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
