import { makeRequest } from "@/utils/axios";

export const getSuggestContent = async () => {
  const response = await makeRequest.get("/post");
  return response.data;
};

export const getContentByFollowing = async () => {
  const response = await makeRequest.get("/post/byfollowing");
  return response.data;
};

interface CreatePostProps {
  content: string;
}

export const UseCreatePost = async (formData: CreatePostProps) => {
  const response = await makeRequest.post("/post/create", formData);
  return response;
};

export const UseCommentPost = async (formData: {
  content: string;
  url: string;
}) => {
  const { content, url } = formData;
  const response = await makeRequest.post(`/post/comment/${url}`, {
    content: content,
  });
  return response;
};
