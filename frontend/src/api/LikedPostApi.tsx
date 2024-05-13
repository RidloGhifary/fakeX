import { makeRequest } from "@/utils/axios";

export const GetPostByUserLiked = async (userId: string) => {
  const response = await makeRequest.get(`/liked-post/${userId}`);
  return response.data;
};
