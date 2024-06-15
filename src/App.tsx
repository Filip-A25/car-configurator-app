import { Routes, Route } from "react-router-dom";
import Navbar from "./modules/global/components/Navbar";
import Authentication from "./modules/authentification/Authentication";
import Configurator from "./modules/configurator/Configurator";
import { RoutePrivateGuard } from "./modules/global/components/RoutePrivateGuard";
import "swiper/css";

export default function App() {
  return (
    <div
      className={`relative min-h-screen bg-light-gray-background-color overflow-x-hidden`}
    >
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
