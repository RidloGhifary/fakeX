import { Post } from "@/models/Post";
import { makeRequest } from "@/utils/axios";

export const UseGetSuggestContent = async () => {
  const response = await makeRequest.get("/post");
  return response.data;
};

export const UseGetContentByFollowing = async () => {
  const response = await makeRequest.get("/post/byfollowing");
  return response.data;
};

export const UseGetPostDetail = async (postId: string): Promise<Post> => {
  const response = await makeRequest.get(`/post/${postId}`);
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
  console.log("🚀 ~ content:", content);
  const response = await makeRequest.post(`/post/comment/${url}`, {
    content: content,
  });
  return response;
};

export const UseDeletePost = async (postId: string) => {
  const response = await makeRequest.post(`/post/delete/${postId}`);
  return response;
};

export const UseSearchPost = async (formData: string) => {
  const response = await makeRequest.get(`/post/search/content?q=${formData}`);
  return response.data;
};
