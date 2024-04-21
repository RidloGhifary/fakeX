import React from "react";
import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { makeRequest } from "@/utils/axios";
import { User } from "@/models/User";
import { Post } from "@/models/Post";
import { UseGetSuggestContent } from "@/api/PostApi";

const BASE_URL = import.meta.env.VITE_API_URL;

interface AppContextType {
  isLoggedIn: boolean;
  currentUser: User;
  postContentIsLoading: boolean;
  postContentDatas: Post[];
  postDetail: Post;
  postDetailIsLoading: boolean;
}

interface AppContextProviderProps {
  children: React.ReactNode;
}

const AppContext = createContext<AppContextType>({
  isLoggedIn: false,
  postContentIsLoading: false,
  currentUser: {} as User,
  postContentDatas: [] as Post[],
  postDetail: {} as Post,
  postDetailIsLoading: true,
});

export const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
}) => {
  const { isError } = useQuery({
    queryKey: ["validate"],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/api/auth/validate-token`, {
        withCredentials: true,
      });

      return response;
    },
    _optimisticResults: "optimistic",
  });

  const { data: currentUser } = useQuery({
    queryKey: ["user", isError],
    queryFn: async () => {
      const response = await makeRequest.get(`${BASE_URL}/api/user`);

      return response.data;
    },
  });

  const { data: postContentDatas, isLoading: postContentIsLoading } = useQuery({
    queryKey: ["post"],
    queryFn: async () => await UseGetSuggestContent(),
  });

  const { data: postDetail, isLoading: postDetailIsLoading } = useQuery({
    queryKey: ["post-detail"],
    queryFn: async ({ queryKey }) => {
      const postId = queryKey[1];
      const response = await makeRequest.get(`/post/${postId}`);
      return response.data;
    },
  });
  return (
    <AppContext.Provider
      value={{
        isLoggedIn: !isError,
        currentUser,
        postContentDatas,
        postContentIsLoading,
        postDetail,
        postDetailIsLoading,
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
