/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ITagPayload } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: updateTaskById
// ====================================================

export interface updateTaskById_updateTaskWithTagsById_tags {
  __typename: "ITag";
  id: string;
  label: string;
  color: string;
}

export interface updateTaskById_updateTaskWithTagsById {
  __typename: "ITask";
  id: string;
  name: string;
  description: string;
  projectId: string;
  startDate: any;
  endDate: any;
  estimeeSpentTime: number;
  advancement: string;
  tags: updateTaskById_updateTaskWithTagsById_tags[];
}

export interface updateTaskById {
  updateTaskWithTagsById: updateTaskById_updateTaskWithTagsById;
}

export interface updateTaskByIdVariables {
  updateTaskWithTagsByIdId: string;
  name: string;
  description: string;
  projectId: string;
  endDate: string;
  advancement: string;
  estimeeSpentTime: number;
  tags: ITagPayload[];
}
