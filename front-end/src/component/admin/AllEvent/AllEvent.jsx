import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { DataGrid } from "@material-ui/data-grid";
import Loader from "../../layout/Loader";
import { deleteEvent, getAllEvent } from "../../../redux/actions/event";

const AllEvent = () => {
  const { eventData, isLoading } = useSelector((state) => state.eventData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllEvent());
  }, []);

  const handleDelete = (idPrd) => {
    dispatch(deleteEvent(idPrd));
    window.location.reload();
    console.log(idPrd);
  };

  console.log(eventData);
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
    { field: "name", headerAlign: "center", headerName: "Name", minWidth: 350 },
    {
      field: "start_Date",
      disableColumnMenu: true,
      headerName: "Start Date",
      minWidth: 150,
    },
    {
      field: "Finish_Date",
      disableColumnMenu: true,
      headerName: "Finish Date",
      minWidth: 150,
    },
    {
      field: "price",
      headerAlign: "center",
      headerName: "Price",
      minWidth: 120,
      align: "center",
      disableColumnMenu: true,
    },
    {
      field: "discount_price",
      headerName: "Discount Price",
      headerAlign: "center",
      minWidth: 160,
      disableColumnMenu: true,
      align: "center",
    },
    {
      field: "",
      width: 150,
      headerName: "Function",
      headerAlign: "center",
      type: "number",
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <div className="">
              <span>
                <Link to={`http://localhost:3000/events`}>
                  <Button>
                    <AiOutlineEye size={20} />
                  </Button>
                </Link>
              </span>

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

  eventData &&
    [...eventData].forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        start_Date: item.start_Date.slice(0, 10),
        Finish_Date: item.Finish_Date.slice(0, 10),
        price: item.price,
        discount_price: item.discount_price,
      });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <DataGrid
            rows={row.map((row, index) => ({ ...row, no: index }))}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      )}
    </>
  );
};

export default AllEvent;
