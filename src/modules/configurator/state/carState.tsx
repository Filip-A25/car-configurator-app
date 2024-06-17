import { atom } from "recoil";
import { CarModel } from "../types/carType";

export const currentConfiguration = atom<CarModel>({
  key: "configurator.currentConfiguration",
  default: {
    id: "8fYqUodzXUKYFVMYtUnJ",
    model: "Audi RS5",
    productionYear: 2022,
    wheelVariant: 1,
    interiorVariant: "black and red",
    totalPrice: 200000,
  },
});

export const modelConfigurations = atom({
  key: "configurator.modelConfigurations",
  default: {},
});
