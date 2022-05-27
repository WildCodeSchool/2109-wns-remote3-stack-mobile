/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAllNotifications
// ====================================================

export interface GetAllNotifications_getAllNotifications {
  __typename: "INotification";
  id: string;
  editorName: string;
  editorId: string;
  actionType: string;
  modifiedObjectName: string;
  modifiedObjectId: string;
  onName: string | null;
  onId: string | null;
  type: string;
  createdAt: any;
  viewedBy: string[];
}

export interface GetAllNotifications {
  getAllNotifications: GetAllNotifications_getAllNotifications[];
}
