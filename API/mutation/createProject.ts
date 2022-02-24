import { gql } from '@apollo/client';

const CREATE_PROJECT = gql`
  mutation createProject(
    $userId: String!
    $name: String!
    $description: String!
    $status: String!
    $startDate: DateTime!
    $endDate: DateTime!
    $estimeeSpentTime: Float!
  ) {
    createProject(
      userId: $userId
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
