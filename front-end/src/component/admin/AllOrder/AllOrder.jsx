import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { AiOutlineDelete } from "react-icons/ai";
import { DataGrid } from "@material-ui/data-grid";
import Loader from "../../layout/Loader";
import { utils, writeFile } from "xlsx";
import {
  deleteAllOrderAdmin,
  loadAllOrderAdmin,
} from "../../../redux/actions/order";
import styles from "../../../styles/styles";
import { statusOptions } from "./Options";
import { StatusCell } from "./Options";

const AllOrder = () => {
  const { orderAdminData, isLoading } = useSelector((state) => state.orderData);
  const dispatch = useDispatch();
  const allOrder = orderAdminData ? [...orderAdminData] : [];
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };
  const exportToExcel = (allOrder) => {
    const data = [
      [
        "Order ID",
        "Tên user",
        "Trạng thái đơn",
        "Số lượng sản phẩm",
        "Tổng tiền",
        "Địa chỉ nhận hàng",
      ],
    ];

    allOrder.forEach((item) =>
      data.push([
        item._id,
        item.user.name,
        item.paymentInfo.status,
        item.cart.length,
        item.amountPayment,
        item.shippingAddress.address,
      ])
    );

    console.log(data);
    const workbook = utils.book_new();
    const worksheet = utils.aoa_to_sheet(data);
    utils.book_append_sheet(workbook, worksheet, "Sheet1");

    writeFile(workbook, "order.xlsx");
  };

  useEffect(() => {
    dispatch(loadAllOrderAdmin());
  }, []);

  const handleDelete = (idPrd) => {
    dispatch(deleteAllOrderAdmin(idPrd));
    window.location.reload();
    console.log(idPrd);
  };

  console.log("Tai tat ca order: ", allOrder);
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
      field: "userName",
      headerName: "Tên user",
      headerAlign: "center",
      width: 120,
      disableColumnMenu: true,
      sortable: false,
      align: "left",
    },
    {
      field: "status",
      headerName: "Trạng thái đơn",
      minWidth: 150,
      renderCell: (params) => (
        <StatusCell
          value={params.getValue(params.id, "status")}
          id={params.getValue(params.id, "id")}
        />
      ),
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
    {
      field: "",
      width: 150,
      headerName: "Chức năng",
      headerAlign: "center",
      type: "number",
      align: "center",
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <div className="">
              <span>
                <Button onClick={() => handleDelete(params.id)}>
                  <AiOutlineDelete size={20} />
                </Button>
              </span>
            </div>
          </>
        );
      },
    },
  ];

  const row = [];
  allOrder.length > 0 &&
    allOrder.forEach((item) => {
      row.push({
        id: item._id,
        no: item.no,
        userName: item.user.name,
        address: `${item.shippingAddress.address}, ${item.shippingAddress.city}, ${item.shippingAddress.country}`,
        itemsQty: item.cart.length,
        total: "US$ " + item.amountPayment,
        status: item.paymentInfo.status,
      });
    });
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full">
          <div className="w-full mx-8 pt-1 mt-5">
            <div
              className={`${styles.button} mt-2`}
              onClick={() => exportToExcel(allOrder)}
            >
              <span className="text-[#fff] font-[Poppins] text-[18px]">
                Xuất file excel
              </span>
            </div>
          </div>
          <div className="w-full mx-8 pt-1 mt-4 bg-white">
            <DataGrid
              rows={row.map((row, index) => ({ ...row, no: index }))}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              autoHeight
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AllOrder;
