import { gql } from "@apollo/client";

export const GET_ROADMAPS = gql`
  query GetTechTrees {
    techTrees {
      techTreeId
      title
    }
  }
`;

export const GET_ROADMAP = gql`
  query GetTechTree($id: ID!) {
    techTree(id: $id) {
      techTreeId
      title
      nodes {
        id
        title
        nodeType
      }
      edges {
          id
        source
        target
      }
    }
  }
`;
