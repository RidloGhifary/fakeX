import { makeRequest } from "@/utils/axios";

export const UseFollowUser = async (userId: string) => {
  const response = await makeRequest.post(`/user/follow/${userId}`);
  return response;
};

interface UpdateProps {
  userId: string;
  username: string;
  displayName: string;
  bio: string;
  profile_picture: string;
}

export const UseUpdateProfile = async (formData: UpdateProps) => {
  console.log("🚀 ~ UseUpdateProfile ~ formData:", formData);
  const response = await makeRequest.patch(`/user/update/${formData.userId}`, {
    username: formData.username,
    displayName: formData.displayName,
    bio: formData.bio,
    profile_picture: formData.profile_picture,
  });
  return response.data;
};

export const UseGetUser = async () => {
  const response = await makeRequest.get("/user");
  return response.data;
};
