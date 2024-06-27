import { Routes, Route } from "react-router-dom";
import { ConfigureACar } from "./components";
import Configurations from "./components/saved-configurations/Configurations";

export function Configurator() {
  return (
    //70px u calc-u je height Navbar-a.
    <div id="configurator-content" className="h-[calc(100vh-70px)]">
      <Routes>
        <Route path="/configure-a-car/*" element={<ConfigureACar />} />
        <Route path="/configurations" element={<Configurations />} />
      </Routes>
    </div>
  );
}
