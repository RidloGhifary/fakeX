import { makeRequest } from "@/utils/axios";

export const UseFollowUser = async (userId: string) => {
  const response = await makeRequest.post(`/user/follow/${userId}`);
  return response;
};
