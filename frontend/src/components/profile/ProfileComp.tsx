import React, { useState } from "react";
import { UseAppContext } from "@/context/AppContext";
import User from "../../assets/user.png";
import { Separator } from "../ui/separator";
import UserContent from "./UserContent";
import { BadgeCheck, PencilLine, RotateCw } from "lucide-react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "@/utils/axios";
import { useToast } from "../ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "@/utils/firebase";

const ProfileComp = () => {
  const [uploadedImage, setUploadedImage] = useState<string>("");
  const [uploadImageLoading, setUploadImageLoading] = useState<boolean>(false);

  const queryClient = useQueryClient();
  const { currentUser } = UseAppContext();
  const { username } = useParams();
  const { toast } = useToast();

  const domain = window.location.hostname;
  const port = window.location.port ? `:${window.location.port}` : "";

  const { data: user, isPending } = useQuery({
    queryKey: ["user", username],
    queryFn: async () => {
      const response = await makeRequest.get(`/user/${username?.slice(1)}`);
      return response.data;
    },
  });

  const { mutate } = useMutation({
    mutationKey: ["user"],
    mutationFn: async () => {
      const response = await makeRequest.post(
        `/user/follow/${user?._id.toString()}`,
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
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
    try {
      mutate();
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Follow: failed!",
        description: "An error occurred during follow.",
      });
    }
  };

  const handelShareLink = () => {
    const profileUrl = `http://${domain}${port}/profile/@${user?.username}`;

    navigator.clipboard
      .writeText(`${profileUrl}`)
      .then(() => {
        toast({
          title: "Success copied.",
          description: "URL has been copied.",
        });
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Failed.",
          description: "Failed copied URL.",
        });
      });
  };

  const storeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const storage = getStorage(app);
    const metadata = {
      contentType: "image/jpeg",
    };

    return new Promise((resolve, reject) => {
      setUploadImageLoading(false);
      if (file) {
        const fileName = new Date().getTime() + file?.name;
        const storageRef = ref(storage, "images/" + fileName);
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadImageLoading(true);
            console.log("Upload is " + progress + "% done");
          },
          (error) => {
            reject(error);
            toast({
              variant: "destructive",
              title: "Uh oh! Something went wrong.",
              description: "There was a problem while uploading image",
            });
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
              (downloadURL: string) => {
                setUploadImageLoading(false);
                resolve(downloadURL);
                setUploadedImage(downloadURL);
              },
            );
          },
        );
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem while uploading image",
        });
      }
    });
  };

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
          loading="lazy"
        />
      </section>
      <section className="font-light">
        <p className="font-medium text-white/50">Ridlo achmad ghifary</p>
        <p>{user?.bio}</p>

        <div className="my-7 flex items-center gap-4">
          <div className="relative flex items-center">
            {user?.followers.length === 0 ? null : user?.followers.length ===
              1 ? (
              <img
                src={User}
                alt="user-photo"
                className="h-[20px] w-[20px] rounded-full object-cover"
                loading="lazy"
              />
            ) : (
              <>
                <img
                  src={User}
                  alt="user-photo"
                  className="h-[20px] w-[20px] rounded-full object-cover"
                  loading="lazy"
                />
                <img
                  src={User}
                  alt="user-photo"
                  className="absolute left-[50%] h-[20px] w-[20px] rounded-full object-cover"
                  loading="lazy"
                />
              </>
            )}
          </div>
          <p className="text-sm font-medium text-white/50">
            {user?.followers.length +
              `${user?.followers.length > 1 ? " followers" : " follower"}`}
          </p>
        </div>

        <div className="flex items-center justify-center gap-4">
          {currentUser._id !== user?._id && (
            <Button
              className="w-[50%] bg-white/10 transition hover:scale-105 hover:bg-white/10"
              onClick={handleFollow}
            >
              {currentUser.following.includes(user?._id)
                ? "UnFollow"
                : "Follow"}
            </Button>
          )}
          {currentUser._id === user?._id && (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-[50%] bg-white/10 transition hover:scale-105 hover:bg-white/10">
                  Edit profile
                </Button>
              </DialogTrigger>
              <DialogContent className="border-white/50 bg-black text-white sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="text-center">
                    Edit profile
                  </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="mx-auto">
                    <input
                      type="file"
                      name="profile_picture"
                      id="profile_picture"
                      className="hidden"
                      disabled={uploadImageLoading}
                      accept="image/jpeg, image/png"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        storeImage(e)
                      }
                    />
                    <label
                      htmlFor="profile_picture"
                      className="group relative cursor-pointer"
                    >
                      <img
                        src={uploadedImage || user?.profile_picture || User}
                        alt="user-photo"
                        className="h-[120px] w-[120px] rounded-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute left-[50%] top-0 flex h-full w-full translate-x-[-50%] items-center justify-center rounded-full group-hover:bg-black/30">
                        {uploadImageLoading ? (
                          <RotateCw className="mr-2 h-4 w-4 animate-spin text-white" />
                        ) : (
                          <PencilLine className="text-white/50 group-hover:text-white" />
                        )}
                      </div>
                    </label>
                  </div>
                  <div className="grid items-center gap-4">
                    <Input
                      id="username"
                      value={user?.username || ""}
                      className="col-span-3 border-white/50 bg-transparent"
                    />
                  </div>
                  <div className="grid items-center gap-4">
                    <Input
                      id="username"
                      value={user?.bio || ""}
                      min={1}
                      max={50}
                      className="col-span-3 border-white/50 bg-transparent"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    disabled={uploadImageLoading}
                    className="bg-white text-black transition hover:scale-105 hover:bg-white hover:text-black"
                  >
                    Save changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
          <Button
            className="w-[50%] bg-white/10 transition hover:scale-105 hover:bg-white/10"
            onClick={handelShareLink}
          >
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
