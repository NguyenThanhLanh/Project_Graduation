import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { backend_url, server } from "../../server";
import { AiOutlineArrowRight, AiOutlineCamera } from "react-icons/ai";
import { DataGrid } from "@material-ui/data-grid";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { loadUser, updateInfoUser } from "../../redux/actions/user";
import { toast } from "react-toastify";
import axios from "axios";
import { loadAllOrderUser } from "../../redux/actions/order";

const ProfileContent = ({ active }) => {
  const { user, error, successMessage } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [address, setAddress] = useState(user && user.address);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phone);
  const [avatar, setAvatar] = useState(user && user.avatar);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("address", address);
    formData.append("phone", phoneNumber);

    dispatch(updateInfoUser(user._id, formData));
    window.location.reload();
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    setAvatar(file);

    const formData = new FormData();

    formData.append("image", e.target.files[0]);

    await axios
      .put(`${server}/user/update-image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((response) => {
        dispatch(loadUser());
        toast.success("avatar updated successfully!");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <div className="w-full">
      {/* Profile */}
      {active === 1 && (
        <>
          <div className="flex justify-center w-full">
            <div className="relative">
              <img
                src={`${backend_url}/${user?.avatar}`}
                className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
                alt=""
              />
              <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                <input
                  type="file"
                  id="image"
                  className="hidden"
                  onChange={handleImage}
                />
                <label htmlFor="image">
                  <AiOutlineCamera />
                </label>
              </div>
            </div>
          </div>

          <br />
          <br />
          <div className="w-full px-5">
            <form onSubmit={(e) => handleSubmit(e)} required>
              <div className="w-full 800px:flex block pb-3">
                <div className="w-[100%] 800px:w-[50%]">
                  <label className="block pb-2 font-bold">Full Name</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="w-[100%] 800px:w-[50%]">
                  <label className="block pb-2 font-bold">Email</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full 800px:flex block pb-3">
                <div className="w-[100%] 800px:w-[50%]">
                  <label className="block pb-2 font-bold">Address</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                <div className="w-[100%] 800px:w-[50%]">
                  <label className="block pb-2 font-bold">Phone number</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
              </div>
              {/* Button submit */}
              <div className="flex justify-center">
                <input
                  className={`w-[250px] h-[40px] text-center bg-violet-500 text-white hover:bg-violet-600 font-bold rounded-[3px] mt-8 cursor-pointer `}
                  required
                  value="Update"
                  type="submit"
                />
              </div>
            </form>
          </div>
        </>
      )}

      {active === 2 && (
        <div>
          <AllOrders />
        </div>
      )}
    </div>
  );
};

const AllOrders = () => {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const { orderData } = useSelector((state) => state.orderData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadAllOrderUser(user._id));
  }, []);
  const orders = orderData ? [...orderData] : [];
  console.log("Tất cả order: ", orders);
  const columns = [
    {
      field: "no",
      headerName: "No.",
      headerAlign: "center",
      width: 70,
      disableColumnMenu: true,
      sortable: false,
      align: "center",
      renderCell: (params) => params.row.no + 1,
    },

    {
      field: "status",
      headerName: "Trạng thái đơn",
      minWidth: 150,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Đang xử lý"
          ? "greenColor"
          : "redColor";
      },
      align: "center",
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: "itemsQty",
      headerName: "Số lượng sản phẩm",
      headerAlign: "center",
      width: 200,
      disableColumnMenu: true,
      sortable: true,
      align: "center",
    },

    {
      field: "total",
      headerName: "Tổng tiền",
      headerAlign: "center",
      width: 150,
      disableColumnMenu: true,
      sortable: false,
      align: "right",
    },
    {
      field: "address",
      headerName: "Địa chỉ nhận hàng",
      headerAlign: "center",
      width: 350,
      disableColumnMenu: true,
      sortable: false,
      align: "left",
    },
    // {
    //   field: " ",
    //   minWidth: 40,
    //   headerName: "",
    //   type: "number",
    //   sortable: false,
    //   renderCell: (params) => {
    //     return (
    //       <>
    //         <Link to={`/user/order/${params.id}`}>
    //           <button>
    //             <AiOutlineArrowRight size={20} />
    //           </button>
    //         </Link>
    //       </>
    //     );
    //   },
    // },
  ];

  const row = [];
  orders.length > 0 &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        no: item.no,
        address: `${item.shippingAddress.address}, ${item.shippingAddress.city}, ${item.shippingAddress.country}`,
        itemsQty: item.cart.length,
        total: "US$ " + item.amountPayment,
        status: item.paymentInfo.status,
      });
    });
  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row.map((row, index) => ({ ...row, no: index }))}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

export default ProfileContent;
