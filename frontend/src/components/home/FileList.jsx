import React, { useState, useEffect } from "react";
import axios from "../../axios";
import styled from "styled-components";
import { MdDelete } from "react-icons/md";
import { IoMdDownload } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import CodeModal from "./CodeModal";
import ShowCodeModal from "./ShowCodeModal";

const MainContainer = styled.div`
  height: 90vh;
  padding: 0 10px;
  flex: 2;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FileListContainer = styled.div`
  padding: 10px;
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  scrollbar-color: #4caf50;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const FileItem = styled.div`
  margin-bottom: 10px;
  justify-content: space-between;
`;

const Icons = styled.div`
  padding: 10px 10px;
  display: flex;
  border-radius: 15px;
  justify-content: space-between;
  align-items: center;
  background-color: #ebf2f0;
  flex: 1;
`;

const File = styled.img`
  flex: 3;
  height: 300px;
  width: 300px;
`;

const FileList = ({ refresh, setRefresh }) => {
  const [files, setFiles] = useState([]);
  const token = localStorage.getItem("token");
  const [code, setCode] = useState(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [codeSelectedFile, setCodeSelectedFile] = useState(null);

  const openCodeModal = (fileID) => {
    setSelectedFile(fileID);
  };

  const openShowCodeModal = (fileID) => {
    setCodeSelectedFile(fileID);
  };

  const closeCodeModal = () => {
    setSelectedFile(null);
  };

  const closeShowCodeModal = () => {
    setCodeSelectedFile(null);
  };

  const handleDeleteFile = async (id) => {
    try {
      const response = await axios.delete(`/user/file/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      console.log(response.data.data);
      toast.success(response.data.message);
      setRefresh(Math.random() * 999999);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
      if (error.response.status === 403) {
        localStorage.clear();
      }
      console.error(error.response.data);
    }
  };

  useEffect(() => {
    const fetchFiles = async (id) => {
      try {
        const response = await axios.get(`/user/file`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setFiles(response.data.data);
      } catch (error) {
        console.log(error.response.data.message);
        if (error.response.status === 403) {
          localStorage.clear();
        }
      }
    };
    fetchFiles();
  }, [refresh, token]);

  return (
    <MainContainer>
      <h2 style={{ color: "#4caf50" }}>Uploaded List</h2>
      <ToastContainer></ToastContainer>
      <FileListContainer>
        {files.map((file) => (
          <FileItem key={file.id}>
            <File src={file.file}></File>
            <Icons>
              <IoMdDownload
                style={{
                  fontSize: "24px",
                  color: "#0987e3",
                  marginRight: "10px",
                  cursor: "pointer",
                }}
                onClick={() => openCodeModal(file.id)}
              />
              {code && code.id === file.id ? (
                <h4>{code.code}</h4>
              ) : (
                <a
                  href={file.file}
                  onClick={(e) => {
                    e.preventDefault();
                    openShowCodeModal(file.id);
                  }}
                  style={{ cursor: "pointer", color: "blueviolet" }}
                >
                  Show Code
                </a>
              )}

              <MdDelete
                style={{
                  fontSize: "24px",
                  color: "#eb092f",
                  cursor: "pointer",
                }}
                onClick={() => handleDeleteFile(file.id)}
              />
            </Icons>
          </FileItem>
        ))}
      </FileListContainer>
      {selectedFile && (
        <CodeModal
          fileID={selectedFile}
          closeModal={closeCodeModal}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      )}
      {codeSelectedFile && (
        <ShowCodeModal
          fileID={codeSelectedFile}
          closeModal={closeShowCodeModal}
          setCode={setCode}
        />
      )}
    </MainContainer>
  );
};

export default FileList;
