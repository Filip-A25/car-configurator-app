import { atom, selector } from "recoil";
import { useForm } from "react-hook-form";
import { User } from "../types/userType";

export const userState = atom<User | undefined>({
  key: "userState",
  default: undefined,
});
