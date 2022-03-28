/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAllComments
// ====================================================

export interface GetAllComments_getAllComments {
  __typename: "IComment";
  id: string;
  text: string;
  createdAt: any;
  updatedAt: any;
  userId: string;
  taskId: string;
}

export interface GetAllComments {
  getAllComments: GetAllComments_getAllComments[];
}
