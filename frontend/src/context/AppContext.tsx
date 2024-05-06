import React from "react";
import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { User } from "@/models/User";
import { Post } from "@/models/Post";
import { GetPostByFollowing, UseGetSuggestContent } from "@/api/PostApi";
import { UseGetUserPostSaved } from "@/api/SavedPostApi";
import { PostSavedProps } from "@/models/PostSaved";
import { UseGetUser } from "@/api/UserApi";

interface AppContextType {
  isLoggedIn: boolean;
  currentUser: User;
  postContentIsLoading: boolean;
  postContentDatas: Post[];
  postContentDatasByFollowing: Post[];
  postContentDatasByFollowingLoading: boolean;
  savePostDatas: PostSavedProps[];
  savePostDatasLoading: boolean;
}

interface AppContextProviderProps {
  children: React.ReactNode;
}

const AppContext = createContext<AppContextType>({
  isLoggedIn: false,
  postContentIsLoading: false,
  currentUser: {} as User,
  postContentDatas: [] as Post[],
  postContentDatasByFollowing: [] as Post[],
  postContentDatasByFollowingLoading: true,
  savePostDatas: [] as PostSavedProps[],
  savePostDatasLoading: true,
});

export const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
}) => {
  const { data: currentUser } = useQuery({
    queryKey: ["user"],
    queryFn: UseGetUser,
  });

  const { data: postContentDatas, isLoading: postContentIsLoading } = useQuery({
    queryKey: ["post"],
    queryFn: UseGetSuggestContent,
  });

  const {
    data: postContentDatasByFollowing,
    isLoading: postContentDatasByFollowingLoading,
  } = useQuery({
    queryKey: ["post-byfollowing"],
    queryFn: GetPostByFollowing,
  });

  const { data: savePostDatas, isLoading: savePostDatasLoading } = useQuery({
    queryKey: ["save-post", currentUser?._id],
    queryFn: () => UseGetUserPostSaved(currentUser?._id),
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
