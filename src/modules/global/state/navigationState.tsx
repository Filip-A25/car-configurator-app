import { atom, selector } from "recoil";
import { loggedState } from "../../authentification/state/userState";
import { Path } from "../types/navigationType";

export const pathsState = atom<Path[]>({
  key: "pathState",
  default: [
    {
      name: "Register",
      path: "/auth/register",
      userLoggedIn: false,
      inDropdown: true,
    },
    {
      name: "Log in",
      path: "/auth/log-in",
      userLoggedIn: false,
      inDropdown: true,
    },
    {
      name: "My saved configurations",
      path: "/home",
      userLoggedIn: false,
      inDropdown: false,
    },
    {
      name: "Car select",
      path: "/home/configure-a-car/car-select",
      userLoggedIn: false,
      inDropdown: false,
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
