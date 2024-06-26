import { Routes, Route } from "react-router-dom";
import { CarSelect } from "./";

export function ConfigureACar() {
  return (
    <Routes>
      {/*There will be more routes here.*/}
      <Route path="car-select" element={<CarSelect />} />
    </Routes>
  );
}
