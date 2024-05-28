import { RecoilRoot } from "recoil";
import { Routes, Route } from "react-router-dom";
import Authentification from "./authentification/Authentification";

export default function App() {
  return (
    <RecoilRoot>
      <Routes>
        <Route path="/auth" element={<Authentification />}></Route>
      </Routes>
    </RecoilRoot>
  );
}
