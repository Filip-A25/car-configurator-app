import { atom } from "recoil";
import { Configuration } from "../types/configurationsType";

export const userConfigurationsState = atom<Configuration[] | undefined>({
  key: "configurator.userConfigurations",
  default: undefined,
});
