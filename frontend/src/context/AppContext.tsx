import React, { ReactNode } from "react";
import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { makeRequest } from "@/utils/axios";
import { User } from "@/models/User";

const BASE_URL = import.meta.env.VITE_API_URL;

interface AppContextType {
  isLoggedIn: boolean;
  currentUser: User;
}

interface AppContextProviderProps {
  children: ReactNode;
}

const AppContext = createContext<AppContextType>({
  isLoggedIn: false,
  currentUser: {} as User,
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
  });

  const { data: currentUser } = useQuery({
    queryKey: ["user", isError],
    queryFn: async () => {
      const response = await makeRequest.get(`${BASE_URL}/api/user`);

      return response.data;
    },
  });

  return (
    <AppContext.Provider value={{ isLoggedIn: !isError, currentUser }}>
      {children}
    </AppContext.Provider>
  );
};

export const UseAppContext = () => {
  const context = useContext(AppContext);
  return context;
};
