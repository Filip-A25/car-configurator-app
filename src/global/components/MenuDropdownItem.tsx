import { Path } from "../types/navigationType";
import { Link } from "react-router-dom";

export default function MenuDropdownItem(props: Path) {
  return (
    <li className="flex items-center h-[70px] md:h-[50px] hover:bg-light-gray-element-color transition ease-in-out delay-75 border-b border-light-gray-background-color !-z-1 cursor-pointer">
      <Link
        to={props.path}
        className="text-text-purple h-[70px] md:h-[50px] w-full leading-[70px] md:leading-[50px] px-5 text-left text-[20px] md:text-[14px] py-auto !-z-1 align-middle"
      >
        {props.name}
      </Link>
    </li>
  );
}
