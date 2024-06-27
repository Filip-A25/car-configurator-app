import {atom} from "recoil";
import {CurrentPropertyIndex} from "../types";

export const activePropState = atom<CurrentPropertyIndex>({
    key: "configurator.activePropIndex",
    default: {
        color: 0,
        wheels: 0
    }
})

export const dropdownState = atom<"color" | "wheels" | undefined>({
    key: "configurator.dropdownActiveName",
    default: undefined
})

export const dropdownOpen = atom({
    key: "configurator.isDropdownOpen",
    default: false
})