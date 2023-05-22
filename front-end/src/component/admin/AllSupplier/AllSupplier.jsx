import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { AiOutlineDelete } from "react-icons/ai";
import { DataGrid } from "@material-ui/data-grid";
import Loader from "../../layout/Loader";
import { deleteSuppiler, loadSuppiler } from "../../../redux/actions/suppiler";

const AllSupplier = () => {
  const { suppilerData, isLoading } = useSelector(
    (state) => state.suppilerData
  );
  const suppilerDataRender = suppilerData ? [...suppilerData] : [];
  console.log("1111111111111111111111111111111111111", suppilerData);
  const dispatch = useDispatch();

  //   useEffect(() => {
  //     window.location.reload();
  //   }, []);

  useEffect(() => {
    dispatch(loadSuppiler());
  }, [dispatch]);

  const handleDelete = (idPrd) => {
    dispatch(deleteSuppiler(idPrd));
    window.location.reload();
  };
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
      headerName: "Supplier name",
      minWidth: 350,
    },
    {
      field: "address",
      disableColumnMenu: true,
      headerName: "Address",
      minWidth: 150,
    },
    {
      field: "phone",
      headerAlign: "center",
      headerName: "Phone number",
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
      headerName: "Function",
      headerAlign: "center",
      type: "number",
      disableColumnMenu: true,
      sortable: false,
      align: "center",
      renderCell: (params) => {
        return (
          <>
            <div className="">
              {/* <span>
                  <Link to={`/product/${params.id}`}>
                    <Button>
                      <AiOutlineEye size={20} />
                    </Button>
                  </Link>
                </span> */}

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

  suppilerDataRender.length !== 0 &&
    [...suppilerData].forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        address: item.address,
        phone: item.phone,
        email: item.email,
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

export default AllSupplier;
