import MenuDropdownItem from "./MenuDropdownItem";
import { Path } from "../types/navigationType";
import { useRecoilState } from "recoil";
import { loggedState } from "../../authentification/state/userState";
import { auth } from "../../firebase/firebase";
import { signOut } from "firebase/auth";
import { Navigate } from "react-router-dom";

interface Props {
  filteredPathsArray: Path[];
  isMenuOpen: boolean;
}

export default function MenuDropdown({
  filteredPathsArray,
  isMenuOpen,
}: Props) {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loggedState);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setIsLoggedIn(false);
        return <Navigate to="/" />;
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

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
      {isLoggedIn && (
        <li className="flex items-center h-[70px] md:h-[50px] hover:bg-light-gray-element-color transition ease-in-out delay-75 border-b border-light-gray-background-color cursor-pointer">
          <button
            onClick={handleLogout}
            className="text-text-purple h-[70px] md:h-[50px] w-full leading-[70px] md:leading-[50px] px-5 text-left text-[20px] md:text-[14px] py-auto align-middle"
          >
            Logout
          </button>
        </li>
      )}
    </ul>
  );
}
