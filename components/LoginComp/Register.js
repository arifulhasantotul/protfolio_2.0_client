import SimpleFormButton from "@/components/SimpleButton/SimpleFormButton";
import { useStateContext } from "@/context/ContextProvider";
import styles from "@/styles/Register.module.css";
import { Container } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const Register = () => {
  const { currentColor, darkTheme, screenSize } = useStateContext();
  const [showPass, setShowPass] = useState({
    pass1: false,
    pass2: false,
  });
  const initialState = {
    name: "",
    email: "",
    password: "",
    check_pass: "",
  };
  const [registerData, setRegisterData] = useState(initialState);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setRegisterData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleShowPass = (pass) => {
    setShowPass((prevState) => ({ ...prevState, [pass]: !prevState[pass] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("register data", registerData);
    try {
    } catch (err) {
      console.log("Error in Register page", err);
    }
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
          <h2 className={styles.form_heading}>Create Account</h2>
          <div className={styles.register_fields}>
            <div className={styles.input_field}>
              <label htmlFor="name">&#128374; Name</label>
              <input
                style={{
                  color: currentColor,
                }}
                type="text"
                id="name"
                name="name"
                value={registerData?.name}
                onChange={handleInput}
              />
            </div>
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
              <label htmlFor="password">&#128477; New Password</label>
              <input
                style={{
                  color: currentColor,
                }}
                type={showPass?.pass1 ? "text" : "password"}
                id="password"
                name="password"
                value={registerData?.password}
                onChange={handleInput}
              />
              <span className={styles.show_pass}>
                {!showPass.pass1 ? (
                  <BsEye onClick={() => handleShowPass("pass1")} />
                ) : (
                  <BsEyeSlash onClick={() => handleShowPass("pass1")} />
                )}
              </span>
            </div>
            <div className={styles.input_field}>
              <label htmlFor="check_pass">&#128477; Confirm Password</label>
              <input
                style={{
                  color: currentColor,
                }}
                type={showPass?.pass2 ? "text" : "password"}
                id="check_pass"
                name="check_pass"
                value={registerData?.check_pass}
                onChange={handleInput}
              />
              <span className={styles.show_pass}>
                {!showPass.pass2 ? (
                  <BsEye onClick={() => handleShowPass("pass2")} />
                ) : (
                  <BsEyeSlash onClick={() => handleShowPass("pass2")} />
                )}
              </span>
            </div>
          </div>
          <div className={styles.redirect_div}>
            <p>
              Already have an account? Go to{" "}
              <Link href="/login">
                <span
                  style={{
                    color: currentColor,
                  }}
                >
                  login
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
              name="Get OTP 🚀"
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

export default Register;
