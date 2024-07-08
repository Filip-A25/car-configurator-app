import { Routes, Route } from "react-router-dom";
import { UserConfigurations } from "./UserConfigurations";
import { ConfigurationView } from "./ConfigurationView";

export function Configurations() {
  return (
    <Routes>
      <Route path="/" element={<UserConfigurations />} />
      <Route path="view" element={<ConfigurationView />} />
    </Routes>
  );
}
