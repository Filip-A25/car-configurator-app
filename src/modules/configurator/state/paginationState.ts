import { atom } from "recoil";
import {Page} from "../types";

export const pageState = atom<Page[]>({
  key: "configurator.paginationState",
  default: [{
    name: "Exterior",
    index: 1,
    isActive: true
  },
  {
    name: "Interior",
    index: 2,
    isActive: false
  },
{
  name: "Summary",
  index: 3,
  isActive: false
}]
});
