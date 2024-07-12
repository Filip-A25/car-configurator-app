import { auth } from "../../firebase/firebase";
import { signOut } from "firebase/auth";
import { useSetRecoilState } from "recoil";
import { loggedState } from "../state";
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
    <li className="flex items-center py-4 hover:bg-light-gray-element-color transition ease-in-out delay-75 border-b border-light-gray-background-color cursor-pointer">
      <button
        onClick={handleLogout}
        className="text-text-purple w-full px-5 text-left py-auto align-middle"
      >
        Logout
      </button>
    </li>
  );
}
