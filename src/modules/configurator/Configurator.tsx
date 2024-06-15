import { Routes, Route } from "react-router-dom";
import ConfigureACar from "./configure-a-car/ConfigureACar";
import Configurations from "./components/saved-configurations/Configurations";

export default function Configurator() {
  return (
    <div id="configurator-content">
      <Routes>
        <Route path="/configure-a-car/*" element={<ConfigureACar />} />
        <Route path="/configurations" element={<Configurations />} />
      </Routes>
    </div>
  );
}
