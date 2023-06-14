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

const ALL_CATEGORIES = gql`
  query ListCategory {
    listCategory {
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

const GET_PROJECT_BY_ID = gql`
  query GetProject($id: ID!) {
    getProject(id: $id) {
      id
      name
      slug
      rank
      ratings
      status
      categoriesId
      categories {
        id
        name
      }
      tagsId
      tags {
        id
        name
      }
      clientId
      client {
        id
        name
      }
      des
      live_site
      client_repo
      server_repo
      thumb_img
      sub_images
      createdAt
      updatedAt
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
      tagsId
      tags {
        id
        name
      }
      categoriesId
      categories {
        id
        name
      }
    }
  }
`;

// -------------- AUTH --------------------------

const LOGIN_USER = gql`
  query LoginUser(
    $email: String!
    $password: String!
    $userIP: String
    $onMobile: Boolean
    $userPlatform: String
    $userAgent: String
    $ipRegion: String
    $ipCountry: String
  ) {
    loginUser(
      email: $email
      password: $password
      userIP: $userIP
      onMobile: $onMobile
      userPlatform: $userPlatform
      userAgent: $userAgent
      ipRegion: $ipRegion
      ipCountry: $ipCountry
    ) {
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
  ALL_CATEGORIES,
  ALL_CATEGORIES_NAME,
  ALL_PROJECTS,
  ALL_PROJECTS_NAME,
  ALL_REVIEWS,
  ALL_TAGS,
  ALL_TAGS_NAME,
  ALL_USERS_NAME,
  CURRENT_USER,
  GET_PROJECT_BY_ID,
  GET_USER,
  LOGIN_USER,
  VERIFY_OTP,
};
