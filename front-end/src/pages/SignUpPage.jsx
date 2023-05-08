import React, { useEffect } from "react";
import SignUp from "../component/sign-up/SignUp.jsx";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SignUpPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <SignUp />
    </>
  );
};

export default SignUpPage;
