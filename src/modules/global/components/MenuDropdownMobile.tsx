import MenuDropdownItem from "./MenuDropdownItem";
import { Path } from "../types/navigationType";
import DropdownLogoutItem from "./DropdownLogoutItem";
import clsx from "clsx";

interface Props {
  filteredPathsArray: Path[];
  isMenuOpen: boolean;
  isMenuAnimated: boolean;
  isLoggedIn: boolean;
}

export default function MenuDropdownMobile({
  filteredPathsArray,
  isMenuOpen,
  isMenuAnimated,
  isLoggedIn,
}: Props) {
  return (
    <ul
      className={clsx(
        "hidden absolute h-[calc(100vh-80px)] md:h-[100px] md:right-[40px] top-full w-full md:w-[20%] 2xl:w-[15%] bg-basic-white z-20",
        isMenuOpen && isMenuAnimated
          ? "max-sm:block md:hidden animate-navbarMobileDropdownAnimation"
          : !isMenuOpen && isMenuAnimated
          ? "max-sm:block md:hidden animate-navbarMobileDropdownAnimationReverse"
          : ""
      )}
    >
      {filteredPathsArray.map((route) => (
        <MenuDropdownItem
          key={route.path}
          name={route.name}
          path={route.path}
        />
      ))}
      {isLoggedIn && <DropdownLogoutItem />}
    </ul>
  );
}
