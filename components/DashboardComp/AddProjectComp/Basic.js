import { useStateContext } from "@/context/ContextProvider";
import styles from "@/styles/ProjectForm.module.css";
import { useState } from "react";

const Basic = (props) => {
  const { currentColor, darkTheme } = useStateContext();

  const [basicData, setBasicData] = useState({
    name: "",
    slug: "",
    des: [],
    rank: 0,
    categoriesId: [],
    tagsId: [],
    ratings: 0,
    status: "",
    clientId: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setBasicData((prevState) => ({ ...prevState, [name]: value }));
  };

  const createSlug = () => {
    if (basicData.name) {
      const slug = basicData?.name.toLowerCase().replace(/ /g, "-");
      setBasicData((prevState) => ({ ...prevState, slug }));
    } else {
      setBasicData((prevState) => ({ ...prevState, slug: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  // css conditionalMode for dark mode
  const conditionalMode = darkTheme ? styles.dark : styles.light;

  return (
    <div className={styles.conditionalMode}>
      <form className={styles.form} onSubmit={handleSubmit}>
        {/* name field */}
        <div className={styles.input_field}>
          <label htmlFor="name">
            Name{" "}
            <span
              className={styles.red_color}
            >{`(Unique name required!)`}</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            onClick={handleInput}
            onBlur={createSlug}
          />
        </div>
        {/* slug field */}
        <div className={styles.input_field}>
          <label htmlFor="slug">Slug Id</label>
          <input
            type="text"
            id="slug"
            name="slug"
            onClick={handleInput}
            disabled
          />
        </div>
        {/* slug field */}
        <div className={styles.input_field}>
          <label htmlFor="rank">Rank</label>
          <input type="number" id="rank" name="rank" onClick={handleInput} />
        </div>
      </form>
    </div>
  );
};

export default Basic;
