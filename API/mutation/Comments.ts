import { gql } from '@apollo/client';

export const CREATE_COMMENTS = gql`
  mutation createComment($text: String!, $userId: String!, $taskId: String!) {
    createComment(text: $text, userId: $userId, taskId: $taskId) {
      id
      text
      createdAt
      updatedAt
      userId
      taskId
    }
  }
`;

export const GET_ALL_COMMENTS = gql`
  query GetAllComments {
    getAllComments {
      id
      text
      createdAt
      updatedAt
      userId
      taskId
    }
  }
`;
