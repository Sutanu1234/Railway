import LoginPage from "./components/auth/login/login";
import SignUpPage from "./components/auth/signup/signup";
import SideBar from "./Sidebar"
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from 'sonner';
// import ProtectedRoute from "./utils/ProtectedRoute.js";
// import { useEffect, useState } from "react";

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   const loginStatus = localStorage.getItem("isLoggedIn") === "true";
  //   setIsLoggedIn(loginStatus);
    
  //   // Optional: Listen to localStorage changes across tabs/windows
  //   const handleStorage = () => {
  //     setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
  //   };
  //   window.addEventListener("storage", handleStorage);
  //   return () => window.removeEventListener("storage", handleStorage);
  // }, []);

  return (
    <>
    <Toaster richColors position="top-center" />
      <Routes>
        {/* unotherized */}
          {/* { !isLoggedIn && (
            <>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
            </>
          )}
          <Route element={<ProtectedRoute />} >
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/signup" element={<Navigate to="/" />} />
            <Route path="/*" element={<SideBar />} />
          </Route> */}

          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/*" element={<SideBar />} />
      </Routes>
    </>
  )
}

export default App
