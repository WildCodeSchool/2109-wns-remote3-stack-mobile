import { gql } from '@apollo/client';

export const CREATE_PROJECT = gql`
  mutation Mutation(
    $name: String!
    $description: String!
    $status: String!
    $startDate: DateTime!
    $endDate: String!
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

// export const UPDATE_PROJECT = gql`
//   mutation Mutation(
//     $updateProjectId: String!
//     $name: String!
//     $description: String!
//     $status: String!
//     $startDate: DateTime!
//     $endDate: String!
//     $estimeeSpentTime: Float!
//   ) {
//     updateProject(
//       id: $updateProjectId
//       name: $name
//       description: $description
//       status: $status
//       startDate: $startDate
//       endDate: $endDate
//       estimeeSpentTime: $estimeeSpentTime
//     ) {
//       id
//       name
//       description
//       status
//       startDate
//       endDate
//       estimeeSpentTime
//     }
//   }
// `;
