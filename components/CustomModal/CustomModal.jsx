import { useStateContext } from "@/context/ContextProvider";
import styles from "@/styles/CustomModal.module.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

export default function CustomModal({
  open,
  handleClose,
  children,
  width = "400px",
  padding = "30px",
}) {
  const { currentColor, darkTheme } = useStateContext();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: `${width}`,
    border: `2px solid ${currentColor}`,
    boxShadow: 24,
    borderRadius: 2,
    p: `${padding}`,
  };

  // css conditionalMode for dark mode
  const conditionalMode = darkTheme ? styles.dark : styles.light;
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          className={`${conditionalMode} ${styles.custom_modal_wrapper}`}
        >
          {children}
        </Box>
      </Modal>
    </div>
  );
}
