/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ITagPayload } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateTask
// ====================================================

export interface CreateTask_createTaskWithTags_tags {
  __typename: "ITag";
  id: string;
  label: string;
  color: string;
}

export interface CreateTask_createTaskWithTags {
  __typename: "ITask";
  id: string;
  name: string;
  description: string;
  projectId: string;
  startDate: string;
  endDate: string;
  advancement: string;
  estimeeSpentTime: number;
  tags: CreateTask_createTaskWithTags_tags[];
}

export interface CreateTask {
  createTaskWithTags: CreateTask_createTaskWithTags;
}

export interface CreateTaskVariables {
  tags: ITagPayload[];
  name: string;
  description: string;
  projectId: string;
  endDate: string;
  advancement: string;
  estimeeSpentTime: number;
}
