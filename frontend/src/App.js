// App.js
import { useEffect, useState } from "react";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./components/home/Home";

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(
    localStorage.getItem("isLogin") === "true" && localStorage.getItem("token")
  );

  const loggedIn =
    localStorage.getItem("isLogin") === "true" && localStorage.getItem("token");

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        if (loggedIn) {
          setLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkLoginStatus();
  }, [loggedIn]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/register"
          element={
            !isLoggedIn ? <Register /> : <Navigate to="/" replace={true} />
          }
        />
        <Route
          path="/login"
          element={
            !isLoggedIn ? (
              <Login
                setLoggedIn={(value) => {
                  setLoggedIn(value);
                }}
              />
            ) : (
              <Navigate to="/" replace={true} />
            )
          }
        />
        <Route
          path="/"
          element={
            isLoggedIn ? <Home /> : <Navigate to="/login" replace={true} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
