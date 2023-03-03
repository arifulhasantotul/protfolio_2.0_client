import DataLoading from "@/components/FetchingResult/DataLoading";
import PasswordStrengthMeter from "@/components/PasswordStrengthMeter/PasswordStrengthMeter";
import SimpleFormButton from "@/components/SimpleButton/SimpleFormButton";
import { useStateContext } from "@/context/ContextProvider";
import {
  removeFromLocalStorage,
  saveToLocalStorage,
} from "@/services/utils/temporarySave";
import {
  failedToast,
  infoToast,
  otpModal,
  successToast,
} from "@/services/utils/toasts";
import styles from "@/styles/Register.module.css";
import { Container } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { addUser, getOtp, verifyOTP } from "./api-calls";

const Register = () => {
  const router = useRouter();
  const { currentColor, darkTheme, screenSize } = useStateContext();
  const [sendingReq, setSendingReq] = useState(false);
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

  const handleBlur = () => {
    saveToLocalStorage("portfolioRegisterData", {
      name: registerData?.name || "",
      email: registerData?.email || "",
    });
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setRegisterData((prevState) => ({ ...prevState, [name]: value }));
    saveToLocalStorage("portfolioRegisterData", {
      name: registerData?.name || "",
      email: registerData?.email || "",
    });
  };

  const handleShowPass = (pass) => {
    setShowPass((prevState) => ({ ...prevState, [pass]: !prevState[pass] }));
  };

  const registerUser = async () => {
    try {
      const otp = await otpModal(darkTheme, registerData?.email);
      if (!otp) return failedToast(darkTheme, "Invalid OTP");

      const matchedOTP = await verifyOTP(otp, registerData?.email);

      if (!matchedOTP) {
        failedToast(darkTheme, "Invalid OTP, Registration failed!");
        setTimeout(() => {
          infoToast(
            darkTheme,
            "Remember",
            "Wait 5 minutes and try again with valid OTP"
          );
        }, 4500);
        return;
      }

      // register user
      const res = await addUser({
        name: registerData?.name,
        email: registerData?.email,
        password: registerData?.password,
      });

      if (res) {
        // console.log("✅ register user data", res);
        successToast(darkTheme, "Success!", "User registered successfully!");
        setRegisterData(initialState);
        router.push("/login");
        removeFromLocalStorage("portfolioRegisterData");
      }
    } catch (err) {
      console.log("❌ Error while registering user", err);
      failedToast(darkTheme, err?.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSendingReq(true);
    const { email, password, check_pass } = registerData;
    try {
      if (!email || !password || !check_pass)
        return failedToast(darkTheme, "Please fill all the fields");
      if (password !== check_pass)
        return failedToast(darkTheme, "Passwords do not match");

      if (password.length < 6)
        return failedToast(
          darkTheme,
          "Password must be at least 6 characters long"
        );

      // send otp to email
      const res = await getOtp(email);
      if (res) {
        successToast(darkTheme, "Success!", res);
        registerUser();
      }
    } catch (err) {
      console.log("❌ Error in Register page", err);
      failedToast(darkTheme, err?.message);
      // console.log("❌ Error in Register page", err?.message);
    } finally {
      setSendingReq(false);
    }
  };

  const handleReset = async () => {
    setRegisterData(initialState);
    removeFromLocalStorage("portfolioRegisterData");
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("check_pass").value = "";
  };

  useEffect(() => {
    const data = localStorage.getItem("portfolioRegisterData");
    const parsedData = data !== null ? JSON.parse(data) : null;
    if (!parsedData) return;
    setRegisterData({
      name: parsedData?.name || "",
      email: parsedData?.email || "",
    });
  }, []);

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
        className={styles.p0}
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
                value={registerData?.name || ""}
                onChange={handleInput}
                onBlur={handleBlur}
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
                value={registerData?.email || ""}
                onChange={handleInput}
                onBlur={handleBlur}
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
                value={registerData?.password || ""}
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
                value={registerData?.check_pass || ""}
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
          <div className={styles.input_field}>
            <PasswordStrengthMeter pass={registerData?.password} />
          </div>
          {!sendingReq ? (
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

export default Register;
