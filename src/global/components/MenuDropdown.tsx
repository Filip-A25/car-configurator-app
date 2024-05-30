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
    <li className="h-[50px]">
      <button
        className="text-text-purple h-full w-full text-left px-[15%] text-[14px]"
        onClick={handleNavigate}
      >
        {props.name}
      </button>
    </li>
  );
}
