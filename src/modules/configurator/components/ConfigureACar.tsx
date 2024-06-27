import { Routes, Route } from "react-router-dom";
import { CarSelect } from "../configure-a-car";

export function ConfigureACar() {
  return (
    <Routes>
      <Route path="car-select" element={<CarSelect />} />
    </Routes>
  );
}
