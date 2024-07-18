import {toast} from "react-toastify";
import { toastifySuccessProps } from "../const";
import { decimalRegexp } from "../const";

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

export const notifyCreate = () => {
  toast.success("Configuration successfully created.", toastifySuccessProps);
}

export const notifyUpdate = () => {
  toast.success("Configuration successfully updated.", toastifySuccessProps);
}

export const getDisplayPrice = (price: number | undefined) => {
  return price?.toFixed(2).replace(decimalRegexp, ",");
} 