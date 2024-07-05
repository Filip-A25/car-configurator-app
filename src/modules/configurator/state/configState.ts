import { atom, selector } from "recoil";
import { CarConfigurations, UserCarConfiguration } from "../types";
import { decimalRegexp } from "../const";
import {Timestamp} from "firebase/firestore";

export const currentConfigurationsState = atom<CarConfigurations | undefined>({
  key: "configurator.currentConfigurationsState",
  default: undefined,
});

export const userConfigurationState = atom<UserCarConfiguration | undefined>({
  key: "configurator.userConfigurationState",
  default: {
    model: "Audi e-tron GT",
    modelId: "lnuaxcRV6UqeiVYD60mC",
    productionYear: 2022,
    color: {
      label: "florett_white",
      name: "Florett White",
      price: 0
    },
    wheels: {
      label: 1,
      name: "Felge 1",
      price: 0
    },
    interiorVariant: {
      label: "black",
      name: "Black",
      price: 0
    },
    creationDate: Timestamp.fromDate(new Date()),
    totalPrice: 124300,
    id: "aPosKWKa98Dm2CGiKux7"
  },
});

export const userConfigurationsState = atom<UserCarConfiguration[]>({
  key: "configurator.userConfigurationsState",
  default: []
})

export const configurationPriceState = selector({
  key: "configurator.configurationPrice",
  get: ({get}) => {
    const configuration = get(userConfigurationState);
    
    if (!configuration) return;
    const price = configuration.totalPrice + configuration.color.price + configuration.wheels.price;
    const decimalPrice = price.toFixed(2).replace(decimalRegexp, ",");
    
    return decimalPrice;
  }
})