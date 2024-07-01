import { ToastPosition, Theme } from "react-toastify"

interface ToastifyProps {
    position: ToastPosition;
    autoClose: number;
    hideProgressBar: boolean;
    closeOnClick: boolean;
    theme: Theme;
}

export const toastifySuccessProps: ToastifyProps = {
    position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      theme: "light"
}