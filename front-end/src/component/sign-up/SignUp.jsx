import React, { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles.js";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [nameUser, setNameUser] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [roleId, setRoleId] = useState("642995c183b260b43e04b665");
  const [roles, setRoles] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3002/role")
      .then((res) => res.json())
      .then((data) => setRoles(data));
  }, []);

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
          <form className="space-y-6" autoComplete="on">
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
