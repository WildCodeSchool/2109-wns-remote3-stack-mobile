import { gql } from '@apollo/client';

const CREATE_TASK = gql`
  mutation createTask(
    $tags: [ITagPayload!]!
    $name: String!
    $description: String!
    $projectId: String!
    $endDate: String!
    $advancement: String!
    $estimeeSpentTime: Float!
  ) {
    createTask(
      tags: $tags
      name: $name
      description: $description
      projectId: $projectId
      endDate: $endDate
      advancement: $advancement
      estimeeSpentTime: $estimeeSpentTime
    ) {
      id
      name
      description
      projectId
      startDate
      endDate
      advancement
      estimeeSpentTime
      tags {
        id
        label
        color
      }
    }
  }
`;

export default CREATE_TASK;
