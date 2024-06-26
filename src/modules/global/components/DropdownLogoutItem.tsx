import { auth } from "../../firebase/firebase";
import { signOut } from "firebase/auth";
import { useSetRecoilState } from "recoil";
import { loggedState } from "../../authentification/state/userState";
import { useNavigate } from "react-router-dom";

export default function DropdownLogoutItem() {
  const setIsLoggedIn = useSetRecoilState(loggedState);
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setIsLoggedIn(false);
        navigate("/");
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  return (
    <li className="flex items-center dropdown-li-height hover:bg-light-gray-element-color transition ease-in-out delay-75 border-b border-light-gray-background-color cursor-pointer">
      <button
        onClick={handleLogout}
        className="text-text-purple dropdown-li-height w-full dropdown-link-line-height px-5 text-left dropdown-font-size py-auto align-middle"
      >
        Logout
      </button>
    </li>
  );
}
