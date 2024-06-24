import { atom, selector } from "recoil";
import { loggedState } from "../../authentification/state/userState";
import { Path } from "../types/navigationType";

export const pathsState = atom<Path[]>({
  key: "pathState",
  default: [
    {
      name: "Register",
      path: "/auth/register",
      userLoggedIn: true,
    },
    {
      name: "Log in",
      path: "/auth/log-in",
      userLoggedIn: false,
    },
    {
      name: "My saved configurations",
      path: "/home",
      userLoggedIn: true,
    },
    {
      name: "Configuration Edit",
      path: "/home/configure-a-car/configuration-edit",
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
