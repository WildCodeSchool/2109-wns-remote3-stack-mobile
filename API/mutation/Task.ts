import { gql } from '@apollo/client';

export const CREATE_TASK = gql`
  mutation createTask(
    $tags: [ITagPayload!]!
    $name: String!
    $description: String!
    $projectId: String!
    $endDate: String!
    $advancement: String!
    $estimeeSpentTime: Float!
    $userIds: [String!]!
  ) {
    createTaskWithTags(
      tags: $tags
      name: $name
      description: $description
      projectId: $projectId
      endDate: $endDate
      advancement: $advancement
      estimeeSpentTime: $estimeeSpentTime
      userIds: $userIds
    ) {
      id
      name
      description
      projectId
      startDate
      endDate
      advancement
      estimeeSpentTime
      tags {
        id
        label
        color
      }
    }
  }
`;

export const DELETE_TASK = gql`
  mutation DeleteTaskById($taskId: String!) {
    deleteTaskById(id: $taskId) {
      id
      name
      description
      projectId
      startDate
      endDate
      estimeeSpentTime
      advancement
      tags {
        id
        label
        color
      }
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation updateTaskById(
    $updateTaskWithTagsByIdId: String!
    $name: String!
    $description: String!
    $projectId: String!
    $endDate: String!
    $advancement: String!
    $estimeeSpentTime: Float!
    $tags: [ITagPayload!]!
    $userIds: [String!]!
  ) {
    updateTaskWithTagsById(
      id: $updateTaskWithTagsByIdId
      name: $name
      description: $description
      projectId: $projectId
      endDate: $endDate
      advancement: $advancement
      estimeeSpentTime: $estimeeSpentTime
      tags: $tags
      userIds: $userIds
    ) {
      id
      name
      description
      projectId
      startDate
      endDate
      estimeeSpentTime
      advancement
      tags {
        id
        label
        color
      }
      users {
        id
        firstName
      }
    }
  }
`;

export const UPDATE_USERSASSIGNED_TASK = gql`
  mutation UpdateTaskById(
    $updateTaskByIdId: String!
    $updateTaskByIdUserIds: [String!]
  ) {
    updateTaskById(id: $updateTaskByIdId, userIds: $updateTaskByIdUserIds) {
      id
      name
    }
  }
`;
