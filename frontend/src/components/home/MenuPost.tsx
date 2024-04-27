import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Post } from "@/models/Post";
import {
  Bookmark,
  Ellipsis,
  Pencil,
  RefreshCcw,
  SendHorizonal,
  Trash,
  User,
} from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useToast } from "../ui/use-toast";
import { UseAppContext } from "@/context/AppContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UseDeletePost } from "@/api/PostApi";
import { UseSavePost } from "@/api/SavedPostApi";
import { PostSavedProps } from "@/models/PostSaved";

const MenuPost: React.FC<{ post: Post }> = ({ post }) => {
  const { toast } = useToast();
  const { currentUser, savePostDatas } = UseAppContext();
  const queryClient = useQueryClient();

  const existingPostIndexInSavedPost = savePostDatas?.findIndex(
    (savedPost: PostSavedProps) => savedPost?.post?._id === post?._id,
  );

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

  const { mutate: savePostMutate, isPending: savePostLoading } = useMutation({
    mutationKey: ["save-post"],
    mutationFn: UseSavePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["save-post"] });
      toast({
        title: "Saving: Success.",
        description: `Successfully ${existingPostIndexInSavedPost !== -1 ? "Removing" : "Saving"} post.`,
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Saving: Failed.",
        description: "An error occurred during saving post.",
      });
    },
  });

  const handleSavePost = () => {
    savePostMutate({ postId: post?._id, userId: currentUser._id });
  };

  const { mutate: deletePostMutate, isPending } = useMutation({
    mutationKey: ["delete-post"],
    mutationFn: UseDeletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post"] });
      queryClient.invalidateQueries({
        queryKey: ["post-byfollowing"],
      });
      queryClient.invalidateQueries({
        queryKey: ["user-post"],
      });
      queryClient.invalidateQueries({
        queryKey: ["save-post"],
      });
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

  const handleDeletePost = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?",
    );
    if (confirmed) {
      deletePostMutate(post?._id);
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
                <DropdownMenuItem className="flex cursor-pointer gap-1">
                  <User />
                  Profile
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
            </>
          )}
          <DropdownMenuItem
            className="flex cursor-pointer gap-1"
            onClick={handleSavePost}
            disabled={savePostLoading}
          >
            {savePostLoading ? (
              "Loading"
            ) : existingPostIndexInSavedPost !== -1 ? (
              <>
                <Bookmark size={23} fill="black" />
                Remove
              </>
            ) : (
              <>
                <Bookmark size={23} />
                Save
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex cursor-pointer gap-1"
            onClick={handelShareLink}
          >
            <SendHorizonal size={23} />
            Share
          </DropdownMenuItem>
          {currentUser?._id === post?.user?._id && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="flex cursor-pointer gap-1"
                onClick={handleEditPost}
              >
                <Pencil size={23} />
                Edit
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleDeletePost}
                className="flex cursor-pointer gap-1 bg-rose-300 text-rose-900"
              >
                {isPending ? (
                  <>
                    <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />
                    Pending
                  </>
                ) : (
                  <>
                    <Trash size={23} />
                    Delete
                  </>
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
