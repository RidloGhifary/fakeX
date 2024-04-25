import { Post } from "./Post";
import { UserSum } from "./User";

export interface PostSavedProps {
  _id: string;
  user: UserSum;
  post: Post;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
