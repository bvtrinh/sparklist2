import axios from "axios";
import { setAuth, clearAuth } from "../helpers/authSession";

export const userInfo = async () => {
  try {
    const res = await axios.get("/api/u");
    setAuth(res.data.user);

    return res;
  } catch (err) {
    clearAuth();
    return err.response;
  }
};

export const logout = async () => {
  try {
    const res = await axios.get("/api/u/logout");
    clearAuth();
    return res;
  } catch (err) {
    clearAuth();
    return err.response;
  }
};

export const createInvite = async () => {
  try {
    // Include check to see if admin
    const res = await axios.get("/api/u/create_invite");
    return res;
  } catch (err) {
    return err.response;
  }
};
