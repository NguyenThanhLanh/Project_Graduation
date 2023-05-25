import axios from "axios";
import { server } from "../../server";

export const loadProduct = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadProductRequest",
    });
    const { data } = await axios.get(`${server}/product`, {
      withCredentials: true,
    });
    // console.log(data);
    dispatch({
      type: "LoadProductRequestSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "LoadProductRequestFail",
      payload: error.response.data.message,
    });
  }
};

export const createProduct = (newPrd) => async (dispatch) => {
  try {
    dispatch({
      type: "CreateProductRequest",
    });
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    };
    const { data } = await axios.post(`${server}/product`, newPrd, config);

    dispatch({
      type: "CreateProductSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "CreateProductFail",
      payload: error.response.data.message,
    });
  }
};

export const deleteProduct = (idPrd) => async (dispatch) => {
  try {
    dispatch({
      type: "DeleteProductRequest",
    });

    const { data } = await axios.delete(`${server}/product/${idPrd}`, {
      withCredentials: true,
    });

    dispatch({
      type: "DeleteProductSuccess",
      payload: data.message,
    });

    dispatch(loadProduct());
  } catch (error) {
    dispatch({
      type: "DeleteProductFaild",
      payload: error.message,
    });
  }
};
