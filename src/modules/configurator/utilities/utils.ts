import {toast} from "react-toastify";
import { toastifySuccessProps } from "../components/const";

export const getPropertyTypeName = (propertyName: string) => {
    switch (propertyName) {
      case "color":
        return "Paint color";
      case "wheels":
        return "Wheels";
      case "interior_variants":
        return "Color";
      default:
        return;
    }
}

export const notifyDelete = () => {
    toast.success("Configuration successfully deleted.", toastifySuccessProps);
};