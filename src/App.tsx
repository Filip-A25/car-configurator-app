import { RecoilRoot } from "recoil";
import { Routes, Route } from "react-router-dom";
import Authentication from "./authentification/Authentication";
import AuthRegisterForm from "./authentification/components/AuthRegisterForm";
import Navbar from "./global/components/Navbar";

export default function App() {
  return (
    <div className="relative">
      <RecoilRoot>
        <Navbar />
        <Routes>
          <Route path="/auth" element={<AuthRegisterForm />}></Route>
        </Routes>
      </RecoilRoot>
    </div>
  );
}
