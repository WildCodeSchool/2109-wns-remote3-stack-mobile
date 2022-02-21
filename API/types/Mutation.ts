/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Mutation
// ====================================================

export interface Mutation_createProject {
  __typename: "IProject";
  id: string;
  name: string;
  description: string;
  status: string;
  startDate: any;
  endDate: any;
  estimeeSpentTime: number;
}

export interface Mutation {
  createProject: Mutation_createProject;
}

export interface MutationVariables {
  name: string;
  description: string;
  status: string;
  startDate: any;
  endDate: string;
  estimeeSpentTime: number;
}
