import React, { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles.js";
import { Link } from "react-router-dom";
import axios from "axios";
import { server } from "../../server.js";
import { RxAvatar } from "react-icons/rx";

const SignUp = () => {
  const [nameUser, setNameUser] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [roleId, setRoleId] = useState("642995c183b260b43e04b665");
  const [roles, setRoles] = useState([]);
  const [visible, setVisible] = useState(false);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3002/role")
      .then((res) => res.json())
      .then((data) => setRoles(data));
  }, []);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setAvatar(file);
  };
  // console.log(avatar);

  const handleSubmit = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    };

    const data = new FormData();
    data.append("name", nameUser);
    data.append("email", email);
    data.append("address", address);
    data.append("avatar", avatar);
    data.append("phone", phoneNumber);
    data.append("password", password);
    data.append("roleId", roleId);

    console.log([...data.entries()]);

    axios
      .post(`${server}/register`, data, config)
      .then((res) => {
        alert(res.message);
        //reset form
        // alert(res.message)
        // setNameUser("");
        // setEmail("");
        // setAddress("");
        // setPassword("");
        // setPhoneNumber("");
        // setRoleId("642995c183b260b43e04b665");
        // setAvatar(null);
        // setVisible(false);
      })
      .catch((err) => console.log(err));
  };

  console.log(roleId);

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Register as a new user
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[52rem]">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 ">
          <form
            className="space-y-6"
            autoComplete="on"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="flex">
              <div className="left w-2/4 pr-3">
                <div>
                  <label
                    htmlFor="nameUser"
                    className="block text-sm font-medium text-gray-700 mt-3"
                  >
                    User Name
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
                    htmlFor="nameUser"
                    className="block text-sm font-medium text-gray-700 mt-3"
                  >
                    Address
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="nameUser"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="nameUser"
                    className="block text-sm font-medium text-gray-700 mt-3"
                  >
                    Phone Number
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="nameUser"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="right w-2/4 pl-3">
                <div>
                  <label
                    htmlFor="nameUser"
                    className="block text-sm font-medium text-gray-700 mt-3"
                  >
                    Email
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="nameUser"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mt-3"
                  >
                    Password
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

                <div>
                  <label
                    htmlFor="nameUser"
                    className="block text-sm font-medium text-gray-700 mt-3"
                  >
                    Role
                  </label>
                  <div className="mt-3 flex pl-14">
                    {roles.map((item) => (
                      <div key={item._id} className="mr-5">
                        <input
                          type="radio"
                          checked={roleId === item._id}
                          onChange={() => {
                            setRoleId(item._id);
                          }}
                          className="mr-2"
                        />
                        {item.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <label
                htmlFor="avatar"
                className="block text-sm font-medium text-gray-700"
              ></label>
              <div className="mt-2 flex items-center">
                <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
                  {avatar ? (
                    <img
                      src={URL.createObjectURL(avatar)}
                      alt="avatar"
                      className="h-full w-full object-cover rounded-full"
                    />
                  ) : (
                    <RxAvatar className="h-8 w-8" />
                  )}
                </span>
                <label
                  htmlFor="file-input"
                  className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 hover:cursor-pointer"
                >
                  <span>Upload a file</span>
                  <input
                    type="file"
                    name="avatar"
                    id="file-input"
                    accept=".jpg,.jpeg,.png"
                    onChange={(e) => handleFileInputChange(e)}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full bg-violet-600 hover:bg-violet-700 py-3 rounded-md text-white font-bold cursor-pointer"
              >
                Register
              </button>
            </div>
            <div className={`${styles.normalFlex}`}>
              <h4>Back to login page?</h4>
              <Link to="/sign-in" className="text-blue-600 pl-2">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
