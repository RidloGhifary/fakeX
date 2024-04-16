import { makeRequest } from "@/utils/axios";

export const getSuggestContent = async () => {
  const response = await makeRequest.get("/post");
  return response.data;
};

export const getContentByFollowing = async () => {
  const response = await makeRequest.get("/post/byfollowing");
  return response.data;
};
