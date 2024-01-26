import React, { useState } from "react";
import FileUpload from "./FileUpload";
import FileList from "./FileList";
import styled from "styled-components";
import axios from "../../axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Navbar = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 8px;
  background-color: #4caf50;
  color: #fff;
`;

const LogoutButton = styled.button`
  background: none;
  font-size: 15px;
  border: none;
  color: #fff;
  cursor: pointer;
  padding-right: 10px;

  &:hover {
    text-decoration: underline;
  }
`;

const MainContainer = styled.div`
  height: 90vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Home = () => {
  const [refresh, setRefresh] = useState(0);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(`/auth/logout`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (response.data.data.status) {
        localStorage.clear();
      }

      navigate("/login");
      window.location.reload();

      toast.success("Logged out successfully");
    } catch (error) {
      console.error(error.response.data.message);
      console.log(error.response.data.message);
      if (error.response.status === 403) {
        localStorage.clear();
      }
    }
  };

  return (
    <>
      <ToastContainer></ToastContainer>
      <Navbar>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </Navbar>
      <MainContainer>
        <FileUpload setRefresh={setRefresh}></FileUpload>
        <FileList refresh={refresh} setRefresh={setRefresh}></FileList>
      </MainContainer>
    </>
  );
};

export default Home;
