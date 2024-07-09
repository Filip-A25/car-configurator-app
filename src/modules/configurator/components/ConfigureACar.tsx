import { Routes, Route } from "react-router-dom";
import { ConfigDisplay } from "./ConfigDisplay";
import { CarSelect } from "./CarSelect";
import { configuratorRoutes } from "./const";

export function ConfigureACar() {
  return (
    <Routes>
      <Route
        path={configuratorRoutes.configurationEditQueryShort}
        element={<ConfigDisplay />}
      />
      <Route path="/car-select" element={<CarSelect />} />
    </Routes>
  );
}
