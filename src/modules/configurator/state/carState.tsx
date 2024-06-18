import { atom } from "recoil";
import { CarConfigurations } from "../types";

export const currentConfiguration = atom<CarConfigurations | undefined>({
  key: "configurator.currentConfiguration",
  default: undefined,
});

export const modelConfigurations = atom({
  key: "configurator.modelConfigurations",
  default: {},
});
