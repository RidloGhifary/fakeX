export interface Post {
  _id: string;
  user: {
    userId: string;
    username: string;
    bio: string;
    profile_picture: string;
    hasBadge: boolean;
    followers: string[];
  };
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
