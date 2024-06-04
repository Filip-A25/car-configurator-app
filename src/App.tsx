import { RecoilRoot } from "recoil";
import { Routes, Route } from "react-router-dom";
import Navbar from "./global/components/Navbar";
import AuthRegisterForm from "./authentification/components/AuthRegisterForm";
import AuthLoginForm from "./authentification/components/AuthLoginForm";
import Authentication from "./authentification/Authentication";

export default function App() {
  return (
    <div className="relative min-h-screen bg-basic-white sm:bg-light-gray-background-color">
      <RecoilRoot>
        <Navbar />
        <Routes>
          <Route path="/auth/*" element={<Authentication />}></Route>
        </Routes>
      </RecoilRoot>
    </div>
  );
}
