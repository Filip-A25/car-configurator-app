import { Route, Routes } from "react-router-dom";
import { AuthLoginForm, AuthRegisterForm } from "./components";
import { NotFoundPage } from "../../shared/NotFoundPage";

export function Authentication() {
  return (
    <div className="flex justify-center sm:pt-10">
      <Routes>
        <Route path="register" element={<AuthRegisterForm />} />
        <Route path="log-in" element={<AuthLoginForm />} />
        <Route
          path="*"
          element={
            <NotFoundPage
              returnPageTitle="sign in"
              returnPagePath="/auth/log-in"
            />
          }
        />
      </Routes>
    </div>
  );
}
