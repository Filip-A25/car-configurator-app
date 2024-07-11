import MenuDropdownItem from "./MenuDropdownItem";
import { Path } from "../types/navigationType";
import DropdownLogoutItem from "./DropdownLogoutItem";

interface Props {
  filteredPathsArray: Path[];
  isMenuOpen: boolean;
  isLoggedIn: boolean;
}

export default function MenuDropdown({
  filteredPathsArray,
  isMenuOpen,
  isLoggedIn,
}: Props) {
  return (
    <ul
      className={`${
        isMenuOpen
          ? "animate-navbarDropdownAnimation"
          : "animate-navbarDropdownAnimationReverse"
      } max-md:hidden absolute md:right-[40px] top-full w-full md:w-[30%] lg:w-[25%] xl:w-[20%] 2xl:w-[15%] bg-basic-white z-40`}
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
