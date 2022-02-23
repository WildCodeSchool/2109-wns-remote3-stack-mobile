/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getTags
// ====================================================

export interface getTags_getAllTags {
  __typename: "ITag";
  id: string;
  label: string;
  color: string;
}

export interface getTags {
  getAllTags: getTags_getAllTags[];
}
