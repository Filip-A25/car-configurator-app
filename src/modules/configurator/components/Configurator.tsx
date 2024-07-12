import { Routes, Route, Navigate } from "react-router-dom";
import { ConfigureACar } from "./ConfigureACar";
import { Configurations } from "./Configurations";
import { configuratorRoutes } from "../const";

export function Configurator() {
  return (
    <div id="configurator-content" className="h-[calc(100vh-70px)]">
      <Routes>
        <Route
          path="/"
          element={<Navigate to={configuratorRoutes.configurations} />}
        />
        <Route path="/configure-a-car/*" element={<ConfigureACar />} />
        <Route path="/configurations/*" element={<Configurations />} />
      </Routes>
    </div>
  );
}
