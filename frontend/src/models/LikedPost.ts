import { Comment } from "./Comment";
import { UserSum } from "./User";

export interface LikedPostProps {
  _id: string;
  user: UserSum;
  content: string;
  likes: string[];
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
