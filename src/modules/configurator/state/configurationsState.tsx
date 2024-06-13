import { atom } from "recoil";
import { Configuration } from "../types/configurationsType";

export const userConfigurationsState = atom<Configuration[]>({
  key: "configurator.userConfigurations",
  default: [],
});
