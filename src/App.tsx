import { Routes, Route } from "react-router-dom";
import Navbar from "./modules/global/components/Navbar";
import Authentication from "./modules/authentification/Authentication";
import { Configurator } from "./modules/configurator";
import { useRecoilState } from "recoil";
import { userState } from "./modules/authentification/state/userState";
import { RoutePrivateGuard } from "./modules/global/components/RoutePrivateGuard";

export default function App() {
  const [isLoggedIn] = useRecoilState(userState);

  return (
    <div className="relative min-h-screen bg-basic-white sm:bg-light-gray-background-color">
      <Navbar />
      <Routes>
        <Route
          path="/auth/*"
          element={
            <RoutePrivateGuard>
              <Authentication />
            </RoutePrivateGuard>
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
