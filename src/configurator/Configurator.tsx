import { Routes, Route } from "react-router-dom";
import HomeView from "./components/HomeView";

export default function Configurator() {
  return (
    <div id="configurator-content">
      <Routes>
        <Route path="/" element={<HomeView />} />
      </Routes>
    </div>
  );
}
