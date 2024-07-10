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
  key: "configurator.configurationPriceState",
  get: ({get}) => {
    const userConfiguration = get(userConfigurationState);
    
    if (!userConfiguration) return;
    const price = userConfiguration.modelPrice + userConfiguration.color.price + userConfiguration.wheels.price + userConfiguration.interior_variants.price;
    
    return price;
  }
})

export const configurationStringPriceState = selector({
  key: "configurator.configurationStringPriceState",
  get: ({get}) => {
    const currentPrice = get(configurationPriceState);

    if (!currentPrice) return;

    return currentPrice.toFixed(2).replace(decimalRegexp, ",");
  }
})