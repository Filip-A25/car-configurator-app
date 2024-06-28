import { atom } from "recoil";
import { UserCarConfiguration } from "../types";

export const userConfigurationsState = atom<UserCarConfiguration[]>({
  key: "configurator.userConfigurations",
  default: [
    {
      model: "Audi RS6",
      productionYear: 2022,
      color: {
        label: "ultra_blue",
        name: "Ultra blue",
        price: 0,
      },
      wheels: {
        label: 1,
        name: "Felge 1",
        price: 3900,
      },
      interiorVariant: "black and red",
      price: 125000,
    },
    {
      model: "Audi e-tron GT",
      productionYear: 2022,
      color: {
        label: "florett_white",
        name: "Florett white",
        price: 0,
      },
      wheels: {
        label: 2,
        name: "Felge 2",
        price: 3000,
      },
      interiorVariant: "red",
      price: 108000,
    },
    {
      model: "Audi RS5",
      productionYear: 2022,
      color: {
        label: "tango_red",
        name: "Tango red",
        price: 0,
      },
      wheels: {
        label: 1,
        name: "Felge 1",
        price: 2500,
      },
      interiorVariant: "black and gray",
      price: 80000,
    },
  ],
});
