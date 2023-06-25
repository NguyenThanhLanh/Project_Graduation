import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, loadProduct } from "../../../redux/actions/product";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { DataGrid } from "@material-ui/data-grid";
import Loader from "../../layout/Loader";
import { RiEdit2Fill, RiSearchLine } from "react-icons/ri";

const AllProduct = () => {
  const { productData, isLoading } = useSelector((state) => state.productData);
  const [searchData, setSearchData] = useState("");
  const dispatch = useDispatch();
  console.log(productData);
  useEffect(() => {
    dispatch(loadProduct());
  }, [dispatch]);

  const handleDelete = (idPrd) => {
    dispatch(deleteProduct(idPrd));
    // window.location.reload();
  };

  const searchProduct = () => {
    if (searchData === "") setRow(firstRow);
    else {
      const rowSearch = firstRow.filter((item) =>
        item.name.toLowerCase().includes(searchData.toLowerCase())
      );
      setRow(rowSearch);
    }
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
      field: "quantity",
      disableColumnMenu: true,
      headerName: "Số lượng sản phẩm",
      align: "center",
      minWidth: 150,
    },
    {
      field: "sell",
      headerName: "Số lượng sản phẩm đã bán",
      headerAlign: "center",
      width: 150,
      disableColumnMenu: true,
      sortable: false,
      align: "center",
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
                <Link to={`/product/${params.id}`}>
                  <Button>
                    <AiOutlineEye size={20} />
                  </Button>
                </Link>
              </span>
              <span>
                <Link to={`/admin/product/update/${params.id}`}>
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

  const firstRow = [];
  productData &&
    [...productData].forEach((item) => {
      firstRow.push({
        id: item._id,
        name: item.name,
        category: item.category,
        price: item.price,
        discount_price: item.discount_price,
        quantity: item.quantity,
        sell: item.total_sell,
      });
    });
  const [row, setRow] = useState(firstRow);

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
            onClick={searchProduct}
            size={22}
          />
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="w-full mt-3 bg-white">
            <DataGrid
              rows={row.map((row, index) => ({ ...row, no: index }))}
              columns={columns}
              pageSize={7}
              disableSelectionOnClick
              autoHeight
            />
          </div>
        )}
      </div>
    </>
  );
};

export default AllProduct;
