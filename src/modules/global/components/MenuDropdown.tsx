import MenuDropdownItem from "./MenuDropdownItem";
import { Path } from "../types/navigationType";

interface Props {
  filteredPathsArray: Path[];
  isMenuOpen: boolean;
}

export default function MenuDropdown({
  filteredPathsArray,
  isMenuOpen,
}: Props) {
  return (
    <ul
      className={`${
        isMenuOpen
          ? "animate-navbarDropdownAnimation"
          : "animate-navbarDropdownAnimationReverse"
      } max-sm:hidden absolute h-[calc(100vh-80px)] md:h-[100px] md:right-[40px] top-full w-full md:w-[20%] 2xl:w-[15%] bg-basic-white`}
    >
      {filteredPathsArray.map((route) => (
        <MenuDropdownItem
          key={route.path}
          name={route.name}
          path={route.path}
        />
      ))}
    </ul>
  );
}
