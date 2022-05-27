/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUserWithTasks
// ====================================================

export interface GetUserWithTasks_getUserWithTasks_tasks_comments {
  __typename: "IComment";
  id: string;
  text: string;
  createdAt: any;
  updatedAt: any;
  userId: string;
  taskId: string;
}

export interface GetUserWithTasks_getUserWithTasks_tasks {
  __typename: "ITask";
  name: string;
  id: string;
  projectId: string;
  startDate: any;
  estimeeSpentTime: number;
  endDate: any;
  description: string;
  advancement: string;
  comments: GetUserWithTasks_getUserWithTasks_tasks_comments[];
}

export interface GetUserWithTasks_getUserWithTasks {
  __typename: "IUserWithTasks";
  tasks: GetUserWithTasks_getUserWithTasks_tasks[];
}

export interface GetUserWithTasks {
  getUserWithTasks: GetUserWithTasks_getUserWithTasks;
}

export interface GetUserWithTasksVariables {
  getUserWithTasksId: string;
}
