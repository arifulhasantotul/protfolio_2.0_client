import { useStateContext } from "@/context/ContextProvider";
import { ADD_CATEGORY } from "@/services/graphql/mutation";
import styles from "@/styles/DashboardPage.module.css";
// import { useMutation } from "@apollo/client";
import { Container } from "@mui/material";
import client from "apollo-client";
import { useState } from "react";

const createCategory = async (payload) => {
  const { data } = await client.mutate({
    mutation: ADD_CATEGORY,
    variables: {
      input: payload,
    },
  });
  return data;
};

const DashboardPage = ({ categories }) => {
  console.log("categories", categories);
  const { darkTheme } = useStateContext();
  const [val, setVal] = useState("");

  // css conditionalMode for dark mode
  const conditionalMode = darkTheme ? styles.dark : styles.light;
  const handleChange = (e) => {
    setVal(e.target.value);
  };
  console.log(val);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataSet = {
      name: val,
    };
    const data = await createCategory(dataSet);
    console.log(data);
  };

  return (
    <div className={`${styles.dash_page} ${conditionalMode}`}>
      <Container maxWidth="xl">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Category name"
            onChange={handleChange}
          />
          <input type="submit" value="Create" />
        </form>
      </Container>
    </div>
  );
};

export default DashboardPage;
