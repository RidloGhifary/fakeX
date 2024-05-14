import { UserSum } from "./User";

export interface NotificationProps {
  _id: string;
  recipient: string;
  sender: UserSum;
  post: string;
  message: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
