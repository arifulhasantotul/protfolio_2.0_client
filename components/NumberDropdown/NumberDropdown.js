import { useStateContext } from "@/context/ContextProvider";
import styles from "@/styles/NumberDropdown.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MdSearch } from "react-icons/md";

const NumberDropdown = ({ countryData, setFormData }) => {
  const { currentColor, darkTheme } = useStateContext();
  const [selectStr, setSelectStr] = useState("--Select--");
  const [countries, setCountries] = useState([]);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleClose = () => {
    setOpen((prv) => !prv);
    open ? setCountries([]) : setCountries(countryData);
  };

  const toggleSearch = () => {
    setSearchOpen((prv) => !prv);
  };

  const handleSearch = (e) => {
    const str = e.target.value;
    if (str.length > 0) {
      const filtered = countryData.filter((item) => {
        const name = item?.name?.common;
        return name.toLowerCase().includes(str.toLowerCase());
      });
      setCountries(filtered);
    } else {
      setCountries(countryData);
    }
  };

  const handleClick = (details = {}) => {
    const str = `${details?.name?.common}`;
    setSelectStr(str);
    setFormData((prv) => ({
      ...prv,
      flag: details?.flags?.svg,
      dialCode: details?.idd?.root + details?.idd?.suffixes,
      numLen: details?.uniqueLen,
    }));
    handleClose();
  };

  useEffect(() => {
    if (countryData?.length > 0) {
      setCountries(countryData);
    }
  }, [countryData]);

  const conditionalMode = darkTheme ? styles.dark : styles.light;
  return (
    <div className={`${conditionalMode} ${styles.comp_wrapper}`}>
      <span className={styles.arrow} onClick={handleClose}>
        {open ? "▲" : "▼"}
      </span>
      {open ? (
        <span className={styles.search_div}>
          <input
            style={{
              color: currentColor,
              width: searchOpen ? "200px" : "0",
              height: searchOpen ? "30px" : "0",
            }}
            className={`${styles.search_input}`}
            placeholder="Search by county"
            type="text"
            name="search"
            id="search"
            onChange={handleSearch}
          />
          <label
            title={searchOpen ? "close" : "open"}
            htmlFor="search"
            className={styles.search_label}
            onClick={toggleSearch}
          >
            <MdSearch />{" "}
          </label>
        </span>
      ) : null}
      <div className={`${styles.dropdown_wrapper} ${open ? styles.open : ""}`}>
        <div
          className={styles.dropdown_item_one}
          style={{
            color: currentColor,
            marginBottom: "10px",
            display: "flex",
            justifyContent: "space-between",
          }}
          onClick={handleClose}
        >
          {selectStr}
        </div>
        {countries?.length &&
          countries?.map((details, idx) => (
            <div
              key={idx}
              className={`${styles.dropdown_item}`}
              onClick={() => handleClick(details)}
            >
              <Image
                className={styles.country_svg}
                src={details?.flags?.svg}
                alt={details?.name?.common}
                width={30}
                height={20}
              />
              <span
                className={`${styles.country_name} `}
                value={details?.idd?.root + details?.idd?.suffixes}
              >
                {details?.name?.common} (
                {details?.idd?.root + details?.idd?.suffixes})
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default NumberDropdown;
