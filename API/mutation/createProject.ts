import { gql } from '@apollo/client';

const CREATE_PROJECT = gql`
  mutation createProject(
    $name: String!
    $description: String!
    $status: String!
    $startDate: DateTime!
    $endDate: DateTime!
    $estimeeSpentTime: Float!
  ) {
    createProject(
      name: $name
      description: $description
      status: $status
      startDate: $startDate
      endDate: $endDate
      estimeeSpentTime: $estimeeSpentTime
    ) {
      id
      name
      description
      status
      startDate
      endDate
      estimeeSpentTime
    }
  }
`;

export default CREATE_PROJECT;
