import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { DataGrid } from "@material-ui/data-grid";
import Loader from "../../layout/Loader";
import { deleteEvent, getAllEvent } from "../../../redux/actions/event";
import { RiEdit2Fill, RiSearchLine } from "react-icons/ri";

const AllEvent = () => {
  const { eventData, isLoading } = useSelector((state) => state.eventData);
  const dispatch = useDispatch();
  const [searchData, setSearchData] = useState("");
  const firstRow = [];
  eventData &&
    [...eventData].forEach((item) => {
      firstRow.push({
        id: item._id,
        name: item.name,
        start_Date: item.start_Date.slice(0, 10),
        Finish_Date: item.Finish_Date.slice(0, 10),
        price: item.price,
        discount_price: item.discount_price,
      });
    });
  const [row, setRow] = useState(firstRow);
  const searchEvent = () => {
    if (searchData === "") setRow(firstRow);
    else {
      const rowSearch = firstRow.filter((item) =>
        item.name.toLowerCase().includes(searchData.toLowerCase())
      );
      setRow(rowSearch);
    }
  };

  useEffect(() => {
    dispatch(getAllEvent());
  }, [dispatch]);

  const handleDelete = (idPrd) => {
    dispatch(deleteEvent(idPrd));
    dispatch(getAllEvent());
  };

  // console.log(eventData);
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
      field: "name",
      headerAlign: "center",
      headerName: "Tên sản phẩm",
      minWidth: 350,
    },
    {
      field: "start_Date",
      disableColumnMenu: true,
      headerName: "Ngày bắt đầu",
      minWidth: 150,
    },
    {
      field: "Finish_Date",
      disableColumnMenu: true,
      headerName: "Ngày kết thúc",
      minWidth: 150,
    },
    {
      field: "price",
      headerAlign: "center",
      headerName: "Giá",
      minWidth: 120,
      align: "center",
      disableColumnMenu: true,
    },
    {
      field: "discount_price",
      headerName: "Giá sau khi giảm",
      headerAlign: "center",
      minWidth: 170,
      disableColumnMenu: true,
      align: "center",
    },
    {
      field: "",
      width: 200,
      headerName: "Chức năng",
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
                <Link to={`/admin/event/update/${params.id}`}>
                  <Button>
                    <RiEdit2Fill size={20} />
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

  return (
    <>
      <div className="w-full mx-8">
        <div className="w-[50%] relative ">
          <input
            type="text"
            name="name"
            value={searchData}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setSearchData(e.target.value)}
            placeholder="Nhập tên sự kiện..."
          />
          <RiSearchLine
            className="absolute right-2 top-1.5 cursor-pointer"
            onClick={searchEvent}
            size={22}
          />
        </div>

        {isLoading ? (
          <Loader />
        ) : (
          <div className="w-full mt-10 bg-white">
            <DataGrid
              rows={row.map((row, index) => ({ ...row, no: index }))}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              autoHeight
            />
          </div>
        )}
      </div>
    </>
  );
};

export default AllEvent;
