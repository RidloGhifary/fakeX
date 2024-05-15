import { makeRequest } from "@/utils/axios";

export const GetUserNotification = async () => {
  const response = await makeRequest.get("/notification/get-user-notification");
  return response.data;
};

export const UpdateReadStatus = async () => {
  const response = await makeRequest.patch("/notification/read-all");
  return response;
};
