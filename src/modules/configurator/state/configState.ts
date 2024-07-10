import { atom, selector } from "recoil";
import { CarConfigurations, UserCarConfiguration } from "../types";
import { getDisplayPrice } from "../utilities/utils";

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
    const price = parseFloat(userConfiguration.modelPrice.toFixed(2)) + parseFloat(userConfiguration.color.price.toFixed(2)) + parseFloat(userConfiguration.wheels.price.toFixed(2)) + parseFloat(userConfiguration.interior_variants.price.toFixed(2));
    
    return price;
  }
})

export const configurationStringPriceState = selector({
  key: "configurator.configurationStringPriceState",
  get: ({get}) => {
    const currentPrice = get(configurationPriceState);

    if (!currentPrice) return;

    const displayPrice = getDisplayPrice(currentPrice);

    return displayPrice;
  }
})