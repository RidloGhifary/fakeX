import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Post } from "@/models/Post";
import { Ellipsis, RefreshCcw } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useToast } from "../ui/use-toast";
import { UseAppContext } from "@/context/AppContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UseDeletePost } from "@/api/PostApi";

const MenuPost: React.FC<{ post: Post }> = ({ post }) => {
  const { toast } = useToast();
  const { currentUser } = UseAppContext();
  const queryClient = useQueryClient();

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

  const handleSavePost = () => {
    toast({
      variant: "destructive",
      title: "Coming soon.",
      description: "This feature is not available yet.",
    });
  };

  const { mutate, isPending } = useMutation({
    mutationKey: ["delete-post"],
    mutationFn: UseDeletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post"] });
      toast({
        title: "Success.",
        description: "Success to delete post.",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Failed.",
        description: "Failed to delete post.",
      });
    },
  });

  const handleDeletePost = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?",
    );
    if (confirmed) {
      await mutate(post?._id);
    }
  };

  const handleEditPost = () => {
    toast({
      variant: "destructive",
      title: "Failed.",
      description: "This feature is not available yet.",
    });
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Ellipsis className="text-xl" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {currentUser?._id !== post?.user?._id && (
            <>
              <Link to={`/profile/@${post?.user?.username}`}>
                <DropdownMenuItem className="cursor-pointer">
                  Profile
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={handleSavePost}
              >
                Save
              </DropdownMenuItem>
            </>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={handelShareLink}
          >
            Share
          </DropdownMenuItem>
          {currentUser?._id === post?.user?._id && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={handleEditPost}
              >
                Edit
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleDeletePost}
                className="cursor-pointer bg-rose-300 text-rose-900"
              >
                {isPending ? (
                  <>
                    <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />
                    Pending
                  </>
                ) : (
                  "Delete"
                )}
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MenuPost;
