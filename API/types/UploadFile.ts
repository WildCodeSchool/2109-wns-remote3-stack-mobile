/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UploadFile
// ====================================================

export interface UploadFile_uploadFile {
  __typename: "IFile";
  filename: string;
  mimetype: string;
  encoding: string;
}

export interface UploadFile {
  uploadFile: UploadFile_uploadFile;
}

export interface UploadFileVariables {
  file: any;
}
