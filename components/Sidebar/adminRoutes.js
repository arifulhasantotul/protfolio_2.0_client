import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { BiBookAdd, BiMessageAdd } from "react-icons/bi";
import { BsGrid1X2 } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { GoCommentDiscussion } from "react-icons/go";
import { ImBlog } from "react-icons/im";

export const adminRoutes = [
  {
    icon: <BsGrid1X2 />,
    name: "Projects",
    path: "/dashboard/projects",
    sub: [
      {
        icon: <AiOutlineAppstoreAdd />,
        name: "Add Project",
        path: "/dashboard/addProject",
      },
    ],
  },
  {
    icon: <GoCommentDiscussion />,
    name: "Reviews",
    path: "/dashboard/reviews",
    sub: [
      {
        icon: <BiMessageAdd />,
        name: "Add Review",
        path: "/dashboard/addReview",
      },
    ],
  },
  {
    icon: <ImBlog />,
    name: "Blogs",
    path: "/dashboard/blogs",
    sub: [
      {
        icon: <BiBookAdd />,
        name: "Add Blog",
        path: "/dashboard/addBlog",
      },
    ],
  },
  {
    icon: <FaUsers />,
    name: "Users",
    path: "/dashboard/users",
  },
];
