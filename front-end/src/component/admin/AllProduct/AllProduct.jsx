import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, loadProduct } from "../../../redux/actions/product";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { DataGrid } from "@material-ui/data-grid";
import Loader from "../../layout/Loader";

const AllProduct = () => {
  const { productData, isLoading } = useSelector((state) => state.productData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProduct());
  }, [dispatch]);

  const handleDelete = (idPrd) => {
    dispatch(deleteProduct(idPrd));
    // window.location.reload();
  };
  const columns = [
    {
      field: "no",
      headerName: "Stt",
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
      field: "category",
      disableColumnMenu: true,
      headerName: "Loại sản phẩm",
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
      width: 150,
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
                <Link to={`/product/${params.id}`}>
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

  productData &&
    [...productData].forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        category: item.category,
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

export default AllProduct;
