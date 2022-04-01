/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createComment
// ====================================================

export interface createComment_createComment {
  __typename: "IComment";
  id: string;
  text: string;
  createdAt: any;
  updatedAt: any;
  userId: string;
  taskId: string;
}

export interface createComment {
  createComment: createComment_createComment;
}

export interface createCommentVariables {
  text: string;
  userId: string;
  taskId: string;
}
