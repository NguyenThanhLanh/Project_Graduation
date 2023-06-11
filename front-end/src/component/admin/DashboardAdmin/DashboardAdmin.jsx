import { Button } from "@material-ui/core";
import React, { useEffect } from "react";
import { AiOutlineMoneyCollect } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import { MdBorderClear } from "react-icons/md";
import { DataGrid } from "@material-ui/data-grid";

const DashboardAdmin = () => {
  const { orderAdminData } = useSelector((state) => state.orderData);
  const { productData } = useSelector((state) => state.productData);
  useEffect(() => {
    console.log("ngungu", orderAdminData);
  }, []);
  const columns = [
    { field: "id", headerName: "Mã đơn hàng", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Trạng thái",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Đang xử lý"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "type",
      headerName: "Hình thức thanh toán",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "itemsQty",
      headerName: "Số lượng sản phẩm",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Thành tiền",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
  ];

  const row = [];
  orderAdminData &&
    [...orderAdminData].forEach((item) => {
      row.push({
        id: item._id,
        type: item.paymentInfo.type,
        itemsQty: item.cart.reduce((acc, item) => acc + item.qty, 0),
        total: "$ " + item.amountPayment,
        status: item.paymentInfo.status,
      });
    });
  return (
    <div className="w-full p-8">
      <h3 className="text-[22px] font-Poppins pb-2">Trang chủ Admin</h3>
      <div className="w-full block 800px:flex items-center justify-between">
        <div className="w-full mb-4 800px:w-[30%] 800px:h-[152px] 800px:flex 800px:flex-col 800px:justify-between min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <AiOutlineMoneyCollect
              size={30}
              className="mr-2"
              fill="#00000085"
            />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              Tổng số tiền đơn hàng
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            {(
              orderAdminData &&
              [...orderAdminData].reduce(
                (acc, crr) => acc + crr.amountPayment,
                0
              )
            ).toFixed(2)}
          </h5>
          <Link to="/admin/dashboard">
            <h5 className="pt-4 pl-[2] text-[#077f9c]">Phân tích doanh thu</h5>
          </Link>
        </div>

        <div className="w-full mb-4 800px:w-[30%] 800px:h-[152px] 800px:flex 800px:flex-col 800px:justify-between min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <MdBorderClear size={30} className="mr-2" fill="#00000085" />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              Tất cả hóa đơn
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            {orderAdminData && orderAdminData.length}
          </h5>
          <Link to="/admin/orders">
            <h5 className="pt-4 pl-2 text-[#077f9c]">Xem tất cả hóa đơn</h5>
          </Link>
        </div>

        <div className="w-full mb-4 800px:w-[30%] 800px:h-[152px] 800px:flex 800px:flex-col 800px:justify-between min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <AiOutlineMoneyCollect
              size={30}
              className="mr-2"
              fill="#00000085"
            />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              <b>Tổng số sản phẩm</b>
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            {productData && productData.length}
          </h5>
          <Link to="/admin/products">
            <h5 className="pt-4 pl-2 text-[#077f9c]">Xem danh sách</h5>
          </Link>
        </div>
      </div>
      <br />
      <h3 className="text-[22px] font-Poppins pb-2">Hóa đơn gần đây</h3>
      <div className="w-full min-h-[45vh] bg-white rounded">
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={3}
          disableSelectionOnClick
          autoHeight
        />
      </div>
    </div>
  );
};

export default DashboardAdmin;
