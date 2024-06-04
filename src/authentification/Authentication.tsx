import { Route, Routes } from "react-router-dom";
import AuthLoginForm from "./components/AuthLoginForm";
import AuthRegisterForm from "./components/AuthRegisterForm";

export default function Authentication() {
  return (
    <div className="flex justify-center sm:pt-10">
      <Routes>
        <Route path="register" element={<AuthRegisterForm />} />
      </Routes>
    </div>
  );
}
