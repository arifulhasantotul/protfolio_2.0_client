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
            style={{
              color: currentColor,
            }}
            type="text"
            id="name"
            name="name"
            value={basicData.name}
            onChange={handleInput}
            onBlur={createSlug}
          />
        </div>
        {/* slug field */}
        <div className={styles.input_field}>
          <label htmlFor="slug">Slug Id</label>
          <input
            style={{
              color: currentColor,
            }}
            type="text"
            id="slug"
            name="slug"
            value={basicData.slug}
            onChange={handleInput}
            disabled
          />
        </div>
        {/* slug field */}
        <div className={styles.input_field}>
          <label htmlFor="rank">Rank</label>
          <input
            style={{
              color: currentColor,
            }}
            type="number"
            id="rank"
            name="rank"
            value={basicData.rank}
            onChange={handleInput}
          />
        </div>
      </form>
    </div>
  );
};

export default Basic;
