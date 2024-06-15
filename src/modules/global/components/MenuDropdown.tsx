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
      } max-md:hidden absolute h-[calc(100vh-80px)] md:h-[100px] md:right-[40px] top-full w-full md:w-[20%] 2xl:w-[15%] bg-basic-white z-20`}
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
