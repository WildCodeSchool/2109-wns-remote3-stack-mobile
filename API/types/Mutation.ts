/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Mutation
// ====================================================

export interface Mutation_createComment {
  __typename: "IComment";
  id: string;
  text: string;
  createdAt: any;
  updatedAt: any;
  userId: string;
  taskId: string;
}

export interface Mutation {
  createComment: Mutation_createComment;
}

export interface MutationVariables {
  text: string;
  userId: string;
  taskId: string;
}
