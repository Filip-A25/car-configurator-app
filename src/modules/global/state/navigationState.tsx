import { atom, selector } from "recoil";
import { Path } from "../types/navigationType";

export const loggedState = atom({
  key: "isLoggedIn",
  default: false,
});

export const pathsState = atom<Path[]>({
  key: "pathState",
  default: [
    {
      name: "Register",
      path: "/auth/register",
      userLoggedIn: false,
    },
    {
      name: "Log in",
      path: "/auth/log-in",
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
