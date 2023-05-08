import React, { useEffect } from "react";
import SignIn from "../component/login/SignIn.jsx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <SignIn />
    </div>
  );
};

export default SignInPage;
