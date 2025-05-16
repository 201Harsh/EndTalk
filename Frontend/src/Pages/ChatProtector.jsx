import React, { Children, use, useEffect, useState } from "react";
import AxiosInstance from "../Config/Axios";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";

const ChatProtector = ({ children }) => {
  const Navigate = useNavigate();

  const [IsLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const checkuser = async () => {
      try {
        if (!token) {
          Navigate("/login");
          return;
        }

        const res = await AxiosInstance.get("/users/getuser", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 200) {
          setIsLoading(true);
          setTimeout(() => {
            setIsLoading(false);
          }, 3000);
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("name");
          Navigate("/");
        }
      } catch (error) {
        localStorage.clear();
        Navigate("/");
      }
    };

    checkuser();
  }, [Navigate, token]);

  if (IsLoading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  return <div>{children}</div>;
};

export default ChatProtector;
