import axios from "axios";
import { server } from "../../server";
//load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });
    const { data } = await axios.get(`${server}/user/load-user`, {
      withCredentials: true,
    });
    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFail",
      payload: error.response.data.message,
    });
  }
};

export const updateInfoUser = (userId, formdata) => async (dispatch) => {
  try {
    dispatch({
      type: "updateUserInfoRequest",
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      withCredentials: true,
    };
    const { data } = await axios.put(
      `${server}/user/${userId}`,
      formdata,
      config
    );

    dispatch({
      type: "updateUserInfoSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "updateUserInfoFailed",
      payload: error.response.data.message,
    });
  }
};
