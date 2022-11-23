const { gql } = require("@apollo/client");

// -------------- CATEGORY --------------------------
const ADD_CATEGORY = gql`
  mutation CreateCategory($input: CreateCategoryInput!) {
    createCategory(input: $input) {
      id
      name
    }
  }
`;

// -------------- PROJECT --------------------------
const ADD_PROJECT = gql`
  mutation CreateProject($input: CreateProjectInput!) {
    createProject(input: $input) {
      id
      name
    }
  }
`;

export { ADD_CATEGORY, ADD_PROJECT };
