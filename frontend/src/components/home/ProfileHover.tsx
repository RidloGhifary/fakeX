import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";

const ProfileHover = () => {
  return (
    <div className="flex justify-between space-x-4">
      <Avatar>
        <AvatarImage src="https://github.com/vercel.png" />
        <AvatarFallback>VC</AvatarFallback>
      </Avatar>
      <div className="space-y-1">
        <h4 className="text-sm font-semibold">@nextjs</h4>
        <p className="text-sm">
          The React Framework – created and maintained by @vercel.
        </p>
        <p className="text-sm text-gray-500">3,457 followers</p>
        <Button className="w-full bg-black text-white transition hover:scale-105 hover:bg-black hover:text-white">
          Follow
        </Button>
      </div>
    </div>
  );
};

export default ProfileHover;
