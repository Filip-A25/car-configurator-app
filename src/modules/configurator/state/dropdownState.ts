import {atom} from "recoil";

export const dropdownState = atom<"color" | "wheels" | "all">({
    key: "configurator.dropdownState",
    default: "all"
})