"use client";

import { AccountResType } from "@/schemaValidations/account.schema";
import { FCC } from "@/types/react";
import { createContext, useContext, useState } from "react";

type User = AccountResType["data"];

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

interface AppProviderProps {
  user: User | null;
}

const AppContext = createContext<AppContextType>({
  user: null,
  setUser: () => {},
});

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
};

const AppProvider: FCC<AppProviderProps> = (props) => {
  const { children, user: initialUser } = props;
  const [user, setUser] = useState<User | null>(initialUser);

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
