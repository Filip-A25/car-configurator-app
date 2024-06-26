import { Routes, Route } from "react-router-dom";
import Navbar from "./modules/global/components/Navbar";
import Authentication from "./modules/authentification/Authentication";
import { Configurator } from "./modules/configurator";
import { useRecoilState } from "recoil";
import { userState } from "./modules/authentification/state/userState";
import {
  RoutePrivateGuard,
  RoutePublicGuard,
} from "./modules/global/components/";
import "swiper/css";

export default function App() {
  const [isLoggedIn] = useRecoilState(userState);

  return (
    <div className="relative bg-light-gray-background-color overflow-x-hidden min-h-screen">
      <Navbar />
      <Routes>
        <Route
          path="/auth/*"
          element={
            <RoutePublicGuard>
              <Authentication />
            </RoutePublicGuard>
          }
        />
        <Route
          path="/home/*"
          element={
            <RoutePrivateGuard>
              <Configurator />
            </RoutePrivateGuard>
          }
        />
      </Routes>
    </div>
  );
}
