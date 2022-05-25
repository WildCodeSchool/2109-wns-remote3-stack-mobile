/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateUserPassword
// ====================================================

export interface UpdateUserPassword_updateUserPassword {
  __typename: "IUser";
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  avatar: string | null;
  createdAt: any;
  updatedAt: any;
}

export interface UpdateUserPassword {
  updateUserPassword: UpdateUserPassword_updateUserPassword;
}

export interface UpdateUserPasswordVariables {
  updateUserPasswordId: string;
  password: string;
  lastPassword: string;
}
