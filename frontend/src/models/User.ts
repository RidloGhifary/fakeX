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
  followers: string[];
  following: string[];
  hasBadge: boolean;
  lastUsernameChange: string;
  verificationBadgeRequested: boolean;
}
