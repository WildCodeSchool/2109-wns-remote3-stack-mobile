/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getTaskByID
// ====================================================

export interface getTaskByID_getTaskByID_comments {
  __typename: "IComment";
  id: string;
  text: string;
  createdAt: any;
  updatedAt: any;
  userId: string;
  taskId: string;
}

export interface getTaskByID_getTaskByID_tags {
  __typename: "ITag";
  id: string;
  label: string;
  color: string;
}

export interface getTaskByID_getTaskByID {
  __typename: "ITask";
  id: string;
  name: string;
  description: string;
  projectId: string;
  startDate: any;
  endDate: any;
  estimeeSpentTime: number;
  advancement: string;
  comments: getTaskByID_getTaskByID_comments[];
  tags: getTaskByID_getTaskByID_tags[];
}

export interface getTaskByID {
  getTaskByID: getTaskByID_getTaskByID;
}

export interface getTaskByIDVariables {
  taskId: string;
}
