export interface CommentUser {
  userId: string;
  username: string;
  profile_picture: string;
  hasBadge: boolean;
}

export interface Reply {
  user: CommentUser;
  content: string;
  likes: string[];
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  user: CommentUser;
  content: string;
  edited: boolean;
  likes: string[];
  _id: string;
  replies: Reply[];
  createdAt: string;
  updatedAt: string;
}
