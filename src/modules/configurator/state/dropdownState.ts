import {atom} from "recoil";

export const dropdownState = atom<"color" | "wheels" | undefined>({
    key: "dropdownActiveName",
    default: undefined
})

export const dropdownOpen = atom({
    key: "isDropdownOpen",
    default: false
})