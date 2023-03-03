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

const UPDATE_USER_DETAILS = gql`
  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      name
      phone
      dialCode
      designation
      avatar
      cloudinary_id
      flag
      country
      numLen
    }
  }
`;

const UPDATE_PROFILE_IMAGE = gql`
  mutation UploadProfileImg($file: Upload!) {
    uploadProfileImg(file: $file) {
      id
      name
      email
      avatar
      dialCode
      phone
      country
      cloudinary_id
      designation
    }
  }
`;

// -------------- REVIEW --------------------------
const ADD_REVIEW = gql`
  mutation CreateReview($input: CreateReviewInput!) {
    createReview(input: $input) {
      id
      title
      reviewerId
      rating
      comment
      reviewer {
        id
        email
        name
        avatar
        designation
        dialCode
        phone
      }
      projectStartDate
      projectEndDate
    }
  }
`;

// -------------- OTP --------------------------
const GET_OTP = gql`
  mutation GetOtp($email: String!) {
    getOtp(email: $email)
  }
`;

export {
  ADD_CATEGORY,
  ADD_PROJECT,
  GET_OTP,
  ADD_USER,
  ADD_REVIEW,
  UPDATE_USER_DETAILS,
  UPDATE_PROFILE_IMAGE,
};
