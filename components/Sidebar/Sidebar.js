import { useStateContext } from "@/context/ContextProvider";
import styles from "@/styles/Sidebar.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { BsCaretRightFill } from "react-icons/bs";
import { adminRoutes } from "./adminRoutes";

const Sidebar = () => {
  const { pathname } = useRouter();
  const { darkTheme, currentColor, sidebar, setSidebar, setColor } =
    useStateContext();
  const [subnav, setSubnav] = useState(false);
  const [dropdownInfo, setDropDownInfo] = useState("");

  // css conditionalMode for dark mode
  const conditionalMode = darkTheme ? styles.dark : styles.light;
  const conditionalSidebar = sidebar ? "" : styles.inactive;

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
      <div className={`${conditionalMode} ${styles.sidebar_sec}`}>
        <div className={styles.nav_items}>
          {adminRoutes.map((item, idx) => (
            <span key={idx} className={styles.link_wrapper}>
              <>
                <Link href={item.path}>
                  <span
                    className={`${styles.link} ${
                      pathname === item.path ? styles.active : ""
                    }`}
                  >
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
                      >
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
