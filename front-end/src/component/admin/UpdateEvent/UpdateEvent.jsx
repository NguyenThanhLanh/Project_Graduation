import React, { useEffect, useState } from "react";
import { MdFitScreen } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllEvent } from "../../../redux/actions/event";
import axios from "axios";
import { server } from "../../../server";
import { toast } from "react-toastify";

const UpdateEvent = () => {
  const { id } = useParams();
  const { eventData } = useSelector((state) => state.eventData);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discount_price, setDiscount_price] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const today = new Date().toISOString().slice(0, 10);
  useEffect(() => {
    window.scrollTo(0, 0);
    const data = eventData.filter((item) => item._id === id);
    setName(data[0].name);
    setDescription(data[0].description);
    setPrice(data[0].price);
    setDiscount_price(data[0].discount_price);
    setStartDate(new Date(data[0].start_Date));
    setEndDate(new Date(data[0].Finish_Date));
  }, []);

  const minEndDate = startDate
    ? new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10)
    : "";
  const handleStartDateChange = (e) => {
    const startDate = new Date(e.target.value);
    setStartDate(startDate);
  };

  const handleEndDateChange = (e) => {
    const endDate = new Date(e.target.value);
    setEndDate(endDate);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      e.preventDefault();
      // const dataUpdate = {
      //   name: name,
      //   description: description,
      //   start_Date: startDate,
      //   Finish_Date: endDate,
      //   price: price,
      //   discount_price: discount_price,
      // };
      const dataUpdate = new FormData();
      dataUpdate.append("name", name);
      dataUpdate.append("description", description);
      dataUpdate.append("start_Date", startDate);
      dataUpdate.append("Finish_Date", endDate);
      dataUpdate.append("price", price);
      dataUpdate.append("discount_price", discount_price);

      await axios.put(`${server}/event/${id}`, dataUpdate, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      dispatch(getAllEvent());
      toast.success("Cập nhập nhà cung cấp thành công!");
    } catch (error) {
      toast.error("Đã xảy ra lỗi");
    }
  };

  return (
    <div className="w-[90%] 800px:w-[70%] bg-white  shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
      <h5 className="text-[30px] font-Poppins text-center">Chỉnh sửa Event</h5>
      <form onSubmit={(e) => handleSubmit(e)}>
        <br />
        <div>
          <label className="pb-2">
            Tiêu đề sự kiện <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={name}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setName(e.target.value)}
            placeholder="Nhập tiêu đề sự kiện..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Mô tả chi tiết <span className="text-red-500">*</span>
          </label>
          <textarea
            cols="30"
            required
            rows="8"
            type="text"
            name="description"
            value={description}
            className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Nhập thông tin mô tả chi tiết..."
          ></textarea>
        </div>
        <br />
        <div>
          <label className="pb-2">
            Ngày bắt đầu <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="dateStart"
            id="start-date"
            value={startDate ? startDate.toISOString().slice(0, 10) : ""}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => handleStartDateChange(e)}
            min={today}
            placeholder="Nhập ngày bắt đầu sự kiện..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Ngày kết thúc <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="price"
            id="end-date"
            value={endDate ? endDate.toISOString().slice(0, 10) : ""}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => handleEndDateChange(e)}
            min={minEndDate}
            placeholder="Nhập ngày kết thúc sự kiện..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Giá <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            value={price}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Nhập giá của sản phẩm (number)..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Giá sau khi giảm <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            value={discount_price}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setDiscount_price(e.target.value)}
            placeholder="Nhập giá bán ra của sản phẩm (number)..."
          />
        </div>
        <br />
        <div>
          <div>
            <input
              type="submit"
              value="Chỉnh sửa Event"
              className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateEvent;
