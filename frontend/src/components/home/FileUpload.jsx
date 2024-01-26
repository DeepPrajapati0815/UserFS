import React, { useState } from "react";
import axios from "../../axios";
import styled from "styled-components";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainContainer = styled.div`
  flex: 1;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FileContainer = styled.div`
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

const FileInput = styled.input`
  width: 100%;
  margin-bottom: 15px;
  padding: 10px;
  font-size: 16px;
`;

const FileButton = styled.button`
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

const FileUpload = ({ setRefresh }) => {
  const [file, setFile] = useState(null);

  const token = localStorage.getItem("token");

  const handleFileUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post("/user/file", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      });

      setRefresh(Math.random() * 999999);

      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
      if (error.response.status === 403) {
        localStorage.clear();
      }
    }
  };

  return (
    <MainContainer>
      <ToastContainer />
      <FileContainer>
        <h2>File Upload</h2>
        <FileInput type="file" onChange={(e) => setFile(e.target.files[0])} />
        <FileButton onClick={handleFileUpload}>Upload File</FileButton>
      </FileContainer>
    </MainContainer>
  );
};

export default FileUpload;
