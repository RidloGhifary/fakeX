import React from "react";
import { UseLogOut } from "@/api/AuthApi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlignRight } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useLocation } from "react-router-dom";
import { useToast } from "./ui/use-toast";
import { UseAppContext } from "@/context/AppContext";

const LeftSideMenu = () => {
  const { toast } = useToast();
  const { currentUser } = UseAppContext();
  const { pathname } = useLocation();
  const profileUrl = pathname.split("/")[1];
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["log-out"],
    mutationFn: UseLogOut,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Sign out: failed!",
        description: "An error occurred during sign-out.",
      });
    },
  });

  const handleLogOut = () => {
    mutate();
  };

  return (
    <div className="absolute right-3 cursor-pointer text-right md:static md:block md:flex-[2]">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <AlignRight className="text-gray-500" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {!profileUrl && (
            <React.Fragment>
              <Link to={`/profile/@${currentUser?.username}`}>
                <DropdownMenuItem className="cursor-pointer">
                  Profile
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
            </React.Fragment>
          )}
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              toast({
                variant: "destructive",
                title: "Failed.",
                description: "This feature is not available yet.",
              });
            }}
          >
            Liked
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <Link to={`/@${currentUser.username}/post-saved`}>
            <DropdownMenuItem className="cursor-pointer">
              Saved
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" onClick={handleLogOut}>
            {isPending ? "Loading..." : "Log out"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LeftSideMenu;
