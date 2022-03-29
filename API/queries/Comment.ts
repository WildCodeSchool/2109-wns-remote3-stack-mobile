import { gql } from '@apollo/client';

export const GET_ONE_COMMENT = gql`
  query Query($getCommentByIdId: String!) {
    getCommentByID(id: $getCommentByIdId) {
      id
      text
      createdAt
      updatedAt
      userId
      taskId
    }
  }
`;
