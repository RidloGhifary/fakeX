import Logo from "../assets/fakeX.png";
import { AlignRight, Home, SquarePlus, SquareUserRound } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="fixed bottom-0 z-10 w-full max-w-[1100px] bg-black p-3 md:bottom-auto md:top-0">
      <section className="w-full items-center justify-between md:flex">
        <Link to="/" className="hidden flex-[2] md:block">
          <img src={Logo} alt="logo" className="w-[80px] " />
        </Link>
        <div className="flex w-full flex-[3] items-center justify-center gap-16 rounded-md py-2 md:w-[50%]">
          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Home />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Home</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <SquarePlus />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Create post</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <SquareUserRound />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Profile</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <div className="hidden flex-[2] cursor-pointer text-right md:block">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <AlignRight className="text-gray-500" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="cursor-pointer">
                Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                Liked
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                Saved
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </section>
    </header>
  );
};

export default Navbar;
