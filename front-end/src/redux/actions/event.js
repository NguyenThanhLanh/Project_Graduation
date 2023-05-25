import axios from "axios";
import { server } from "../../server";

export const createEvent = (newPrd) => async (dispatch) => {
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
    const { data } = await axios.post(`${server}/event`, newPrd, config);
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

export const getAllEvent = () => async (dispatch) => {
  try {
    dispatch({
      type: "GetAllEventRequest",
    });

    const { data } = await axios.get(`${server}/event`, {
      withCredentials: true,
    });
    // console.log("Kiểm tra dataaaa: ", data);

    dispatch({
      type: "GetAllEventSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "GetAllEventFail",
      payload: error.response.data.message,
    });
  }
};

export const deleteEvent = (idPrd) => async (dispatch) => {
  try {
    dispatch({
      type: "DeleteEventRequest",
    });

    const { data } = await axios.delete(`${server}/event/${idPrd}`, {
      withCredentials: true,
    });
    // console.log("Kiểm tra dataaaa: ", data);
    dispatch({
      type: "DeleteEventSuccess",
      payload: data,
    });

    dispatch(getAllEvent());
  } catch (error) {
    dispatch({
      type: "DeleteEventFaid",
      payload: error.response.data.message,
    });
  }
};
