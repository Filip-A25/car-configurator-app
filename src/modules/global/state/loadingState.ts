import {atom} from "recoil";

export const pageLoadingState = atom({
    key: "global.loadingState",
    default: true
})