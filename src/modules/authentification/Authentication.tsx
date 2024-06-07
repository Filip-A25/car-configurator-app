import { Route, Routes } from "react-router-dom";
import AuthLoginForm from "./components/AuthLoginForm";
import AuthRegisterForm from "./components/AuthRegisterForm";

export default function Authentication() {
  return (
    <div className="flex justify-center sm:pt-10">
      <Routes>
<<<<<<< HEAD:src/modules/authentification/Authentication.tsx
        <Route path="register" element={<AuthRegisterForm />} />
        <Route path="log-in" element={<AuthLoginForm />} />
=======
        <Route path="register" element={<AuthRegisterForm />}></Route>
        <Route path="log-in" element={<AuthLoginForm />}></Route>
>>>>>>> refs/remotes/origin/feature/login:src/authentification/Authentication.tsx
      </Routes>
    </div>
  );
}
