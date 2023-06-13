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

const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($id: ID!, $input: UpdateCategoryInput!) {
    updateCategory(id: $id, input: $input) {
      id
      name
    }
  }
`;

const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: ID!) {
    deleteCategory(id: $id) {
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

const UPDATE_USER_PASS = gql`
  mutation UpdateUserPassword($email: String!, $password: String!) {
    updateUserPassword(email: $email, password: $password) {
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

const UPDATE_REVIEW = gql`
  mutation UpdateReview($id: ID!, $input: UpdateReviewInput!) {
    updateReview(id: $id, input: $input) {
      id
      title
      rating
      reviewer {
        id
        name
      }
      projectStartDate
      projectEndDate
    }
  }
`;

const DELETE_REVIEW = gql`
  mutation DeleteReview($id: ID!) {
    deleteReview(id: $id) {
      id
      title
    }
  }
`;

// -------------- Tag --------------------------
const ADD_TAG = gql`
  mutation CreateTag($input: CreateTagInput!) {
    createTag(input: $input) {
      id
      name
    }
  }
`;

const UPDATE_TAG = gql`
  mutation UpdateTag($id: ID!, $input: UpdateTagInput!) {
    updateTag(id: $id, input: $input) {
      id
      name
    }
  }
`;

const DELETE_TAG = gql`
  mutation DeleteTag($id: ID!) {
    deleteTag(id: $id) {
      id
      name
    }
  }
`;

// -------------- Blog --------------------------
const ADD_BLOG = gql`
  mutation CreateBlog($input: CreateBlogInput!) {
    createBlog(input: $input) {
      id
      name
      blog_url
      img
      categories {
        id
        name
      }
      tags {
        id
        name
      }
    }
  }
`;

const UPDATE_BLOG = gql`
  mutation UpdateBlog($id: ID!, $input: UpdateBlogInput!) {
    updateBlog(id: $id, input: $input) {
      id
      img
      name
      blog_url
    }
  }
`;

const DELETE_BLOG = gql`
  mutation DeleteBlog($id: ID!) {
    deleteBlog(id: $id) {
      id
      name
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
  ADD_BLOG,
  ADD_CATEGORY,
  ADD_PROJECT,
  ADD_REVIEW,
  ADD_TAG,
  ADD_USER,
  DELETE_BLOG,
  DELETE_CATEGORY,
  DELETE_REVIEW,
  DELETE_TAG,
  GET_OTP,
  UPDATE_BLOG,
  UPDATE_CATEGORY,
  UPDATE_PROFILE_IMAGE,
  UPDATE_REVIEW,
  UPDATE_TAG,
  UPDATE_USER_DETAILS,
  UPDATE_USER_PASS,
};
