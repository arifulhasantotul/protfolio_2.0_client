import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as BsIcons from "react-icons/bs";
import * as FaIcons from "react-icons/fa";
import * as ImIcons from "react-icons/im";
import * as SiIcons from "react-icons/si";

const routes = [
  {
    icon: <FaIcons.FaHome />,
    name: "Home",
    to: "/",
  },
  {
    icon: <AiIcons.AiOutlineFundProjectionScreen />,
    name: "Dashboard",
    to: "/dashboard",
  },
  {
    icon: <BsIcons.BsGrid1X2Fill />,
    name: "Projects",
    to: "/projects",
  },
  {
    icon: <SiIcons.SiProgress />,
    name: "About",
    to: "/about",
  },
  {
    icon: <ImIcons.ImBlog />,
    name: "Blogs",
    to: "/blogs",
  },
  {
    icon: <BiIcons.BiChat />,
    name: "Contact",
    to: "/contact",
  },
];

export default routes;
