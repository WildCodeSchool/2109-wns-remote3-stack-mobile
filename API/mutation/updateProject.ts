import { gql } from '@apollo/client';

const UPDATE_PROJECT = gql`
  mutation updateProject(
    $updateProjectId: String!
    $name: String!
    $description: String!
    $status: String!
    $startDate: DateTime!
    $endDate: DateTime!
    $estimeeSpentTime: Float!
  ) {
    updateProject(
      id: $updateProjectId
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

export default UPDATE_PROJECT;
