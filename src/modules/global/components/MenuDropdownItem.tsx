import { Path } from "../types/navigationType";
import { Link } from "react-router-dom";

export default function MenuDropdownItem(props: Path) {
  return (
    <li className="flex items-center dropdown-li-height hover:bg-light-gray-element-color transition ease-in-out delay-75 border-b border-light-gray-background-color cursor-pointer">
      <Link
        to={props.path}
        className="text-text-purple dropdown-li-height w-full dropdown-link-line-height px-5 text-left dropdown-font-size py-auto align-middle"
      >
        {props.name}
      </Link>
    </li>
  );
}
