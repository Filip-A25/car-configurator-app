import { Routes, Route } from "react-router-dom";
import { ConfigEdit } from "./ConfigEdit";

export function ConfigureACar() {
  return (
    <Routes>
      <Route path="configuration-edit" element={<ConfigEdit />}></Route>
    </Routes>
  );
}
