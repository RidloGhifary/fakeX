import React from "react";
import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { User } from "@/models/User";
import { Post } from "@/models/Post";
import { GetPostByFollowing, UseGetSuggestContent } from "@/api/PostApi";
import { UseGetUserPostSaved } from "@/api/SavedPostApi";
import { PostSavedProps } from "@/models/PostSaved";
import { UseGetUser } from "@/api/UserApi";
import { GetPostByUserLiked } from "@/api/LikedPostApi";
import { LikedPostProps } from "../models/LikedPost";

interface AppContextType {
  isLoggedIn: boolean;
  currentUser: User;
  postContentIsLoading: boolean;
  postContentDatas: Post[];
  postContentDatasByFollowing: Post[];
  postContentDatasByFollowingLoading: boolean;
  savePostDatas: PostSavedProps[];
  savePostDatasLoading: boolean;
  likedPostDatas: LikedPostProps[];
  likedPostDatasLoading: boolean;
}

interface AppContextProviderProps {
  children: React.ReactNode;
}

const AppContext = createContext<AppContextType>({
  isLoggedIn: false,
  postContentIsLoading: true,
  currentUser: {} as User,
  postContentDatas: [] as Post[],
  postContentDatasByFollowing: [] as Post[],
  postContentDatasByFollowingLoading: true,
  savePostDatas: [] as PostSavedProps[],
  savePostDatasLoading: true,
  likedPostDatas: [] as LikedPostProps[],
  likedPostDatasLoading: true,
});

export const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
}) => {
  const { data: currentUser } = useQuery({
    queryKey: ["user"],
    queryFn: UseGetUser,
    retry: false,
  });

  const { data: postContentDatas, isLoading: postContentIsLoading } = useQuery({
    queryKey: ["post"],
    queryFn: () =>
      currentUser ? UseGetSuggestContent() : Promise.resolve(null),
    enabled: Boolean(currentUser),
    retry: false,
  });

  const {
    data: postContentDatasByFollowing,
    isLoading: postContentDatasByFollowingLoading,
  } = useQuery({
    queryKey: ["post-byfollowing"],
    queryFn: () => (currentUser ? GetPostByFollowing() : Promise.resolve(null)),
    enabled: Boolean(currentUser),
    retry: false,
  });

  const { data: savePostDatas, isLoading: savePostDatasLoading } = useQuery({
    queryKey: ["save-post", currentUser?._id],
    queryFn: () =>
      currentUser
        ? UseGetUserPostSaved(currentUser?._id)
        : Promise.resolve(null),
    enabled: Boolean(currentUser),
    retry: false,
  });

  const { data: likedPostDatas, isLoading: likedPostDatasLoading } = useQuery({
    queryKey: ["liked-post", currentUser?._id],
    queryFn: () =>
      currentUser
        ? GetPostByUserLiked(currentUser?._id)
        : Promise.resolve(null),
    enabled: Boolean(currentUser),
    retry: false,
  });

  return (
    <AppContext.Provider
      value={{
        isLoggedIn: Boolean(currentUser),
        currentUser,
        postContentDatas,
        postContentIsLoading,
        postContentDatasByFollowing,
        postContentDatasByFollowingLoading,
        savePostDatas,
        savePostDatasLoading,
        likedPostDatas,
        likedPostDatasLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const UseAppContext = () => {
  const context = useContext(AppContext);
  return context;
};
