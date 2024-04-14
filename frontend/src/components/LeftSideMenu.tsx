import { UseLogOut } from "@/api/AuthApi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlignRight } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";

const LeftSideMenu = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: UseLogOut,
    onSuccess: () => {
      navigate("/sign-in");
    },
  });

  const handleLogOut = async () => {
    try {
      mutate();
    } catch (error) {
      console.error("Sign-in failed:", error);
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
            <Link to="/profile/@rdllghifary_">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">Liked</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">Saved</DropdownMenuItem>
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
