import { ImBlog } from "react-icons/im";
import ChatIcon from "../components/CustomIcons/ChatIcon.js";
import HomeIcon from "../components/CustomIcons/HomeIcon.js";
import ProgressIcon from "../components/CustomIcons/ProgressIcon.js";
import ProjectIcon from "../components/CustomIcons/ProjectIcon.js";

const routes = [
  {
    icon: <HomeIcon />,
    name: "Home",
    to: "/",
  },
  {
    icon: <ProjectIcon />,
    name: "Projects",
    to: "/projects",
  },
  {
    icon: <ProgressIcon />,
    name: "About",
    to: "/about",
  },
  {
    icon: <ImBlog />,
    name: "Blogs",
    to: "/blogs",
  },
  {
    icon: <ChatIcon />,
    name: "Contact",
    to: "/contact",
  },
];

export default routes;
