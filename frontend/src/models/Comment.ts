export interface Reply {
  user: {
    userId: string;
    username: string;
    profile_picture: string;
    hasBadge: boolean;
  };
  content: string;
  likes: string[];
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  user: {
    userId: string;
    username: string;
    profile_picture: string;
    hasBadge: boolean;
  };
  content: string;
  edited: boolean;
  likes: string[];
  _id: string;
  replies: Reply[];
  createdAt: string;
  updatedAt: string;
}
