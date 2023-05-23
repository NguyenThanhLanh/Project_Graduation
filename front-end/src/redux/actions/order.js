import axios from "axios";
import { server } from "../../server";

export const loadAllOrderUser = (idUser) => async (dispatch) => {
  try {
    dispatch({
      type: "LoadOrderUserRequest",
    });
    const { data } = await axios.get(`${server}/order/${idUser}`, {
      withCredentials: true,
    });
    // console.log(data);
    dispatch({
      type: "LoadOrderUserSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "LoadOrderUserFail",
      payload: error.response.data.message,
    });
  }
};

export const loadAllOrderAdmin = () => async (dispatch) => {
  try {
    dispatch({
      type: "loadAllOrderAdminRequest",
    });
    const { data } = await axios.get(`${server}/order`, {
      withCredentials: true,
    });
    // console.log(data);
    dispatch({
      type: "loadAllOrderAdminSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "loadAllOrderAdminFail",
      payload: error.response.data.message,
    });
  }
};

export const deleteAllOrderAdmin = (idOrder) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteAllOrderAdminRequest",
    });
    const { data } = await axios.delete(`${server}/order/${idOrder}`, {
      withCredentials: true,
    });
    // console.log(data);
    dispatch({
      type: "deleteAllOrderAdminSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "deleteAllOrderAdminFail",
      payload: error.response.data.message,
    });
  }
};
