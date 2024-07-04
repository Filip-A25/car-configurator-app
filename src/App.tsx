import { Routes, Route } from "react-router-dom";
import Navbar from "./modules/global/components/Navbar";
import { Authentication } from "./modules/authentification";
import { Configurator } from "./modules/configurator/components";
import {
  RoutePrivateGuard,
  RoutePublicGuard,
} from "./modules/global/components/";
import { ToastContainer } from "react-toastify";
import "swiper/css";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <div className="relative bg-light-gray-background-color overflow-x-hidden min-h-screen">
      <ToastContainer />
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
