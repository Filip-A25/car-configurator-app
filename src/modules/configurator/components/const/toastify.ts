import { ToastPosition, Theme } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

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