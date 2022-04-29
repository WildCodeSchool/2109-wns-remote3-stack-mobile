import { gql } from '@apollo/client';

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    getAllUsers {
      id
      email
      firstName
      lastName
      avatar
    }
  }
`;

export const GET_SELF = gql`
  query GetSelf {
    getSelf {
      id
      email
      firstName
      lastName
      avatar
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query GetUserByID($getUserByIdId: String!) {
    getUserByID(id: $getUserByIdId) {
      id
      email
      password
      firstName
      lastName
      avatar
    }
  }
`;

export const GET_USER_WITH_PROJECT = gql`
  query GetUserWithProjects($getUserWithProjectsId: String!) {
    getUserWithProjects(id: $getUserWithProjectsId) {
      projects {
        userId
        projectId
        projectRole
      }
    }
  }
`;

export const GET_USER_WITH_TASKS = gql`
  query GetUserWithTasks($getUserWithTasksId: String!) {
    getUserWithTasks(id: $getUserWithTasksId) {
      tasks {
        name
        id
        projectId
        startDate
        estimeeSpentTime
        endDate
        description
        advancement
        comments {
          id
          text
          createdAt
          updatedAt
          userId
          taskId
        }
      }
    }
  }
`;
