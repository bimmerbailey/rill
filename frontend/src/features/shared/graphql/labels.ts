import { gql } from "@apollo/client";

export const GET_LABELS = gql`
  query labels($projectID: UUID!) {
    findProject(input: { projectID: $projectID }) {
      labels {
        id
        createdDate
        name
        labelColor {
          id
          name
          colorHex
          position
        }
      }
    }
    labelColors {
      id
      position
      colorHex
      name
    }
  }
`;
