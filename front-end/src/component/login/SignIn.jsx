import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles.js";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server.js";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [nameUser, setNameUser] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(
        `${server}/login`,
        {
          username: nameUser,
          password: password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Login Success!");
        navigate("/");
        window.location.reload();
      })
      .catch((err) => toast.error(err.response.data.message));
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Đăng nhập
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 ">
          <form
            className="space-y-6"
            autoComplete="on"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div>
              <label
                htmlFor="nameUser"
                className="block text-sm font-medium text-gray-700"
              >
                Tên tài khoản
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="nameUser"
                  required
                  value={nameUser}
                  onChange={(e) => setNameUser(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Mật khẩu
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {visible ? (
                  <AiOutlineEye
                    className="absolute top-2 right-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(!visible)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute top-2 right-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(!visible)}
                  />
                )}
              </div>
            </div>
            <div className={`${styles.normalFlex} justify-between`}>
              <div className={`${styles.normalFlex}`}>
                <input
                  type="checkbox"
                  name="remember-me"
                  id="remember-me"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Lưu mật khẩu
                </label>
              </div>
              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Quên mật khẩu?
                </Link>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full bg-violet-600 hover:bg-violet-700 py-3 rounded-md text-white font-bold cursor-pointer"
              >
                Đăng nhập
              </button>
            </div>
            <div className={`${styles.normalFlex}`}>
              <h4>Bạn chưa có tài khoản?</h4>
              <Link to="/sign-up" className="text-blue-600 pl-2">
                Đăng ký
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
