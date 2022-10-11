import { useStateContext } from "@/context/ContextProvider";
import styles from "@/styles/Sidebar.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { BsCaretRightFill } from "react-icons/bs";
import { TbArrowBarToLeft, TbArrowBarToRight } from "react-icons/tb";
import SimpleButton from "../SimpleButton/SimpleButton";
import { adminRoutes } from "./adminRoutes";

const Sidebar = () => {
  const { pathname } = useRouter();

  const { darkTheme, currentColor, adminSidebar, setAdminSidebar, setColor } =
    useStateContext();
  const [subnav, setSubnav] = useState(false);
  const [dropdownInfo, setDropDownInfo] = useState("");

  // css conditionalMode for dark mode
  const conditionalMode = darkTheme ? styles.dark : styles.light;
  const conditionalSidebar = adminSidebar ? "" : styles.inactive;

  const toggleSidebar = () => setAdminSidebar((prevState) => !prevState);

  const toggleSubnav = (name) => {
    setDropDownInfo(name);
    if (name === dropdownInfo) {
      setSubnav((prev) => !prev);
    } else {
      setSubnav(true);
    }
  };

  return (
    <>
      <div className={styles.open_btn}>
        <SimpleButton onClick={toggleSidebar} tooltip="Open sidebar">
          <TbArrowBarToRight className={adminSidebar ? styles.rotate : ""} />
        </SimpleButton>
      </div>
      <div
        className={`${conditionalMode} ${styles.sidebar_sec} ${conditionalSidebar}`}
      >
        <div className={styles.close_btn}>
          <SimpleButton onClick={toggleSidebar} tooltip="Close sidebar">
            <TbArrowBarToLeft />
          </SimpleButton>
        </div>
        <div className={styles.nav_items}>
          {adminRoutes.map((item, idx) => (
            <span key={idx} className={styles.link_wrapper}>
              <>
                <Link href={item.path}>
                  <span
                    className={`${styles.link} ${
                      pathname === item.path ? styles.active_link : ""
                    }`}
                    onClick={toggleSidebar}
                  >
                    <span className={styles.link_icon}>{item.icon}</span>{" "}
                    {item.name}{" "}
                  </span>
                </Link>
                {item.sub && (
                  <BsCaretRightFill
                    className={`${styles.dropdown_icon} ${
                      subnav && dropdownInfo === item.name ? styles.rotate : ""
                    }`}
                    onClick={() => toggleSubnav(item.name)}
                  />
                )}
                {item.sub &&
                  item.sub.map((sub_link, i) => (
                    <Link key={i} href={sub_link.path}>
                      <span
                        className={`${styles.sub_link} ${
                          subnav && dropdownInfo === item.name
                            ? styles.open
                            : ""
                        } ${
                          pathname === sub_link.path ? styles.sub_active : ""
                        }`}
                        onClick={toggleSidebar}
                      >
                        <span className={styles.sub_link_icon}>
                          {sub_link.icon}
                        </span>{" "}
                        {sub_link.name}
                      </span>
                    </Link>
                  ))}
              </>
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
