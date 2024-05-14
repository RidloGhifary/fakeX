import { makeRequest } from "@/utils/axios";

export const GetUserNotification = async () => {
  const response = await makeRequest.get("/notification/get-user-notification");
  return response.data;
};
