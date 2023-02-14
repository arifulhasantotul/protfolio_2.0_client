const { gql } = require("@apollo/client");

// -------------- TAG --------------------------

const ALL_TAGS_NAME = gql`
  query ListTag {
    listTag {
      id
      name
    }
  }
`;

// -------------- CATEGORY --------------------------

const ALL_CATEGORIES_NAME = gql`
  query ListCategory {
    listCategory {
      id
      name
    }
  }
`;

// -------------- REVIEW --------------------------

const ALL_REVIEW = gql`
  query ListReview {
    listReview {
      id
      title
      reviewerId
      comment
      rating
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

// -------------- PROJECT --------------------------

const ALL_PROJECTS_NAME = gql`
  query ListProject {
    listProject {
      id
      name
    }
  }
`;

const ALL_PROJECTS = gql`
  query ListProject {
    listProject {
      id
      name
      slug
      categories {
        id
        name
      }
      tags {
        id
        name
      }
      client {
        id
        name
      }
      rank
      ratings
      status
      live_site
      client_repo
      server_repo
      thumb_img
      des
    }
  }
`;

// -------------- USER --------------------------

const ALL_USERS_NAME = gql`
  query ListUser {
    listUser {
      id
      name
      email
      role
      avatar
      cloudinary_id
    }
  }
`;

const GET_USER = gql`
  query GetUser($input: ID!) {
    getUser(id: $input) {
      id
      name
      phone
      role
      email
      dialCode
      designation
      avatar
      cloudinary_id
    }
  }
`;

const CURRENT_USER = gql`
  query Me {
    currentUser {
      id
      name
      phone
      role
      email
      dialCode
      designation
      avatar
      cloudinary_id
    }
  }
`;
// -------------- AUTH --------------------------

const LOGIN_USER = gql`
  query LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      userId
      token
      tokenExpiration
    }
  }
`;
// -------------- OTP --------------------------

const VERIFY_OTP = gql`
  query VerifyOtp($otp: String!, $email: String!) {
    verifyOTP(otp: $otp, email: $email)
  }
`;

export {
  ALL_TAGS_NAME,
  ALL_CATEGORIES_NAME,
  ALL_PROJECTS_NAME,
  ALL_REVIEW,
  ALL_PROJECTS,
  ALL_USERS_NAME,
  VERIFY_OTP,
  LOGIN_USER,
  CURRENT_USER,
  GET_USER,
};
