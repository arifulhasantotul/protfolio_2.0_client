import { useStateContext } from "@/context/ContextProvider";
import styles from "@/styles/QuillEditor.module.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const QuillEditor = ({ value, setValue }) => {
  const { currentColor, darkTheme } = useStateContext();

  const conditionalMode = darkTheme ? styles.dark : styles.light;
  return (
    <div className={`${conditionalMode} ${styles.editor}`}>
      <ReactQuill
        // theme="snow"
        style={{
          color: currentColor,
          border: "none",
          outline: "none",
        }}
        value={value}
        onChange={setValue}
      />
    </div>
  );
};

export default QuillEditor;
