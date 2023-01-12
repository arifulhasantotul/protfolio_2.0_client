const { default: Swal } = require("sweetalert2");

const white_bg = "#dde1e7";
const black_bg = "linear-gradient(145deg, #1e2024, #23272b)";

// success toast
export const successToast = (dark, title, text) => {
  Swal.fire({
    toast: true,
    position: "top-end",
    title: title,
    text: text,
    icon: "success",
    color: dark ? "#29fd53" : "#3c3e41",
    background: dark ? black_bg : white_bg,
    showConfirmButton: false,
    timer: 4000,
  });
};

// delete success toast
export const successDeleteToast = (dark, topic) => {
  Swal.fire({
    toast: true,
    position: "top-end",
    title: "Deleted !",
    text: `${topic} has been deleted.`,
    icon: "success",
    color: dark ? "#29fd53" : "#3c3e41",
    background: dark ? black_bg : white_bg,
    showConfirmButton: false,
    timer: 4000,
  });
};

// delete cancel toast
export const cancelDeleteToast = (dark) => {
  Swal.fire({
    toast: true,
    position: "top-end",
    title: "Cancelled !",
    text: "Operation cancelled",
    icon: "info",
    color: dark ? "#43dde6" : "#3c3e41",
    background: dark ? black_bg : white_bg,
    showConfirmButton: false,
    timer: 4000,
  });
};

// delete cancel toast
export const infoToast = (dark, title, text) => {
  Swal.fire({
    toast: true,
    position: "top-end",
    title: title,
    text: text,
    icon: "info",
    color: dark ? "#43dde6" : "#3c3e41",
    background: dark ? black_bg : white_bg,
    showConfirmButton: false,
    timer: 4000,
  });
};

// delete failed toast
export const failedToast = (dark, text) => {
  Swal.fire({
    toast: true,
    position: "top-end",
    title: "Error !",
    text: text,
    icon: "error",
    color: "#fc5185",
    background: dark ? black_bg : white_bg,
    showConfirmButton: false,
    timer: 5000,
  });
};

export const otpModal = async (dark, email = "your email") => {
  const { value } = await Swal.fire({
    title: "Provide OTP",
    input: "text",
    color: dark ? "#43dde6" : "#3c3e41",
    background: dark ? black_bg : white_bg,
    inputLabel: `6 digits OTP send to ${email}`,
    inputPlaceholder: "XXXXXX",
    footer: "OTP will be expired in 5 minutes",
  });

  return value;
};
