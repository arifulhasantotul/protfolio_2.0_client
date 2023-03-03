import { useStateContext } from "@/context/ContextProvider";
import { useEffect, useState } from "react";
import styles from "./PasswordStrengthMeter.module.css";
import { passwordStatus, props } from "./property";

const PasswordStrengthMeter = ({ pass }) => {
  const { darkTheme } = useStateContext();
  const [strength, setStrength] = useState(0);
  const initialStatus = {
    capLetterTest: 0,
    smallLetterTest: 0,
    numberTest: 0,
    specialTest: 0,
    lengthTest: 0,
  };
  const [passStatus, setPassStatus] = useState(initialStatus);

  const checkStrength = (password) => {
    if (!password) {
      setStrength(0);
      setPassStatus(initialStatus);
      return;
    }
    let capLetterTest = /[A-Z]+/.test(password) ? 1 : 0;
    let smallLetterTest = /[a-z]+/.test(password) ? 1 : 0;
    let numberTest = /[0-9]+/.test(password) ? 1 : 0;
    let specialTest = /[!\"$%&#/()=?@~`\\.\';:+=^*_-]+/.test(password) ? 1 : 0;
    let lengthTest = password.length >= 6 ? 1 : 0;
    let count =
      capLetterTest + smallLetterTest + numberTest + specialTest + lengthTest;
    setStrength(count);
    setPassStatus((prv) => ({
      ...prv,
      capLetterTest,
      smallLetterTest,
      numberTest,
      specialTest,
      lengthTest,
    }));
  };

  const conditionalMode = darkTheme ? styles.dark : styles.light;

  useEffect(() => {
    checkStrength(pass);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pass, strength]);
  return (
    <>
      <div className={`${conditionalMode} ${styles.progress}`}>
        <div
          style={{
            width: `${strength * 20}%`,
            background: props[strength].color,
          }}
          className={styles.bar}
        ></div>
      </div>
      <div className={styles.warning}>
        <p
          style={{
            color: props[strength].color,
          }}
        >
          {props[strength].text}
        </p>
      </div>
      <div className={styles.status}>
        <p>Password Status</p>
        <ul>
          {passwordStatus.map((item, idx) => (
            <li
              key={idx}
              className={`${passStatus[item.condition] ? styles.included : ""}`}
            >
              {item.text}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default PasswordStrengthMeter;
