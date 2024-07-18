import {atom, selector} from "recoil";
import {CurrentPropertyIndex, CarPropertyName, TextVariant, NumberVariant} from "../types";
import { userConfigurationState } from "./configState";

export const activePropState = atom<CurrentPropertyIndex>({
    key: "configurator.activePropIndex",
    default: {
        color: undefined,
        wheels: undefined,
        interior_variants: undefined
    }
})

export const dropdownState = atom<CarPropertyName>({
    key: "configurator.dropdownActiveName",
    default: undefined
})

export const dropdownOpen = atom({
    key: "configurator.isDropdownOpen",
    default: false
})

export const activeColorPropertyState = selector<TextVariant | undefined>({
    key: "configurator.activeColorPropertyState",
    get: ({get}) => {
        const userConfiguration = get(userConfigurationState);      
        const activeColorProperty = userConfiguration?.color;

        return activeColorProperty;
    }
})

export const activeWheelPropertyState = selector<NumberVariant | undefined>({
    key: "configurator.activeWheelPropertyState",
    get: ({get}) => {
        const userConfiguration = get(userConfigurationState);      
        const activeWheelProperty = userConfiguration?.wheels;

        return activeWheelProperty;
    }
})

export const activeInteriorPropertyState = selector<TextVariant | undefined>({
    key: "configurator.activeInteriorPropertyState",
    get: ({get}) => {
        const userConfiguration = get(userConfigurationState);      
        const activeInteriorProperty = userConfiguration?.interior_variants;

        return activeInteriorProperty;
    }
})