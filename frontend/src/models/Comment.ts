export interface Reply {
  user: {
    _id: string;
    username: string;
    profile_picture: string;
    hasBadge: boolean;
  };
  content: string;
  likes: string[];
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Comment {
  user: {
    _id: string;
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
  __v: number;
}
