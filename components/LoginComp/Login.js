import SimpleFormButton from "@/components/SimpleButton/SimpleFormButton";
import { useStateContext } from "@/context/ContextProvider";
import styles from "@/styles/Login.module.css";
import { Container } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const Login = () => {
  const { currentColor, darkTheme, screenSize } = useStateContext();
  const [showPass, setShowPass] = useState(false);
  const initialState = {
    email: "",
    password: "",
  };
  const [registerData, setRegisterData] = useState(initialState);

  const handleShowPass = () => {
    setShowPass((prevState) => !prevState);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setRegisterData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("register data", registerData);
  };

  const handleReset = async () => {
    setRegisterData(initialState);
  };

  // css conditionalMode for dark mode
  const conditionalMode = darkTheme ? styles.dark : styles.light;
  return (
    <div className={`${styles.register_page} ${conditionalMode}`}>
      <Container
        maxWidth="lg"
        style={{
          display: "grid",
          placeItems: "center",
        }}
      >
        <form onSubmit={handleSubmit} className={styles.form_wrapper}>
          <h2 className={styles.form_heading}>Sign In</h2>
          <p>To keep connected with us please login with your personal info</p>
          <div className={styles.register_fields}>
            <div className={styles.input_field}>
              <label htmlFor="email">&#9993; Email</label>
              <input
                style={{
                  color: currentColor,
                }}
                type="text"
                id="email"
                name="email"
                value={registerData?.email}
                onChange={handleInput}
              />
            </div>
            <div className={styles.input_field}>
              <label htmlFor="password">&#128477; Password</label>
              <input
                style={{
                  color: currentColor,
                }}
                type={showPass ? "text" : "password"}
                id="password"
                name="password"
                value={registerData?.password}
                onChange={handleInput}
              />
              <span className={styles.show_pass}>
                {!showPass ? (
                  <BsEye onClick={handleShowPass} />
                ) : (
                  <BsEyeSlash onClick={handleShowPass} />
                )}
              </span>
            </div>
          </div>
          <div className={styles.redirect_div}>
            <p>
              {`Don't have an account? Go to`}{" "}
              <Link href="/register">
                <span
                  style={{
                    color: currentColor,
                  }}
                >
                  register
                </span>
              </Link>{" "}
              page{" "}
            </p>
          </div>
          <div className={styles.btn_div}>
            <SimpleFormButton
              name="❌ Reset"
              type="button"
              onClick={handleReset}
              tooltip="Reset form data"
            />
            {screenSize > 450 && <div></div>}
            <SimpleFormButton
              name="Login 🚀"
              type="submit"
              // onClick={handleSubmit}
              tooltip="You'll get an OTP to your email"
            />
          </div>
        </form>
      </Container>
    </div>
  );
};

export default Login;
