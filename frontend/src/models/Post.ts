import { UserSum } from "./User";

export interface Post {
  _id: string;
  user: UserSum;
  content: string;
  likes: string[];
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Comment {
  _id: string;
  userId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface UserPost {
  _id: string;
  user: UserSum;
  content: string;
  likes: string[];
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
