import { makeRequest } from "@/utils/axios";

export const UseGetUserPostSaved = async (userId: string) => {
  const response = await makeRequest.get(`/saved-post/${userId}`);
  return response.data;
};

interface UseSavePostProps {
  postId: string;
  userId: string;
}

export const UseSavePost = async (formData: UseSavePostProps) => {
  const response = await makeRequest.post(
    `/saved-post/${formData.postId}/${formData.userId}`,
  );
  return response;
};
