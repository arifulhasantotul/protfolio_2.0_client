import DataLoading from "@/components/FetchingResult/DataLoading";
import {
  changePass,
  getOtp,
  verifyOTP,
} from "@/components/LoginComp/api-calls";
import PasswordStrengthMeter from "@/components/PasswordStrengthMeter/PasswordStrengthMeter";
import SimpleFormButton from "@/components/SimpleButton/SimpleFormButton";
import { useStateContext } from "@/context/ContextProvider";
import {
  failedToast,
  infoToast,
  otpModal,
  successToast,
} from "@/services/utils/toasts";
import styles from "@/styles/ChangePassword.module.css";
import { Container } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const ChangePassword = () => {
  const router = useRouter();

  const { currentColor, darkTheme, screenSize } = useStateContext();
  const [sendingReq, setSendingReq] = useState(false);

  const [showPass, setShowPass] = useState({
    pass1: false,
    pass2: false,
  });

  const initialState = {
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

  const changePassword = async () => {
    try {
      const otp = await otpModal(darkTheme, registerData?.email);

      if (!otp) return failedToast(darkTheme, "OTP not provided");

      const matchedOTP = await verifyOTP(otp, registerData?.email);
      if (!matchedOTP) {
        failedToast(darkTheme, "Invalid OTP, Verification failed!");
        setTimeout(() => {
          infoToast(
            darkTheme,
            "Remember",
            "Wait 5 minutes and try again with valid OTP"
          );
        }, 4500);
        return;
      }

      const obj = {
        email: registerData?.email,
        password: registerData?.password,
      };

      const res = await changePass(obj);

      if (res) {
        successToast(darkTheme, "Success!", "Password changed successfully!");
        setRegisterData(initialState);
        router.push("/login");
      }
    } catch (err) {
      console.log(
        "🚀 ~ file: ChangePassword.js:84 ~ changePassword ~ err:",
        err
      );
      failedToast(darkTheme, err?.message);
    }
  };

  const handleReset = async () => {
    setRegisterData({
      password: "",
      check_pass: "",
    });

    document.getElementById("password").value = "";
    document.getElementById("check_pass").value = "";
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

      const res = await getOtp(registerData?.email);
      if (res) {
        await changePassword();
      }
    } catch (err) {
      console.log("❌ ~ file: ChangePassword.js:58 ~ handleSubmit ~ err:", err);
    } finally {
      setSendingReq(false);
    }
  };

  useEffect(() => {
    const data = localStorage.getItem("userEmail");
    data && setRegisterData((prevState) => ({ ...prevState, email: data }));
  }, []);

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
          <h2 className={styles.form_heading}>Change Password</h2>
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
                value={registerData?.email || ""}
                onChange={handleInput}
                disabled
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

export default ChangePassword;
