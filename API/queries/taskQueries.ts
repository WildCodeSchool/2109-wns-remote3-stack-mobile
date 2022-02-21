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
  query getTaskByID($getTaskByIdId: String!) {
    getTaskByID(id: $getTaskByIdId) {
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
