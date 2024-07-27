"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { UNIQUE_KEY } from "@/constants/users";

export interface User {
  firstName: string;
  lastName: string;
  username: string;
  uniqueKey: string;
  avatar: string;
}

interface GlobalContextProps {
  user: any;
  setUser: (user: any) => void;
}

const GlobalContext = createContext<GlobalContextProps>({
  user: null,
  setUser: (user) => {},
});

export const useGlobalContext = () => useContext(GlobalContext);

interface GlobalProviderProps {
  children: ReactNode;
}

const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  async function checkLogin() {
    try {
      const localStorageUser = localStorage.getItem("ourJourneyUser");

      if (!localStorageUser) {
        router.push("/");
        return;
      }

      const userDetails = JSON.parse(localStorageUser);
      const isValidSession = userDetails.uniqueKey === UNIQUE_KEY;

      if (!isValidSession) {
        router.push("/");
        return;
      }

      if (userDetails) {
        setUser(userDetails);
        return;
      }

      router.push("/");
      return;
    } catch (error) {
      console.log({ error });
      router.push("/");
      return;
    }
  }

  useEffect(() => {
    checkLogin();
  }, []);

  return <GlobalContext.Provider value={{ user, setUser }}>{children}</GlobalContext.Provider>;
};

export default GlobalProvider;
