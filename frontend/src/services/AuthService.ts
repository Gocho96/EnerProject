import axios from "axios";
import { userAuth } from "../types/user";
import { API_URL } from "../config/api";

export const register = async (user: userAuth) => {
  try {
    return await axios.post<userAuth>(`${API_URL}/register`, user);
  } catch (error) {
    console.log(error);
  }
};

export const login = async (user: userAuth) => {
  try {
    return await axios.post<userAuth>(`${API_URL}/login/`, user);
  } catch (error) {
    console.log(error);
  }
};

export const logout = async () => {
  try {
    return await axios.post(`${API_URL}/logout`);
  } catch (error) {
    console.log(error);
  }
};

export const verifyToken = async () => {
  try {
    return await axios.get<userAuth>(`${API_URL}/verify/`);
  } catch (error) {
    console.log(error);
  }
};

export const profile = async () => {
  try {
    return await axios.get<userAuth>(`${API_URL}/profile`);
  } catch (error) {
    console.log(error);
  }
};
