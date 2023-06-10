import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { BiBookAdd, BiMessageAdd, BiPlusCircle } from "react-icons/bi";
import { BsGrid1X2, BsTag } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { GoCommentDiscussion } from "react-icons/go";
import { ImBlog } from "react-icons/im";
import { MdCategory } from "react-icons/md";

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
    icon: <MdCategory />,
    name: "Categories",
    path: "/dashboard/categories",
    sub: [
      {
        icon: <BiPlusCircle />,
        name: "Add Category",
        path: "/dashboard/addCategory",
      },
    ],
  },
  {
    icon: <BsTag />,
    name: "Tags",
    path: "/dashboard/tags",
    sub: [
      {
        icon: <BiPlusCircle />,
        name: "Add Tag",
        path: "/dashboard/addTag",
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
