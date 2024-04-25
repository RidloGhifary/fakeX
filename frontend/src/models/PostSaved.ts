import { Post } from "./Post";

export interface PostSaved {
  _id: string;
  user: string;
  post: Post;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
