import { makeRequest } from "@/utils/axios";

export const UseFollowUser = async (userId: string) => {
  const response = await makeRequest.post(`/user/follow/${userId}`);
  return response;
};

interface UpdateProps {
  userId: string;
  username: string;
  bio: string;
  profile_picture: string;
}

export const UseUpdateProfile = async (formData: UpdateProps) => {
  const response = await makeRequest.patch(`/user/update/${formData.userId}`, {
    username: formData.username,
    bio: formData.bio,
    profile_picture: formData.profile_picture,
  });
  return response.data;
};
