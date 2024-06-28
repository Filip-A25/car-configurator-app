import { atom } from "recoil";
import { CarConfigurationsWithId } from "../types";

export const carsState = atom<CarConfigurationsWithId[] | undefined>({
  key: "configurator.carsState",
  default: undefined,
});
