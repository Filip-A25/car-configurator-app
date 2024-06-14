import { Routes, Route } from "react-router-dom";
import ConfigureACar from "./configure-a-car/ConfigureACar";

export default function Configurator() {
  return (
    <div id="configurator-content">
      <Routes>
        {/*There will be more routes here.*/}
        <Route path="/configure-a-car/*" element={<ConfigureACar />} />
      </Routes>
    </div>
  );
}
