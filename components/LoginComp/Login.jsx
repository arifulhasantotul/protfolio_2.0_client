import DataLoading from "@/components/FetchingResult/DataLoading";
import SimpleFormButton from "@/components/SimpleButton/SimpleFormButton";
import { useStateContext } from "@/context/ContextProvider";
import { detectBrowser, detectDevice } from "@/services/utils/common";
import { failedToast } from "@/services/utils/toasts";
import styles from "@/styles/Login.module.css";
import { Container } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const Login = ({ accessToken }) => {
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(["portfolio_2_0"]);
  const {
    currentColor,
    darkTheme,
    screenSize,
    customLoginUser,
    setLoginUserData,
    userIP,
  } = useStateContext();
  console.log("🚀 ~ file: Login.jsx:15 ~ Login ~ userIP:", userIP);
  const [showPass, setShowPass] = useState(false);
  const [isSendingReq, setIsSendingReq] = useState(false);
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

    if (name === "email") localStorage.setItem("userEmail", value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSendingReq(true);
    const browserName = detectBrowser(navigator);
    const { isMobile, device } = detectDevice(navigator);
    try {
      const user = await customLoginUser(
        registerData?.email,
        registerData?.password,
        userIP?.ip,
        isMobile,
        device,
        navigator?.userAgent,
        browserName,
        "ctg",
        "BD"
        // userIP?.city,
        // userIP?.countryName
      );
      setLoginUserData((prevState) => ({
        ...prevState,
        token: user?.token,
        userId: user?.userId,
        expired: user?.tokenExpiration,
      }));
      if (user) {
        setCookie("portfolio_2_0", user?.token, {
          path: "/",
          maxAge: user?.tokenExpiration,
          // secure: process.env.NEXT_PUBLIC_RUNNING !== "dev",
          // httpOnly: process.env.NEXT_PUBLIC_RUNNING !== "dev",
        });
        localStorage.setItem("portfolioIdToken", user?.userId);
        localStorage.setItem("isUserLoggedIn", 1);
        window.location.replace("/dashboard");
      }
      setIsSendingReq(false);
    } catch (err) {
      removeCookie("portfolio_2_0", { path: "/" });
      localStorage.removeItem("portfolioIdToken");
      console.log("❌ Error while login user", err);
      failedToast(darkTheme, err.message);
      setIsSendingReq(false);
    }
  };

  const handleForgotPass = () => {
    if (registerData?.email === "")
      return failedToast(darkTheme, "Please provide your email first!");

    router.push("/change-password");
  };

  const handleReset = async () => {
    setRegisterData(initialState);
  };

  // css conditionalMode for dark mode
  const conditionalMode = darkTheme ? styles.dark : styles.light;

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) setRegisterData((prevState) => ({ ...prevState, email }));
  }, []);

  useEffect(() => {
    if (!accessToken) localStorage.removeItem("portfolioIdToken");
  }, [accessToken]);
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
            <div className={styles.forgot_link}>
              <span
                style={{
                  color: currentColor,
                }}
                onClick={handleForgotPass}
              >
                Forget Password ?
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
          {!isSendingReq ? (
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
                tooltip="You'll get an OTP to your email"
              />
            </div>
          ) : (
            <DataLoading />
          )}
        </form>
      </Container>
    </div>
  );
};

export default Login;
