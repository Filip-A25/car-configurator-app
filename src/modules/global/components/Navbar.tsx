import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { pathSelector } from "../state/navigationState";
import MenuDropdownMobile from "./MenuDropdownMobile";
import MenuDropdown from "./MenuDropdown";
import { loggedState } from "../../authentification/state/userState";
import clsx from "clsx";

export default function Navbar() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const filteredPathsArray = useRecoilValue(pathSelector);
  const isLoggedIn = useRecoilValue(loggedState);
  const [isNavbarAnimated, setIsNavbarAnimated] = useState(false);
  const [isMenuAnimated, setIsMenuAnimated] = useState(false);

  const { pathname } = useLocation();

  const handleOpenMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsNavbarAnimated(true);
    setIsMenuAnimated(true);
    setMenuOpen(true);
  };

  const handleCloseMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    setMenuOpen(false);
    setTimeout(() => {
      setIsNavbarAnimated(false);
      setIsMenuAnimated(false);
    }, 200);
  };

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <nav
      className={clsx(
        "relative h-[80px] md:h-[60px] lg:h-[70px] w-screen bg-navbar-dark-gray-color flex items-center",
        isMenuOpen && isNavbarAnimated
          ? "max-md:animate-navbarMobileColorAnimation"
          : !isMenuOpen && isNavbarAnimated
          ? "max-md:animate-navbarMobileColorAnimationReverse"
          : ""
      )}
    >
      <NavLink
        to="/"
        className="absolute flex items-center justify-center nav-menu-link-height nav-menu-link-width left-[40px] outline-none"
      >
        <svg
          width="18"
          height="20"
          viewBox="0 0 18 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.3132 9.25442C12.1637 9.25442 13.5379 8.28371 13.5379 6.51308C13.5379 4.62859 12.3881 3.82866 10.3132 3.82866H4.53665V9.25442H10.3132ZM0.25 0H10.569C14.7186 0 17.831 2.4839 17.831 6.53834C17.831 10.651 14.8308 13.078 10.569 13.078H4.53971V19.9876H0.25V0Z"
            fill="white"
          />
        </svg>
      </NavLink>
      <button
        className="absolute nav-menu-link-height nav-menu-link-width right-[40px] flex flex-col justify-center outline-none"
        onClick={isMenuOpen ? handleCloseMenu : handleOpenMenu}
      >
        <div
          className={clsx(
            "h-[5%] w-full bg-light-gray-element-color",
            isMenuOpen && isMenuAnimated
              ? "animate-navbarMenuTopAnimation"
              : "animate-navbarMenuTopAnimationReverse mb-[7px]"
          )}
        />
        <div
          className={clsx(
            "h-[5%] w-[80%] bg-light-gray-element-color",
            isMenuOpen && isMenuAnimated
              ? "animate-navbarMenuBottomAnimation"
              : "animate-navbarMenuBottomAnimationReverse w-[80%]"
          )}
        />
      </button>
      <MenuDropdownMobile
        filteredPathsArray={filteredPathsArray}
        isMenuOpen={isMenuOpen}
        isMenuAnimated={isMenuAnimated}
        isLoggedIn={isLoggedIn}
      />
      <MenuDropdown
        filteredPathsArray={filteredPathsArray}
        isMenuOpen={isMenuOpen}
        isLoggedIn={isLoggedIn}
      />
    </nav>
  );
}
