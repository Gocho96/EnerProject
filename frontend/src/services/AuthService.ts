import axios from "axios";
import { userAuth } from "../types/user";

const API = "http://localhost:3000/api";

export const register = async (user: userAuth) => {
  try {
    return await axios.post<userAuth>(`${API}/register`, user);
  } catch (error) {
    console.log(error);
  }
};

export const login = async (user: userAuth) => {
  try {
    return await axios.post<userAuth>(`${API}/login/`, user);
  } catch (error) {
    console.log(error);
  }
};

export const logout = async () => {
  try {
    return await axios.post(`${API}/logout`);
  } catch (error) {
    console.log(error);
  }
};

export const verifyToken = async () => {
  try {
    return await axios.get<userAuth>(`${API}/verify/`);
  } catch (error) {
    console.log(error);
  }
};

export const profile = async () => {
  try {
    return await axios.get<userAuth>(`${API}/profile`);
  } catch (error) {
    console.log(error);
  }
};
