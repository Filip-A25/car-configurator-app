import { Routes, Route } from "react-router-dom";
import CarSelect from "./CarSelect";

export default function ConfigureACar() {
  return (
    <Routes>
      <Route path="car-select" element={<CarSelect />} />
    </Routes>
  );
}
