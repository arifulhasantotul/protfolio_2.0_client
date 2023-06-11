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

const ALL_TAGS = gql`
  query ListTag {
    listTag {
      id
      name
      blogs {
        id
        name
      }
      projects {
        id
        name
      }
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

const ALL_REVIEWS = gql`
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
      rank
      ratings
      status
      des
      client {
        id
        name
        email
      }
      thumb_img
      sub_images
      client_repo
      server_repo
      live_site
    }
  }
`;

// -------------- USER --------------------------

const ALL_USERS_NAME = gql`
  query ListUser {
    listUser {
      id
      name
      phone
      role
      email
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
      flag
      country
      numLen
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
      flag
      country
      numLen
    }
  }
`;

// -------------- AUTH --------------------------
const ALL_BLOGS = gql`
  query ListBlog {
    listBlog {
      id
      name
      img
      blog_url
      tags {
        id
        name
      }
      categories {
        id
        name
      }
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
  ALL_BLOGS,
  ALL_CATEGORIES_NAME,
  ALL_PROJECTS,
  ALL_PROJECTS_NAME,
  ALL_REVIEWS,
  ALL_TAGS_NAME,
  ALL_TAGS,
  ALL_USERS_NAME,
  CURRENT_USER,
  GET_USER,
  LOGIN_USER,
  VERIFY_OTP,
};
