/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getProjectByIdId
// ====================================================

export interface getProjectByIdId_getProjectByID_tasks {
  __typename: "ITask";
  id: string;
  name: string;
  description: string;
  projectId: string;
  startDate: any;
  endDate: any;
  estimeeSpentTime: number;
  advancement: string;
}

export interface getProjectByIdId_getProjectByID_members {
  __typename: "IUserProject";
  userId: string;
}

export interface getProjectByIdId_getProjectByID {
  __typename: "IProject";
  id: string;
  name: string;
  description: string;
  status: string;
  tasks: getProjectByIdId_getProjectByID_tasks[];
  members: getProjectByIdId_getProjectByID_members[];
  startDate: any;
  endDate: any;
  estimeeSpentTime: number;
}

export interface getProjectByIdId {
  getProjectByID: getProjectByIdId_getProjectByID;
}

export interface getProjectByIdIdVariables {
  getProjectByIdId: string;
}
