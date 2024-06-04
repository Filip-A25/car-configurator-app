import { Routes, Route } from "react-router-dom";
import Navbar from "./global/components/Navbar";
import Authentication from "./authentification/Authentication";
import { useRecoilState } from "recoil";
import { userState } from "./authentification/state/userState";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(userState);

  return (
    <div className="relative min-h-screen bg-basic-white sm:bg-light-gray-background-color">
      <Navbar />
      <Routes>
        {!isLoggedIn ? (
          <Route path="/auth/*" element={<Authentication />} />
        ) : null}
      </Routes>
    </div>
  );
}
