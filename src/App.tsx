import { RecoilRoot } from "recoil";
import { Routes, Route } from "react-router-dom";
import Authentification from "./authentification/Authentification";
import AuthRegisterForm from "./authentification/components/AuthRegisterForm";

export default function App() {
  return (
    <RecoilRoot>
      <Routes>
        <Route path="/auth" element={<AuthRegisterForm />}></Route>
      </Routes>
    </RecoilRoot>
  );
}
