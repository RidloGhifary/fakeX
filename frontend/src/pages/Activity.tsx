import { UpdateReadStatus } from "@/api/Notification";
import { Separator } from "@/components/ui/separator";
import { UseAppContext } from "@/context/AppContext";
import { socket } from "@/utils/socket";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useLocation } from "react-router-dom";

const NotificationCard = React.lazy(
  () => import("@/components/NotificationCard"),
);

const Activity = () => {
  const { userNotificationDatas, userNotificationDatasLoading, currentUser } =
    UseAppContext();
  const queryClient = useQueryClient();
  const { pathname } = useLocation();
  const activityUrl = pathname.split("/")[1];

  React.useEffect(() => {
    if (currentUser) {
      socket.emit("join", currentUser?._id);

      socket.on("love-notification", () => {
        queryClient.invalidateQueries({
          queryKey: ["user-notification", currentUser._id],
        });
      });

      return () => {
        socket.off("love-notification");
      };
    }
  }, [socket, currentUser]);

  const sortedNotifications = (userNotificationDatas || [])
    ?.slice()
    .sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB.getTime() - dateA.getTime();
    });

  const { mutate: updateReadStatusNotificationMutate } = useMutation({
    mutationKey: ["update-read-status"],
    mutationFn: UpdateReadStatus,
    onError: () => {
      alert("Something went wrong");
    },
  });

  React.useEffect(() => {
    if (currentUser && activityUrl === "activity") {
      setTimeout(() => {
        updateReadStatusNotificationMutate();
        queryClient.invalidateQueries({ queryKey: ["user-notification"] });
      }, 1000);
    }
  }, [activityUrl, currentUser]);

  return (
    <React.Fragment>
      <div className="mx-auto max-w-[600px] px-3 pb-56 pt-6 md:px-0 md:py-20">
        {userNotificationDatas.length === 0 && (
          <p className="text-center">You will get your notification here</p>
        )}
        {userNotificationDatasLoading && (
          <p className="text-center">Loading...</p>
        )}
        <React.Suspense fallback={<p>Loading...</p>}>
          {sortedNotifications &&
            sortedNotifications.map((data, index) => (
              <div key={index}>
                <NotificationCard notificationData={data} />
                {index !== userNotificationDatas.length - 1 && (
                  <Separator className="my-6 border-[.2px] border-gray-800" />
                )}
              </div>
            ))}
        </React.Suspense>
      </div>
    </React.Fragment>
  );
};

export default Activity;
