import { atom, selector } from "recoil";
import { CarConfigurations, UserCarConfiguration } from "../types";
import { decimalRegexp } from "../const";

export const currentConfigurationsState = atom<CarConfigurations | undefined>({
  key: "configurator.currentConfigurationsState",
  default: undefined,
});

export const userConfigurationState = atom<UserCarConfiguration | undefined>({
  key: "configurator.userConfigurationState",
  default: undefined
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