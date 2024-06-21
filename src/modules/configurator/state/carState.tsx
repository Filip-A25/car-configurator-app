import { atom } from "recoil";
import { CarConfigurations, UserCarConfiguration } from "../types";

export const currentConfigurations = atom<CarConfigurations | undefined>({
  key: "configurator.currentConfigurations",
  default: undefined,
});

export const userConfiguration = atom<UserCarConfiguration | undefined>({
  key: "configurator.userConfiguration",
  default: undefined,
});
