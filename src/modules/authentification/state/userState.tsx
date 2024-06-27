import { atom } from "recoil";
import { User } from "../types/userType";

export const userState = atom<User | undefined>({
  key: "authentication.userState",
  default: undefined,
});

export const loggedState = atom({
  key: "authentication.isLoggedIn",
  default: true,
});
