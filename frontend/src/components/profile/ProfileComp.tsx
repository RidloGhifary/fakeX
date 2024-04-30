import React, { useState } from "react";
import { UseAppContext } from "@/context/AppContext";
import User from "../../assets/user.png";
import { Separator } from "../ui/separator";
import { BadgeCheck, Info, PencilLine, RotateCw } from "lucide-react";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UseUpdateProfile } from "@/api/UserApi";
import { UserPost } from "@/models/Post";
import LazyLoadedComponent from "../LazyLoadedComponent";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const UserContent = React.lazy(() => import("./UserContent"));
const PostContentSkeleton = React.lazy(
  () => import("../skeleton/PostContentSkeleton"),
);

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

  const { data: userPosts, isPending: userPostsPending } = useQuery({
    queryKey: ["user-post"],
    queryFn: async () => {
      const response = await makeRequest.get(`/post/${username?.slice(1)}`);
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
        description: "An error occurred during following.",
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

  const FormSchema = z.object({
    username: z.string().min(1, {
      message: "Username must be at least 1 characters.",
    }),
    displayName: z.string().min(1, {
      message: "Display name must be at least 1 characters.",
    }),
    bio: z
      .string()
      .min(1, {
        message: "Bio must be at least 1 characters.",
      })
      .max(50, {
        message: "Bio must be no more than 50 characters.",
      }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: user?.username || "",
      displayName: user?.displayName || "",
      bio: user?.bio || "",
    },
  });

  const { mutate: updateProfileMutate, isPending: updateProfilePending } =
    useMutation({
      mutationKey: ["update-profile"],
      mutationFn: UseUpdateProfile,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["user"] });
        queryClient.invalidateQueries({ queryKey: ["post"] });
        queryClient.invalidateQueries({
          queryKey: ["post-byfollowing"],
        });
        queryClient.invalidateQueries({
          queryKey: ["post-detail"],
        });
        queryClient.invalidateQueries({
          queryKey: ["save-post"],
        });
        queryClient.invalidateQueries({
          queryKey: ["search-post"],
        });
        toast({
          title: "Update: Success!",
          description: "Successfully updating your profile.",
        });
      },
      onError: (err) => {
        console.log("🚀 ~ ProfileComp ~ err:", err);
        toast({
          variant: "destructive",
          title: "Update: failed!",
          description: "An error occurred during updating.",
        });
      },
    });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    updateProfileMutate({
      username: data.username || user?.username,
      displayName: data.displayName || user?.displayName,
      bio: data.bio || user?.bio,
      profile_picture: uploadedImage || user.profile_picture,
      userId: user?._id,
    });
  }

  if (isPending || userPostsPending) return <p>Loading...</p>;

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
        <p className="font-medium text-white/50">{user?.displayName}</p>
        <p className="w-[50%]">{user?.bio}</p>

        <div className="my-7 flex items-center gap-4">
          <p className="text-sm font-medium">
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
                <div className="grid gap-5 py-4">
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
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="w-full space-y-3"
                    >
                      <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-1 text-gray-500 transition hover:text-white">
                              <span>Username</span>
                              <HoverCard>
                                <HoverCardTrigger asChild>
                                  <Info size={18} className="cursor-pointer" />
                                </HoverCardTrigger>
                                <HoverCardContent className="w-80">
                                  <p>
                                    Username can only contain letters, numbers,
                                    and underscore (_) characters and cannot
                                    contain spaces or it will cause an
                                    <b> error</b>
                                  </p>
                                </HoverCardContent>
                              </HoverCard>
                            </FormLabel>
                            <FormControl>
                              <div className="grid items-center gap-4">
                                <Input
                                  placeholder="User username"
                                  min={1}
                                  max={50}
                                  disabled={
                                    updateProfilePending || uploadImageLoading
                                  }
                                  {...field}
                                  defaultValue={user?.username}
                                  className="col-span-3 border-white/50 bg-transparent"
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="displayName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-1 text-gray-500 transition hover:text-white">
                              <span>Display name</span>
                              <HoverCard>
                                <HoverCardTrigger asChild>
                                  <Info size={18} className="cursor-pointer" />
                                </HoverCardTrigger>
                                <HoverCardContent className="w-80">
                                  <p>
                                    Display name can only contain letters,
                                    numbers, and spaces or it will cause an
                                    <b> error</b>
                                  </p>
                                </HoverCardContent>
                              </HoverCard>
                            </FormLabel>
                            <FormControl>
                              <div className="grid items-center gap-4">
                                <Input
                                  placeholder="User display name"
                                  min={1}
                                  max={50}
                                  disabled={
                                    updateProfilePending || uploadImageLoading
                                  }
                                  {...field}
                                  defaultValue={user?.displayName}
                                  className="col-span-3 border-white/50 bg-transparent"
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-1 text-gray-500 transition hover:text-white">
                              <span>User bio</span>
                              <HoverCard>
                                <HoverCardTrigger asChild>
                                  <Info size={18} className="cursor-pointer" />
                                </HoverCardTrigger>
                                <HoverCardContent className="w-80">
                                  <p>
                                    Bio cannot more than 100 character or it
                                    will cause an
                                    <b> error</b>
                                  </p>
                                </HoverCardContent>
                              </HoverCard>
                            </FormLabel>
                            <FormControl>
                              <div className="grid items-center gap-4">
                                <Input
                                  placeholder="User bio"
                                  disabled={
                                    updateProfilePending || uploadImageLoading
                                  }
                                  min={1}
                                  max={100}
                                  defaultValue={user?.bio}
                                  {...field}
                                  className="col-span-3 border-white/50 bg-transparent"
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <DialogFooter>
                        <Button
                          disabled={uploadImageLoading || updateProfilePending}
                          className="bg-white text-black transition hover:scale-105 hover:bg-white hover:text-black"
                          type="submit"
                        >
                          Submit
                        </Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </div>
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
        <React.Suspense fallback={<PostContentSkeleton />}>
          {userPosts?.map((userPost: UserPost, i: number) => (
            <LazyLoadedComponent key={i}>
              <Separator className="my-6 border-[.2px] border-gray-800" />
              <UserContent
                userPost={userPost}
                userPostLoading={userPostsPending}
              />
            </LazyLoadedComponent>
          ))}
        </React.Suspense>
      </section>
    </section>
  );
};

export default ProfileComp;
