import dayjs from "dayjs";

export const formatLocalDate = (dateString?: string): string => {
  if (!dateString) return "";
  return dayjs(dateString).format("YYYY-MM-DD");
};