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

// -------------- USER --------------------------
const ADD_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      email
      phone
    }
  }
`;

// -------------- OTP --------------------------
const GET_OTP = gql`
  mutation GetOtp($email: String!) {
    getOtp(email: $email)
  }
`;

export { ADD_CATEGORY, ADD_PROJECT, GET_OTP, ADD_USER };
