import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createSuppiler, loadSuppiler } from "../../../redux/actions/suppiler";

const CreateSuppiler = () => {
  // const { user } = useSelector((state) => state.user);
  const { error, success } = useSelector((state) => state.productData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name: name,
      address: address,
      phone: phone,
      email: email,
    };

    // console.log("Create suppiler data", formData);
    dispatch(createSuppiler(formData));

    if (error) {
      toast.error("Don't create supplier ");
    }

    if (success) {
      dispatch(loadSuppiler());
      toast.success("Created new supplier ");
      setName("");
      setAddress("");
      setPhone("");
      setEmail("");
      // navigate("/admin/supplier");
      // navigate("/admin/supplier");
    }
  };

  return (
    <div className="w-[90%] 800px:w-[70%] bg-white  shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
      <h5 className="text-[30px] font-Poppins text-center">
        Thêm mới nhà cung cấp
      </h5>
      <form onSubmit={(e) => handleSubmit(e)}>
        <br />
        <div>
          <label className="pb-2">
            Tên nhà cung cấp <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={name}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setName(e.target.value)}
            placeholder="Nhập tên nhà cung cấp..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Địa chỉ <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="address"
            value={address}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Nhập địa chỉ nhà cung cấp..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Số điện thoại <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="phone"
            value={phone}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Nhập số điện thoại..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={email}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter suppiler email..."
          />
        </div>
        <br />
        <div>
          <input
            type="submit"
            value="Thêm"
            className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateSuppiler;
