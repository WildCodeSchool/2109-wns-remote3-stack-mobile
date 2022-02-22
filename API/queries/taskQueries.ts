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
    }
  }
`;
