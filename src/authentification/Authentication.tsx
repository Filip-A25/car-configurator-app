import { Route, Routes } from "react-router-dom";
import AuthLoginForm from "./components/AuthLoginForm";
import AuthRegisterForm from "./components/AuthRegisterForm";

export default function Authentication() {
  return (
    <div className="h-[calc(100%-70px)] flex justify-center sm:pt-14">
      <Routes>
        <Route path="register" element={<AuthRegisterForm />}></Route>
        <Route path="log-in" element={<AuthLoginForm />}></Route>
      </Routes>
    </div>
  );
}
