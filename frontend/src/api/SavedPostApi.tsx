import { makeRequest } from "@/utils/axios";

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
