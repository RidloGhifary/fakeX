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
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "./ui/use-toast";
import { UseAppContext } from "@/context/AppContext";

const LeftSideMenu = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { currentUser } = UseAppContext();

  const { mutate, isPending } = useMutation({
    mutationFn: UseLogOut,
    mutationKey: ["validate"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["validate"] });
      navigate("/sign-in");
    },
  });

  const handleLogOut = async () => {
    try {
      await mutate();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Sign in: failed!",
        description: "An error occurred during sign-in.",
      });
    }
  };

  return (
    <div className="hidden flex-[2] cursor-pointer text-right md:block">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <AlignRight className="text-gray-500" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className="cursor-pointer">
            <Link to={`/profile/@${currentUser?.username}`}>Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
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
            Saved
          </DropdownMenuItem>
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
