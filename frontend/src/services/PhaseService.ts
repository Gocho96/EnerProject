import axios from "axios";
import { Phase } from "../types/phase";
import { API_URL } from "../config/api";

const BASE_URL = `${API_URL}/phases`;

export const getPhasesByProjectCode = async (code: string) => {
  return await axios.get<Phase>(`${BASE_URL}/code/${code}`);
};

export const updatePhasesByProjectCode = async (
  code: string,
  data: Partial<Phase>
) => {
  return await axios.patch<Phase>(`${BASE_URL}/code/${code}`, data);
};
