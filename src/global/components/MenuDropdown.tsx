import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { menuState } from "../state/navbarState";
import { Path } from "../types/navigationType";

export default function MenuDropdown(props: Path) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useRecoilState(menuState);

  const handleNavigate = () => {
    setIsMenuOpen(false);
    navigate(props.path);
  };

  return (
    <li className="h-[70px] md:h-[50px] hover:bg-light-gray-element-color transition ease-in-out delay-75 border-b border-light-gray-background-color !-z-1">
      <button
        className="text-text-purple h-full w-full text-left px-[12.5%] md:px-[15%] text-[20px] md:text-[14px] !-z-1"
        onClick={handleNavigate}
      >
        {props.name}
      </button>
    </li>
  );
}
