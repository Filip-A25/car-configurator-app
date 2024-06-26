import { Routes, Route } from "react-router-dom";
import Navbar from "./modules/global/components/Navbar";
import { Authentication } from "./modules/authentification";
import { Configurator } from "./modules/configurator";
import {
  RoutePrivateGuard,
  RoutePublicGuard,
} from "./modules/global/components/";
import "swiper/css";

export default function App() {
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
