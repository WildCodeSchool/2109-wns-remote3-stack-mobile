/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ITagPayload } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateTaskById
// ====================================================

export interface UpdateTaskById_updateTaskById {
  __typename: "ITask";
  id: string;
  name: string;
  description: string;
  projectId: string;
  endDate: any;
  advancement: string;
  estimeeSpentTime: number;
}

export interface UpdateTaskById {
  updateTaskById: UpdateTaskById_updateTaskById;
}

export interface UpdateTaskByIdVariables {
  tags: ITagPayload[];
  updateTaskByIdId: string;
  name: string;
  description: string;
  projectId: string;
  endDate: string;
  advancement: string;
  estimeeSpentTime: number;
}
