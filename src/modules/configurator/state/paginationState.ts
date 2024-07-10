import { atom, selector } from "recoil";
import {Page} from "../types";

export const pageState = atom<Page[]>({
  key: "configurator.pageState",
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

export const activePageState = selector<Page | undefined>({
  key: "configurator.activePageState",
  get: ({ get }) => {
    const pages = get(pageState);
    const activePage = pages.find(page => page.isActive);

    if (!activePage) return undefined;

    return activePage;
  }
})
