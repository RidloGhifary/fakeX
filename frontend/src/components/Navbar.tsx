import React, { ChangeEvent } from "react";
import Logo from "../assets/fakeX.png";
import User from "../assets/user.png";
import { Home, SquarePlus, SquareUserRound } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "./ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "./ui/button";
import LeftSideMenu from "./LeftSideMenu";

const Navbar = () => {
  const [textPostContent, setTextPostContent] = React.useState<string>("");

  const handleChangePostContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTextPostContent(event.target.value);
  };

  const handleSubmitPostContent = () => {
    console.log(textPostContent);
  };

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
                  <Link to={"/"}>
                    <Home />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Home</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div>
            <Dialog>
              <DialogTrigger>
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
              </DialogTrigger>
              <DialogContent className="h-auto min-h-[200px] border-white/50 bg-black text-white">
                <DialogHeader>
                  <DialogTitle>
                    <div className="flex justify-start gap-4 overflow-hidden">
                      <section className="flex flex-none flex-col items-center gap-4">
                        <img
                          src={User}
                          alt="user-photo"
                          className="w-10 rounded-full border"
                        />
                        <Separator
                          orientation="vertical"
                          className="h-[74%] border-[.2px] border-gray-800"
                        />
                      </section>
                      <section className="flex-1">
                        <div className="w-full">
                          <p className="mb-2 text-left font-semibold">
                            @rdllghifary_
                          </p>
                          <Textarea
                            autoFocus={true}
                            value={textPostContent}
                            minLength={1}
                            maxLength={500}
                            onChange={handleChangePostContent}
                            contentEditable={true}
                            placeholder="Write for posting..."
                            className="h-auto min-h-[100px] w-full resize-none border-0 bg-transparent px-0 font-light focus-visible:ring-0 focus-visible:ring-offset-0"
                          />
                        </div>
                        <div className="mt-5 flex items-center justify-between">
                          <p className="text-sm font-medium text-white/50">
                            add to public
                          </p>
                          <Button
                            disabled={textPostContent === ""}
                            onClick={handleSubmitPostContent}
                            className="rounded-full bg-white font-bold uppercase text-black transition  hover:bg-white/80 hover:text-black disabled:cursor-not-allowed disabled:bg-white/50"
                          >
                            post
                          </Button>
                        </div>
                      </section>
                    </div>
                  </DialogTitle>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Link to={"/profile/@rdllghifary_"}>
                    <SquareUserRound />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Profile</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <LeftSideMenu />
      </section>
    </header>
  );
};

export default Navbar;
