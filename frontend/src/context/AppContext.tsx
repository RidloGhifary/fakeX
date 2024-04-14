import React, { ReactNode } from "react";
// import { UseValidateToken } from "@/api/AuthApi";
import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

interface AppContextType {
  isLoggedIn: boolean;
}

interface AppContextProviderProps {
  children: ReactNode;
}

const AppContext = createContext<AppContextType>({ isLoggedIn: false });

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

  return (
    <AppContext.Provider value={{ isLoggedIn: !isError }}>
      {children}
    </AppContext.Provider>
  );
};

export const UseAppContext = () => {
  const context = useContext(AppContext);
  return context;
};
