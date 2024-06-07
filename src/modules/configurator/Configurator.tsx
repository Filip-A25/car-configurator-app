import { Routes, Route } from "react-router-dom";
import Configurations from "./components/saved-configurations/Configurations";

export default function Configurator() {
  return (
    <div id="configurator-content">
      <Routes>
        <Route path="/configurations" element={<Configurations />} />
      </Routes>
    </div>
  );
}
