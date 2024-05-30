import { RecoilRoot } from "recoil";
import { Routes, Route } from "react-router-dom";
import Authentication from "./authentification/Authentication";
import Navbar from "./global/components/Navbar";

export default function App() {
  return (
    <div className="relative h-screen bg-light-gray-background-color">
      <RecoilRoot>
        <Navbar />
        <Routes>
          <Route path="/auth" element={<Authentication />}></Route>
        </Routes>
      </RecoilRoot>
    </div>
  );
}
