import {atom} from "recoil";
import {CurrentPropertyIndex, CarPropertyName} from "../types";

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