import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import AuthLoginForm from "./components/AuthLoginForm";
import AuthRegisterForm from "./components/AuthRegisterForm";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { pathSelector } from "../global/state/navigationState";

export default function Authentication() {
  const navigate = useNavigate();

  const filteredRoutes = useRecoilValue(pathSelector);
  const filteredPaths = filteredRoutes.map((route) => {
    return route.path;
  });
  const { pathname } = useLocation();

  useEffect(() => {
    if (!filteredPaths.includes(pathname)) navigate("/");
  }, []);

  return (
    <div className="flex justify-center sm:pt-10">
      <Routes>
        <Route path="register" element={<AuthRegisterForm />} />
      </Routes>
    </div>
  );
}
