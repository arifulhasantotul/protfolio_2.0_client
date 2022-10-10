export const adminRoutes = [
  {
    name: "Projects",
    path: "/dashboard/projects",
    sub: [
      {
        name: "Add Project",
        path: "/dashboard/addProject",
      },
    ],
  },
  {
    name: "Reviews",
    path: "/dashboard/reviews",
    sub: [
      {
        name: "Add Review",
        path: "/dashboard/addReview",
      },
    ],
  },
  {
    name: "Blogs",
    path: "/dashboard/blogs",
    sub: [
      {
        name: "Add Blog",
        path: "/dashboard/addBlog",
      },
    ],
  },
  {
    name: "Users",
    path: "/dashboard/users",
  },
];
