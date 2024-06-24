import { atom, selector } from "recoil";
import { CarConfigurations, UserCarConfiguration } from "../types";
import { decimalRegexp } from "../const";

export const currentConfigurations = atom<CarConfigurations | undefined>({
  key: "configurator.currentConfigurations",
  default: undefined,
});

export const userConfiguration = atom<UserCarConfiguration | undefined>({
  key: "configurator.userConfiguration",
  default: undefined,
});

export const configurationPrice = selector({
  key: "configurator.configurationPrice",
  get: ({get}) => {
    const configuration = get(userConfiguration);
    
    if (!configuration) return;
    const price = configuration.price + configuration.color.price + configuration.wheels.price;
    const decimalPrice = price.toFixed(2).toString().replace(decimalRegexp, ",");
    
    return decimalPrice;
  }
})