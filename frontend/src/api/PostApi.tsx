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
  const response = await makeRequest.post(`/post/comment/${url}`, {
    content: content,
  });
  return response;
};

export const UseLikePost = async (urlLike: string) => {
  const response = await makeRequest.post(urlLike as string);
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

export const GetPostByFollowing = async () => {
  const response = await makeRequest.get(`/post/byfollowing`);
  return response.data;
};

export const GetPostByUser = async (username: string) => {
  const response = await makeRequest.get(`/post/${username}`);
  return response.data;
};

interface DeleteCommentProps {
  commentId: string;
  postId: string;
}

export const DeleteComment = async (formData: DeleteCommentProps) => {
  const response = await makeRequest.post(
    `/post/comment/${formData.commentId}/delete/${formData.postId}`,
  );
  return response;
};

interface DeleteReplyCommentProps {
  commentId: string;
  postId: string;
  replyId: string;
}

export const DeleteReplyComment = async (formData: DeleteReplyCommentProps) => {
  const response = await makeRequest.post(
    `/post/comment/${formData.commentId}/delete-reply/${formData?.postId}/${formData.replyId}`,
  );
  return response;
};
