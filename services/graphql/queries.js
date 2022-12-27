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
    }
  }
`;

const VERIFY_OTP = gql`
  query VerifyOtp($otp: String!, $email: String!) {
    verifyOTP(otp: $otp, email: $email)
  }
`;

export {
  ALL_TAGS_NAME,
  ALL_CATEGORIES_NAME,
  ALL_PROJECTS_NAME,
  ALL_PROJECTS,
  ALL_USERS_NAME,
  VERIFY_OTP,
};
