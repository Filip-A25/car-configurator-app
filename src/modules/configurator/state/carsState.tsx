import { atom } from "recoil";
import { Car } from "../types/carType";

export const carsState = atom<Car[] | undefined>({
  key: "configurator.carsState",
  default: undefined,
});
