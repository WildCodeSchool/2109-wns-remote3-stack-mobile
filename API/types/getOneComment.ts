/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getOneComment
// ====================================================

export interface getOneComment_getCommentByID {
  __typename: "IComment";
  id: string;
  text: string;
  createdAt: any;
  updatedAt: any;
  userId: string;
  taskId: string;
}

export interface getOneComment {
  getCommentByID: getOneComment_getCommentByID;
}

export interface getOneCommentVariables {
  getCommentByIdId: string;
}
