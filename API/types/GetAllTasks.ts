/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAllTasks
// ====================================================

export interface GetAllTasks_getAllTasks {
  __typename: "ITask";
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  estimeeSpentTime: number;
  advancement: string;
  projectId: string;
}

export interface GetAllTasks {
  getAllTasks: GetAllTasks_getAllTasks[];
}
