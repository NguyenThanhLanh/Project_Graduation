import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { AiOutlineDelete } from "react-icons/ai";
import { DataGrid } from "@material-ui/data-grid";
import Loader from "../../layout/Loader";
import { deleteSuppiler, loadSuppiler } from "../../../redux/actions/suppiler";
import { Link } from "react-router-dom";
import { RiEdit2Fill, RiSearchLine } from "react-icons/ri";

const AllSupplier = () => {
  const { suppilerData, isLoading } = useSelector(
    (state) => state.suppilerData
  );
  const dispatch = useDispatch();
  const [searchData, setSearchData] = useState("");
  const firstRow = [];
  suppilerData &&
    [...suppilerData].forEach((item) => {
      firstRow.push({
        id: item._id,
        name: item.name,
        address: item.address,
        phone: item.phone,
        email: item.email,
      });
    });
  const [row, setRow] = useState(firstRow);
  useEffect(() => {
    // dispatch(loadSuppiler());
    dispatch(loadSuppiler());
    // window.location.reload();
  }, [dispatch]);

  const searchSupplier = () => {
    if (searchData === "") setRow(firstRow);
    else {
      const rowSearch = firstRow.filter((item) =>
        item.name.toLowerCase().includes(searchData.toLowerCase())
      );
      setRow(rowSearch);
    }
  };
  const handleDelete = (idPrd) => {
    dispatch(deleteSuppiler(idPrd));
    // window.location.reload();
    dispatch(loadSuppiler());
  };

  const columns = [
    {
      field: "no",
      headerName: "Stt.",
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
      headerName: "Tên nhà cung cấp",
      minWidth: 350,
    },
    {
      field: "address",
      disableColumnMenu: true,
      headerName: "Địa chỉ",
      minWidth: 150,
    },
    {
      field: "phone",
      headerAlign: "center",
      headerName: "Số điện thoại",
      minWidth: 130,
      align: "center",
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: "email",
      headerName: "Email",
      headerAlign: "center",
      minWidth: 190,
      sortable: false,
      disableColumnMenu: true,
      align: "center",
    },
    {
      field: "",
      width: 150,
      headerName: "Chức năng",
      headerAlign: "center",
      type: "number",
      disableColumnMenu: true,
      sortable: false,
      align: "center",
      renderCell: (params) => {
        return (
          <>
            <div className="">
              <span>
                <Link to={`/admin/supplier/update/${params.id}`}>
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
            placeholder="Nhập tên sản phẩm..."
          />
          <RiSearchLine
            className="absolute right-2 top-1.5 cursor-pointer"
            onClick={searchSupplier}
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

export default AllSupplier;
