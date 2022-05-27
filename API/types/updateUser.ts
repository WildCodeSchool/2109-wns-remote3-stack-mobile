/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateUser
// ====================================================

export interface updateUser_updateUser {
  __typename: "IUser";
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string | null;
  createdAt: any;
  updatedAt: any;
}

export interface updateUser {
  updateUser: updateUser_updateUser;
}

export interface updateUserVariables {
  updateUserId: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string | null;
}
