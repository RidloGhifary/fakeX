import CreatePostHomePage from "./CreatePostHomePage";
import { Separator } from "./ui/separator";
import User from "../assets/user.png";
import { Ellipsis, Heart, MessageCircle, Plus, Send } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const TimeLine = () => {
  return (
    <section className="mx-auto max-w-[600px] py-20">
      <CreatePostHomePage />
      {Array.from(
        [1, 2, 3, 4, 5, 6].map((_, i) => (
          <div key={i}>
            <Separator className="my-6 border-[.2px] border-gray-800" />
            <section className="flex justify-start gap-4">
              <div className="flex flex-none flex-col items-center gap-4">
                <div className="relative">
                  <img
                    src={User}
                    alt="user-photo"
                    className="w-10 rounded-full border"
                  />
                  <div className="absolute -bottom-1 -right-1 cursor-pointer rounded-full border border-black bg-white text-black transition hover:scale-110">
                    <Plus size={18} />
                  </div>
                </div>
                <Separator
                  orientation="vertical"
                  className="h-[74%] border-[.2px] border-gray-800"
                />
              </div>
              <div className="flex flex-1 gap-4">
                <div>
                  <p className="font-semibold">
                    <Link to="/@rdllghifary_" className="hover:underline">
                      @rdllghifary_
                    </Link>
                    <span className="ml-5 text-gray-500">2h</span>
                  </p>
                  <p className="mt-2 line-clamp-4 font-light">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Repudiandae praesentium libero natus distinctio inventore
                    atque deserunt voluptas consectetur? Perspiciatis alias
                    rerum repudiandae distinctio commodi fugit magni, quos ut,
                    mollitia obcaecati, sed eveniet expedita. Beatae iusto vel
                    dolore laudantium, nam placeat similique itaque sequi
                    dolorum molestias odio, rem quo! A, nostrum!
                  </p>
                  <div className="mb-2 mt-10 flex items-center gap-3">
                    <div className="cursor-pointer rounded-full p-1 hover:bg-white/15">
                      <Heart />
                    </div>
                    <div className="cursor-pointer rounded-full p-1 hover:bg-white/15">
                      <MessageCircle />
                    </div>
                    <div className="cursor-pointer rounded-full p-1 hover:bg-white/15">
                      <Send />
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">
                    200 likes - <span>10 replies</span>
                  </p>
                </div>
                <div>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Ellipsis className="text-xl" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Save</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Share</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </section>
          </div>
        )),
      )}
    </section>
  );
};

export default TimeLine;
