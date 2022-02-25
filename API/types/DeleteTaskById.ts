/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteTaskById
// ====================================================

export interface DeleteTaskById_deleteTaskById_tags {
  __typename: "ITag";
  id: string;
  label: string;
  color: string;
}

export interface DeleteTaskById_deleteTaskById_users {
  __typename: "IUser";
  id: string;
  email: string;
  firstName: string;
  password: string;
  lastName: string;
  avatar: string | null;
  createdAt: any;
  updatedAt: any;
}

export interface DeleteTaskById_deleteTaskById_comments {
  __typename: "IComment";
  id: string;
  text: string;
  createdAt: any;
  updatedAt: any;
  userId: string;
  taskId: string;
}

export interface DeleteTaskById_deleteTaskById {
  __typename: "ITask";
  id: string;
  name: string;
  description: string;
  projectId: string;
  startDate: string;
  endDate: string;
  estimeeSpentTime: number;
  advancement: string;
  tags: DeleteTaskById_deleteTaskById_tags[];
  users: DeleteTaskById_deleteTaskById_users[];
  comments: DeleteTaskById_deleteTaskById_comments[];
}

export interface DeleteTaskById {
  deleteTaskById: DeleteTaskById_deleteTaskById;
}

export interface DeleteTaskByIdVariables {
  taskId: string;
}
