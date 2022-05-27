import { gql } from '@apollo/client';

export const UPDATE_USER = gql`
  mutation updateUser(
    $updateUserId: ID!
    $email: String!
    $firstName: String!
    $lastName: String!
    $avatar: String
  ) {
    updateUser(
      id: $updateUserId
      email: $email
      firstName: $firstName
      lastName: $lastName
      avatar: $avatar
    ) {
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

export const UPDATE_USER_PASSWORD = gql`
  mutation UpdateUserPassword(
    $updateUserPasswordId: ID!
    $password: String!
    $lastPassword: String!
  ) {
    updateUserPassword(
      id: $updateUserPasswordId
      password: $password
      lastPassword: $lastPassword
    ) {
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
