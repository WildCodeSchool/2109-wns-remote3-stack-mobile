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
  ) {
    createTaskWithTags(
      tags: $tags
      name: $name
      description: $description
      projectId: $projectId
      endDate: $endDate
      advancement: $advancement
      estimeeSpentTime: $estimeeSpentTime
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
  mutation UpdateTaskById(
    $tags: [ITagPayload!]!
    $updateTaskByIdId: String!
    $name: String!
    $description: String!
    $projectId: String!
    $endDate: String!
    $advancement: String!
    $estimeeSpentTime: Float!
  ) {
    updateTaskById(
      tags: $tags
      id: $updateTaskByIdId
      name: $name
      description: $description
      projectId: $projectId
      endDate: $endDate
      advancement: $advancement
      estimeeSpentTime: $estimeeSpentTime
    ) {
      id
      name
      description
      projectId
      endDate
      advancement
      estimeeSpentTime
    }
  }
`;
