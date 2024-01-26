import React, { useState } from "react";
import styled from "styled-components";
import { MdClose } from "react-icons/md";
import axios from "../../axios";
import { toast } from "react-toastify";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: #fff;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const CloseButton = styled(MdClose)`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const Input = styled.input`
  width: 80%;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 20px;
`;

const Button = styled.button`
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

const CodeModal = ({ fileID, closeModal, refresh, setRefresh }) => {
  const [code, setCode] = useState("");

  const token = localStorage.getItem("token");

  const handleDownload = async () => {
    try {
      const response = await axios.post(
        `/user/file/download/${fileID}`,
        { code },
        {
          responseType: "blob",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });

      const link = document.createElement("a");

      link.href = window.URL.createObjectURL(blob);

      link.download = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      toast.success("File downloaded successfully!");
      closeModal();
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
      if (error.response.status === 403) {
        localStorage.clear();
      }
      closeModal();
    }
  };

  return (
    <Overlay>
      <ModalContainer>
        <CloseButton onClick={closeModal} />
        <h2>Enter the Code to Download</h2>
        <Input
          type="text"
          placeholder="Enter code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <Button onClick={handleDownload}>Download</Button>
      </ModalContainer>
    </Overlay>
  );
};

export default CodeModal;
