/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAllTasks
// ====================================================

export interface GetAllTasks_getAllTasks_comments {
  __typename: "IComment";
  id: string;
  text: string;
  createdAt: any;
  updatedAt: any;
  userId: string;
  taskId: string;
}

export interface GetAllTasks_getAllTasks_users {
  __typename: "IUser";
  id: string;
  firstName: string;
  lastName: string;
  avatar: string | null;
}

export interface GetAllTasks_getAllTasks_tags {
  __typename: "ITag";
  id: string;
  label: string;
  color: string;
}

export interface GetAllTasks_getAllTasks {
  __typename: "ITask";
  id: string;
  name: string;
  description: string;
  startDate: any;
  endDate: any;
  estimeeSpentTime: number;
  advancement: string;
  projectId: string;
  comments: GetAllTasks_getAllTasks_comments[];
  users: GetAllTasks_getAllTasks_users[];
  tags: GetAllTasks_getAllTasks_tags[];
}

export interface GetAllTasks {
  getAllTasks: GetAllTasks_getAllTasks[];
}
