import { atom } from "recoil";

export const paginationState = atom({
  key: "configurator.paginationState",
  default: 1,
});
