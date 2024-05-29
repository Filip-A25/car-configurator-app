import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { NavLink } from "react-router-dom";
import { loggedState } from "../../authentification/state/userState";

interface Path {
  name: string;
  path: string;
}

export default function MenuDropdown() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loggedState);
  const [pathArray, setPathArray] = useState<Path[]>([]);

  useEffect(() => {
    if (isLoggedIn) {
      setPathArray([
        {
          name: "Register",
          path: "/auth/register",
        },
        {
          name: "Log in",
          path: "/auth/log-in",
        },
      ]);
    } else {
      setPathArray([
        {
          name: "My saved configurations",
          path: "/configurations/saved",
        },
        {
          name: "Logout",
          path: "/",
        },
      ]);
    }
  }, [isLoggedIn]);

  return (
    <>
      {pathArray.map((path) => {
        <NavLink to={path.path}>{path.name}</NavLink>;
      })}
    </>
  );
}
