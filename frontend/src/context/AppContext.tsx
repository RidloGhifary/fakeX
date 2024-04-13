import React, { ReactNode } from "react";
import { UseValidateToken } from "@/api/AuthApi";
import { createContext, useContext } from "react";
import { useQuery } from "react-query";

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
  const { isError } = useQuery("ValidateToken", UseValidateToken, {
    retry: false,
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
