import { atom, selector } from "recoil";
import { Path } from "../types/navigationType";
import { authRoutes } from "../../authentification/const";

export const loggedState = atom({
  key: "isLoggedIn",
  default: false,
});

export const pathsState = atom<Path[]>({
  key: "pathState",
  default: [
    {
      name: "Register",
      path: authRoutes.register,
      userLoggedIn: false,
    },
    {
      name: "Log in",
      path: authRoutes.logIn,
      userLoggedIn: false,
    },
    {
      name: "My saved configurations",
      path: "/home/configurations",
      userLoggedIn: true,
    },
  ],
});

export const pathSelector = selector<Path[]>({
  key: "pathSelector",
  get: ({ get }) => {
    const pathsArray = get(pathsState);
    const isLoggedIn = get(loggedState);

    if (isLoggedIn) return pathsArray.filter((path) => path.userLoggedIn);
    return pathsArray.filter((path) => !path.userLoggedIn);
  },
});
