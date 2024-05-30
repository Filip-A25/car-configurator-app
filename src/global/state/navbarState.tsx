import { atom, selector } from "recoil";

export const menuState = atom({
  key: "menuState",
  default: false,
});

export const mobileState = atom({
  key: "mobileState",
  default: false,
});
