import { gql } from '@apollo/client';

const DELETE_PROJECT = gql`
  mutation DeleteProject($deleteProjectByIdId: String!) {
    deleteProjectById(id: $deleteProjectByIdId)
  }
`;

export default DELETE_PROJECT;
