import { Routes, Route } from "react-router-dom";
import { ConfigureACar } from "./components";

export function Configurator() {
  return (
    <Routes>
      <Route path="configure-a-car/*" element={<ConfigureACar />}></Route>
    </Routes>
  );
}
