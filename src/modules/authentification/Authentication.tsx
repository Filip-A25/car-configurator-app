import { Route, Routes, Navigate } from "react-router-dom";
import { AuthLoginForm, AuthRegisterForm } from "./components";

export function Authentication() {
  return (
    <div className="flex justify-center sm:pt-10">
      <Routes>
        <Route path="/" element={<Navigate to="/log-in" />} />
        <Route path="register" element={<AuthRegisterForm />} />
        <Route path="log-in" element={<AuthLoginForm />} />
      </Routes>
    </div>
  );
}
