// Register.js
import React, { useState } from "react";
import axios from "../../axios";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const response = await axios.post("/auth/register", {
        username,
        password,
      });
      console.log(response.data);
      toast.success("Registration successful!");
    } catch (error) {
      console.error(error.response.data);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <MainContainer>
      <ToastContainer />
      <AuthContainer>
        <h2>Register</h2>
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
        <AuthButton onClick={handleRegister}>Register</AuthButton>
      </AuthContainer>
    </MainContainer>
  );
};

export default Register;
