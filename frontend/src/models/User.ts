export interface User {
  _id: string;
  username: string;
  email: string;
  dateOfBirth: string;
  bio: string;
  profile_picture: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  followers: Followers[];
  following: string[];
  hasBadge: boolean;
  lastUsernameChange: string;
  verificationBadgeRequested: boolean;
}

export interface Followers {
  _id: string;
  username: string;
  profile_picture: string;
  hasBadge: boolean;
}

export interface UserSum {
  _id: string;
  username: string;
  profile_picture: string;
  hasBadge: boolean;
  followers: Followers[];
}
