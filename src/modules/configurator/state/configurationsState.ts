import { atom } from "recoil";
import { UserCarConfiguration } from "../types";

export const userConfigurationsState = atom<UserCarConfiguration[]>({
  key: "configurator.userConfigurations",
  default: []
});
