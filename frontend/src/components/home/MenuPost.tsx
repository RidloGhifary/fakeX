import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Post } from "@/models/Post";
import { Ellipsis } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useToast } from "../ui/use-toast";

const MenuPost: React.FC<{ post: Post }> = ({ post }) => {
  const { toast } = useToast();

  const domain = window.location.hostname;
  const port = window.location.port ? `:${window.location.port}` : "";

  const handelShareLink = () => {
    const postUrl = `http://${domain}${port}/@${post?.user?.username}/post/${post?._id}`;

    navigator.clipboard
      .writeText(`${postUrl}`)
      .then(() => {
        toast({
          title: "Success copied.",
          description: "URL has been copied.",
        });
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Failed.",
          description: "Failed copied URL.",
        });
      });
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Ellipsis className="text-xl" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <Link to={`/profile/@${post?.user?.username}`}>
            <DropdownMenuItem className="cursor-pointer">
              Profile
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">Save</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={handelShareLink}
          >
            Share
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MenuPost;
