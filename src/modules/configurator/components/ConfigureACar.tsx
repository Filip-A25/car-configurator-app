import { Routes, Route } from "react-router-dom";
import { ConfigDisplay } from "./ConfigDisplay";
import { CarSelect } from "./CarSelect";

export function ConfigureACar() {
  return (
    <Routes>
      <Route path="configuration-edit/:id" element={<ConfigDisplay />} />
      <Route path="car-select" element={<CarSelect />} />
    </Routes>
  );
}
