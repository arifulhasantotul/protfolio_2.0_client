import DataNotFound from "@/components/FetchingResult/DataNotFound";
import PageHeader from "@/components/PageHeader/PageHeader";
import { useStateContext } from "@/context/ContextProvider";
import { ALL_USERS } from "@/services/graphql/queries";
import { validArray } from "@/services/utils/common";
import styles from "@/styles/UsersComponent.module.css";
import { Container } from "@mui/material";
import { swrFetcher } from "apolloClient";
import { Fragment } from "react";
import useSWR from "swr";

const UsersComponent = ({ userDetails, initUsers, accessToken }) => {
  const { currentColor, darkTheme } = useStateContext();

  const fetcher = async () => {
    const { listUser } = await swrFetcher(accessToken, ALL_USERS, {});
    return listUser;
  };

  const { data, mutate, error } = useSWR([ALL_USERS, {}], fetcher, {
    initialData: initUsers,
    revalidateOnFocus: false,
  });

  const isValidUser = (id) => {
    return userDetails?.userId === id || userRole === "Admin";
  };

  // css conditionalMode for dark mode
  const conditionalMode = darkTheme ? styles.dark : styles.light;

  return (
    <div className={`${conditionalMode} ${styles.users_table_wrapper}`}>
      <Container maxWidth="lg">
        <PageHeader title="Users" />

        <div
          className={styles.table_container}
          style={{
            color: currentColor,
          }}
        >
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Devices</th>
              </tr>
            </thead>
            <tbody>
              {validArray(data)
                ? data.map((item, idx) => (
                    <tr key={idx}>
                      <td>{isValidUser(item?.id) ? item?.name : "N/A"}</td>
                      <td>{isValidUser(item?.id) ? item?.email : "N/A"}</td>
                      <td>{isValidUser(item?.id) ? item?.phone : "N/A"}</td>
                      <td>
                        {validArray(item?.devices) && isValidUser(item?.id)
                          ? item?.devices.map((_, idx2) => (
                              <Fragment key={idx2}>
                                <li>IP: {_?.userIP || "N/A"}</li>
                                <li>Browser: {_?.userBrowser || "N/A"}</li>
                                <li>Platform: {_?.userPlatform || "N/A"}</li>
                                <li>City: {_?.ipCity || "N/A"}</li>
                                <li>Country: {_?.ipCountry || "N/A"}</li>
                                <br />
                              </Fragment>
                            ))
                          : "N/A"}
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
          {!validArray(data) && <DataNotFound title="Users not found" />}
        </div>
      </Container>
    </div>
  );
};

export default UsersComponent;
