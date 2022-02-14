import * as actions from "./actionType";
import axios from "axios";

//async action

export const fetchusers = () => ({
  type: actions.FETCH_USERS_REQUEST,
});

export const fetchsuccess = (users) => ({
  type: actions.FETCH_USERS_SUCCESS,
  payload: {
    users,
  },
});

export const fetchfailure = (error) => ({
  type: actions.FETCH_USERS_FAILURE,
  payload: {
    error,
  },
});

export const fetchUsers = (id) => {
  return async (dispatch) => {
    dispatch(fetchusers());
    try {
      const response = await axios.get(`/api/users/${id}`);
      dispatch(fetchsuccess(response.data));
    } catch (error) {
      dispatch(fetchfailure(error.response.data));
      await axios.post("/api/users/signout", {});
    }
  };
};
