import { gql } from '@apollo/client';

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
      createdAt
      updatedAt
    }
  }
`;
