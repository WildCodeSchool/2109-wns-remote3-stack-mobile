import { gql } from '@apollo/client';

export const GET_ALL_TASKS = gql`
  query GetAllTasks {
    getAllTasks {
      id
      name
      description
      startDate
      endDate
      estimeeSpentTime
      advancement
      projectId
      comments {
        id
        text
        createdAt
        updatedAt
        userId
        taskId
      }
      users {
        id
        firstName
        lastName
        avatar
      }
      tags {
        id
        label
        color
      }
    }
  }
`;

export const GetOneTask = gql`
  query getTaskByID($taskId: String!) {
    getTaskByID(id: $taskId) {
      id
      name
      description
      projectId
      startDate
      endDate
      estimeeSpentTime
      advancement
      comments {
        id
        text
        createdAt
        updatedAt
        userId
        taskId
      }
      users {
        id
        firstName
        lastName
        avatar
      }
      tags {
        id
        label
        color
      }
    }
  }
`;
