import { gql } from '@apollo/client';

export const CREATE_COMMENTS = gql`
  mutation Mutation($text: String!, $userId: String!, $taskId: String!) {
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
