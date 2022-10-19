const { gql } = require("@apollo/client");

// -------------- TAG --------------------------

const ALL_TAGS_NAME = gql`
  query ListTags {
    listTags {
      id
      name
    }
  }
`;

// -------------- CATEGORY --------------------------

const ALL_CATEGORIES_NAME = gql`
  query ListCategories {
    listCategories {
      id
      name
    }
  }
`;

// -------------- CATEGORY --------------------------

const ALL_PROJECTS_NAME = gql`
  query ListProjects {
    listProjects {
      id
      name
    }
  }
`;

const ALL_PROJECTS = gql`
  query ListProjects {
    listProjects {
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
  query ListUsers {
    listUsers {
      id
      name
      email
    }
  }
`;

export {
  ALL_TAGS_NAME,
  ALL_CATEGORIES_NAME,
  ALL_PROJECTS_NAME,
  ALL_PROJECTS,
  ALL_USERS_NAME,
};
