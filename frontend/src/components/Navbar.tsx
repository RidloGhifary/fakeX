import Logo from "../assets/fakeX.png";
import {
  ArrowLeftRight,
  Home,
  SquarePlus,
  SquareUserRound,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link } from "react-router-dom";
import React from "react";

const Navbar = () => {
  const [postOrder, setPostOrder] = React.useState<boolean>(false);

  return (
    <header className="fixed top-0 w-full max-w-[1100px] bg-black p-3">
      <section className="flex w-full items-center justify-between">
        <Link to="/" className="flex-[2]">
          <img src={Logo} alt="logo" className="w-[80px] " />
        </Link>
        <div className="flex w-[50%] flex-[3] items-center justify-center gap-16 rounded-md py-2">
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
        <div className="flex-[2] cursor-pointer">
          <div
            onClick={() => setPostOrder(!postOrder)}
            className=" flex items-center justify-end gap-2"
          >
            {postOrder ? "Following" : "For you"}
            <ArrowLeftRight />
          </div>
        </div>
      </section>
    </header>
  );
};

export default Navbar;
