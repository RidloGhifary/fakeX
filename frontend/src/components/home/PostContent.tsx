import User from "../../assets/user.png";
import { Ellipsis, Heart, MessageCircle, Plus, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { Separator } from "../ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import ProfileHover from "./ProfileHover";

const PostContent = () => {
  return (
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
          <HoverCard>
            <HoverCardTrigger>
              <p className="font-semibold">
                <Link to="/@rdllghifary_" className="hover:underline">
                  @rdllghifary_
                </Link>
                <span className="ml-5 text-gray-500">2h</span>
              </p>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <ProfileHover />
            </HoverCardContent>
          </HoverCard>
          <p className="mt-2 line-clamp-4 font-light">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
            praesentium libero natus distinctio inventore atque deserunt
            voluptas consectetur? Perspiciatis alias rerum repudiandae
            distinctio commodi fugit magni, quos ut, mollitia obcaecati, sed
            eveniet expedita. Beatae iusto vel dolore laudantium, nam placeat
            similique itaque sequi dolorum molestias odio, rem quo! A, nostrum!
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
            200 likes -{" "}
            <Link to="/@user/post/660d669a571eec5f7c60dcd9">10 replies</Link>
          </p>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Ellipsis className="text-xl" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="cursor-pointer">
                Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                Save
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                Share
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </section>
  );
};

export default PostContent;
