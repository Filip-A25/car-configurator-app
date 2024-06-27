import { Routes, Route } from "react-router-dom";
import { ConfigEdit } from "./ConfigEdit";
import { CarSelect } from "../configure-a-car";

export function ConfigureACar() {
  return (
    <Routes>
      <Route path="configuration-edit/:id" element={<ConfigEdit />} />
      <Route path="car-select" element={<CarSelect />} />
    </Routes>
  );
}
