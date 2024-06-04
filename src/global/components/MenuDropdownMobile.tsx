import MenuDropdownItem from "./MenuDropdownItem";
import { Path } from "../types/navigationType";

interface Props {
  filteredPathsArray: Path[];
  isMenuOpen: boolean;
}

export default function MenuDropdownMobile({
  filteredPathsArray,
  isMenuOpen,
}: Props) {
  return (
    <ul
      className={`${
        isMenuOpen
          ? "animate-navbarMobileDropdownAnimation"
          : "animate-navbarMobileDropdownAnimationReverse"
      } md:hidden absolute !-z-1 h-[calc(100vh-80px)] md:h-[100px] md:right-[40px] top-full w-full md:w-[20%] 2xl:w-[15%] bg-basic-white`}
    >
      {filteredPathsArray.map((path) => (
        <MenuDropdownItem key={path.path} name={path.name} path={path.path} />
      ))}
    </ul>
  );
}
