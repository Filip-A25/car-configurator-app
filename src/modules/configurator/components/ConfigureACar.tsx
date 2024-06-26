import { Routes, Route } from "react-router-dom";
import { ConfigEdit } from "./ConfigEdit";

export function ConfigureACar() {
  return (
    <Routes>
      <Route path="configuration-edit/:id" element={<ConfigEdit />} />
    </Routes>
  );
}
