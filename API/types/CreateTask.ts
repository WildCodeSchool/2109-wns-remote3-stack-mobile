/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ITagPayload } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createTask
// ====================================================

export interface createTask_createTask_tags {
  __typename: "ITag";
  id: string;
  label: string;
  color: string;
}

export interface createTask_createTask {
  __typename: "ITask";
  id: string;
  name: string;
  description: string;
  projectId: string;
  startDate: string;
  endDate: string;
  advancement: string;
  estimeeSpentTime: number;
  tags: createTask_createTask_tags[];
}

export interface createTask {
  createTask: createTask_createTask;
}

export interface createTaskVariables {
  tags: ITagPayload[];
  name: string;
  description: string;
  projectId: string;
  endDate: string;
  advancement: string;
  estimeeSpentTime: number;
}
