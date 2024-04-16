interface User {
  userId: string;
  username: string;
  profile_picture: string;
  hasBadge: boolean;
}

interface Reply {
  user: User;
  content: string;
  likes: string[];
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  user: User;
  content: string;
  edited: boolean;
  likes: string[];
  _id: string;
  replies: Reply[];
  createdAt: string;
  updatedAt: string;
}
