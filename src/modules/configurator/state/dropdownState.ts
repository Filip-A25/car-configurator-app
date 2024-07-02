import {atom} from "recoil";
import {CurrentPropertyIndex, CarPropertyName} from "../types";

export const activePropState = atom<CurrentPropertyIndex>({
    key: "configurator.activePropIndex",
    default: {
        color: 0,
        wheels: 0,
        interior_variants: 0
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