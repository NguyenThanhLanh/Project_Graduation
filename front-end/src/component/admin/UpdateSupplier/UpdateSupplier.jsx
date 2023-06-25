import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { server } from "../../../server";
import { loadSuppiler } from "../../../redux/actions/suppiler";
import { toast } from "react-toastify";

const UpdateSupplier = () => {
  const { id } = useParams();
  const { suppilerData } = useSelector((state) => state.suppilerData);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  // const { error, success } = useSelector((state) => state.productData);
  useEffect(() => {
    window.scrollTo(0, 0);
    const data = suppilerData.filter((item) => item._id === id);
    setName(data[0].name);
    setAddress(data[0].address);
    setPhone(data[0].phone);
    setEmail(data[0].email);
  }, []);
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const dataUpdate = {
        name: name,
        address: address,
        phone: phone,
        email: email,
      };

      await axios.put(`${server}/suppiler/${id}`, dataUpdate, {
        withCredentials: true,
      });
      dispatch(loadSuppiler());
      toast.success("Cập nhập nhà cung cấp thành công!");
    } catch (error) {
      toast.error("Đã xảy ra lỗi");
    }
  };
  return (
    <div className="w-[90%] 800px:w-[70%] bg-white  shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
      <h5 className="text-[30px] font-Poppins text-center">
        Cập nhật nhà cung cấp
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
            value="Cập nhật"
            className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </form>
    </div>
  );
};

export default UpdateSupplier;
