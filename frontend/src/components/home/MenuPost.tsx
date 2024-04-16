import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

interface MenuPostProps {
  userId: string;
  username: string;
  bio: string;
  profile_picture: string;
  hasBadge: boolean;
  followers: string[];
}

const MenuPost: React.FC<{ user: MenuPostProps }> = ({ user }) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Ellipsis className="text-xl" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <Link to={`/profile/${user?.username}`}>
            <DropdownMenuItem className="cursor-pointer">
              Profile
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">Save</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">Share</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MenuPost;
