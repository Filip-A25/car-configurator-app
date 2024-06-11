import { Routes, Route } from "react-router-dom";
import Navbar from "./modules/global/components/Navbar";
import Authentication from "./modules/authentification/Authentication";
import { RoutePrivateGuard } from "./modules/global/components/RoutePrivateGuard";

export default function App() {
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
      </Routes>
    </div>
  );
}
