// Login.js
import React, { useState } from "react";
import axios from "../../axios";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const MainContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AuthContainer = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const AuthInput = styled.input`
  width: 100%;
  margin-bottom: 15px;
  padding: 10px;
  font-size: 16px;
`;

const AuthButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #4caf50;
  color: #fff;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const Login = ({ setLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      console.log("Called login");
      const response = await axios.post("/auth/login", { username, password });

      setLoggedIn(true);

      localStorage.setItem("isLogin", true);
      localStorage.setItem("userId", response.data.data.id);
      localStorage.setItem("token", response.data.data.token);

      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      setLoggedIn(false);
      console.error(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  return (
    <MainContainer>
      <ToastContainer />
      <AuthContainer>
        <h2>Login</h2>
        <AuthInput
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <AuthInput
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <AuthButton onClick={handleLogin}>Login</AuthButton>
      </AuthContainer>
    </MainContainer>
  );
};

export default Login;
