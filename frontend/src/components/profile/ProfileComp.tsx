import { UseAppContext } from "@/context/AppContext";
import User from "../../assets/user.png";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import UserContent from "./UserContent";
import { BadgeCheck } from "lucide-react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "@/utils/axios";

const ProfileComp = () => {
  const { currentUser } = UseAppContext();
  const { username } = useParams();

  const { data: user, isPending } = useQuery({
    queryKey: ["user", username],
    queryFn: async () => {
      const response = await makeRequest.get(`/user/${username?.slice(1)}`);
      return response.data;
    },
  });

  if (isPending) return <p>Loading...</p>;

  return (
    <section className="mx-auto max-w-[600px] px-3 pb-20 pt-4 md:px-0 md:py-20 md:pb-0">
      <section className="flex items-center justify-between">
        <h1 className="flex items-center gap-2 text-4xl">
          <span>@{user?.username}</span>
          <span>
            {user.hasBadge && (
              <BadgeCheck size={35} fill="blue" stroke="black" />
            )}
          </span>
        </h1>
        <img
          src={user?.profile_picture || User}
          alt="user-photo"
          className="h-[120px] w-[120px] rounded-full object-cover"
        />
      </section>
      <section className="font-light">
        <p className="font-medium text-white/50">Ridlo achmad ghifary</p>
        <p>{user?.bio}</p>

        <div className="my-7 flex items-center gap-4">
          <div className="relative flex items-center">
            <img
              src={User}
              alt="user-photo"
              className="h-[20px] w-[20px] rounded-full border object-cover"
            />
            <img
              src={User}
              alt="user-photo"
              className="absolute left-[50%] w-[20px]"
            />
          </div>
          <p className="text-sm font-medium text-white/50">
            {user?.followers.length +
              `${user?.followers.length > 1 ? " followers" : " follower"}`}
          </p>
        </div>

        <div className="flex items-center justify-center gap-4">
          {currentUser._id !== user?._id && (
            <Button className="w-[50%] bg-white/10 transition hover:scale-105 hover:bg-white/10">
              Follow
            </Button>
          )}
          {currentUser._id === user?._id && (
            <Button className="w-[50%] bg-white/10 transition hover:scale-105 hover:bg-white/10">
              Edit profile
            </Button>
          )}
          <Button className="w-[50%] bg-white/10 transition hover:scale-105 hover:bg-white/10">
            Share profile
          </Button>
        </div>
      </section>

      <section className="py-7">
        <h1 className="text-center text-xl uppercase">your post</h1>
        {Array.from(
          [1, 2].map((_, i) => (
            <div key={i} className="">
              <Separator className="my-6 border-[.2px] border-gray-800" />
              <UserContent />
            </div>
          )),
        )}
      </section>
    </section>
  );
};

export default ProfileComp;
