import axios from "axios";
import { server } from "../../server";

export const loadSuppiler = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadSuppilerRequest",
    });
    const { data } = await axios.get(`${server}/suppiler`, {
      withCredentials: true,
    });
    // console.log(data);
    dispatch({
      type: "LoadSuppilerRequestSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "LoadSuppilerRequestFail",
      payload: error.response.data.message,
    });
  }
};

export const createSuppiler = (newSuppiler) => async (dispatch) => {
  try {
    dispatch({
      type: "CreateSuppilerRequest",
    });
    const { data } = await axios.post(`${server}/suppiler`, newSuppiler, {
      withCredentials: true,
    });
    // console.log(data);
    dispatch({
      type: "CreateSuppilerRequestSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "CreateSuppilerRequestFail",
      payload: error.response.data.message,
    });
  }
};

export const deleteSuppiler = (idSupplier) => async (dispatch) => {
  try {
    dispatch({
      type: "DeleteSuppilerRequest",
    });
    const { data } = await axios.delete(`${server}/suppiler/${idSupplier}`, {
      withCredentials: true,
    });
    // console.log(data);
    dispatch({
      type: "DeleteSuppilerRequestSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "DeleteSuppilerRequestFail",
      payload: error.response.data.message,
    });
  }
};
