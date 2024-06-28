import { atom } from "recoil";
import { UserCarConfiguration } from "../types";

export const userConfigurationsState = atom<UserCarConfiguration[]>({
  key: "configurator.userConfigurations",
  default: [
    {
      id: "fyD2ZxiqU96iyZOBHwAX",
      model: "Audi RS6",
      modelId: "4ga5WjQSp8Ik7H1JmA1q",
      productionYear: 2022,
      color: {
        label: "polar_white",
        name: "Polar white",
        price: 0,
      },
      wheels: {
        label: 1,
        name: "Felge 1",
        price: 3900,
      },
      interiorVariant: "black and red",
      totalPrice: 128900,
    },
  ]
});
