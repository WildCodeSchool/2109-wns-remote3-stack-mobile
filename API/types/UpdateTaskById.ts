/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateTaskById
// ====================================================

export interface UpdateTaskById_updateTaskById {
  __typename: "ITask";
  id: string;
  name: string;
}

export interface UpdateTaskById {
  updateTaskById: UpdateTaskById_updateTaskById;
}

export interface UpdateTaskByIdVariables {
  updateTaskByIdId: string;
  updateTaskByIdUserIds?: string[] | null;
}
