import { Route, Routes } from "react-router-dom";
import AuthLoginForm from "./components/AuthLoginForm";
import AuthRegisterForm from "./components/AuthRegisterForm";

export default function Authentication() {
  return (
    <Routes>
      <Route path="/auth/register" element={<AuthRegisterForm />} />
      <Route path="/auth/login" element={<AuthLoginForm />} />
    </Routes>
  );
}
