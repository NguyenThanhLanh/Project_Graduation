import axios from "axios";
import { useState } from "react";
import { server } from "../../../server";
import { useDispatch } from "react-redux";
import { loadAllOrderAdmin } from "../../../redux/actions/order";

export const statusOptions = [
  { label: "Đang xử lý", value: "Đang xử lý" },
  { label: "Hoàn thành", value: "Hoàn thành" },
  { label: "Đã hủy", value: "Đã hủy" },
];

export const StatusCell = ({ value, id }) => {
  const dispatch = useDispatch();
  const [selectedStatus, setSelectedStatus] = useState(value);

  const handleStatusChange = async (event) => {
    setSelectedStatus(event.target.value);
    const dataUpdate = {
      status: event.target.value,
    };
    await axios.put(`${server}/order/${id}`, dataUpdate, {
      withCredentials: true,
    });
    console.log("Cấp nhật trạng thái: ", dataUpdate, id);
    dispatch(loadAllOrderAdmin());
  };

  return (
    <select
      value={selectedStatus}
      onChange={handleStatusChange}
      className={selectedStatus === "Đang xử lý" ? "greenColor" : "redColor"}
    >
      {statusOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
