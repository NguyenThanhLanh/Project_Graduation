import axios from "axios";
import { server } from "../../server";

export const loadCategories = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadCategoryRequest",
    });
    const { data } = await axios.get(`${server}/category`, {
      withCredentials: true,
    });
    // console.log(data);
    dispatch({
      type: "LoadCategoryRequestSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "LoadCategoryRequestFail",
      payload: error.response.data.message,
    });
  }
};
