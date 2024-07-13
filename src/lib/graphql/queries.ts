import { gql } from "@apollo/client";

export const GET_ROADMAPS = gql`
  query GetTechTrees {
    techTrees {
      techTreeId
      title
    }
  }
`;
