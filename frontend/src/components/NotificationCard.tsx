import { NotificationProps } from "@/models/Notification";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import ProfileHover from "./home/ProfileHover";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UseAppContext } from "@/context/AppContext";
import { useToast } from "./ui/use-toast";
import { UseFollowUser } from "@/api/UserApi";

interface Props {
  notificationData: NotificationProps;
}

const NotificationCard = ({ notificationData }: Props) => {
  const queryClient = useQueryClient();
  const { currentUser } = UseAppContext();
  const { toast } = useToast();

  const { mutate } = useMutation({
    mutationKey: ["user"],
    mutationFn: UseFollowUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["post-byfollowing"] });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Follow: failed!",
        description: "An error occurred during follow.",
      });
    },
  });

  const handleFollow = () => {
    mutate(notificationData?.sender?._id.toString());
  };

  return (
    <div className="mx-auto flex max-w-xl items-center justify-between rounded-lg bg-black text-white shadow-lg">
      <Link
        to={`/@${notificationData?.sender?.username}/post/${notificationData?.post}`}
        className="flex items-center"
      >
        <div className="relative">
          {!notificationData.read && (
            <div className="absolute left-[-10px] top-1/2 h-1 w-1 -translate-y-1/2 transform rounded-full bg-blue-400"></div>
          )}
          <img
            src={notificationData?.sender?.profile_picture}
            alt={`${notificationData?.sender?.username}'s avatar`}
            className="mr-4 h-10 w-10 rounded-full object-cover"
          />
        </div>
        <div className="text-base">
          <p>
            <HoverCard>
              <HoverCardTrigger>
                <Link to={`/profile/@${notificationData?.sender?.username}`}>
                  <strong className="mr-2 hover:underline">
                    {notificationData?.sender?.username}
                  </strong>
                </Link>
              </HoverCardTrigger>
              <HoverCardContent className="border-white/50 bg-black text-white">
                <ProfileHover user={notificationData?.sender} />
              </HoverCardContent>
            </HoverCard>
            has loved your post
          </p>
          <span className="cursor-pointer text-sm text-white/50">
            click this to see which post
          </span>
        </div>
      </Link>
      <Button
        onClick={handleFollow}
        variant="ghost"
        className="rounded-md border border-white px-4 py-2 text-white transition hover:bg-white hover:text-black"
      >
        {currentUser?._id === notificationData?.sender?._id
          ? null
          : currentUser?.following?.includes(notificationData?.sender?._id)
            ? "UnFollow"
            : "Follow"}
      </Button>
    </div>
  );
};

export default NotificationCard;
