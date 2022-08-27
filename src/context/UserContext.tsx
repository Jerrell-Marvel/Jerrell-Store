import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { useFetch } from "../customHooks/useFetch2";

const UserContext = createContext<UserContextValue>({} as UserContextValue);

export const useUserContext = () => {
  return useContext(UserContext);
};

export type UserApiResponseType = {
  username: string;
  cartCount: number;
};

type UserContextValue = {
  user: UserApiResponseType | undefined;
  setUser: React.Dispatch<React.SetStateAction<UserApiResponseType | undefined>>;
  isLoading: boolean;
  error: any;
};

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserApiResponseType | undefined>(undefined);

  const { data, isLoading, error, isError } = useFetch<UserApiResponseType>({
    url: "/api/v1/auth/profile",
    queryKey: ["profile"],
  });

  useEffect(() => {
    if (typeof data !== "undefined") {
      setUser(data);
    }
  }, [data]);

  return <UserContext.Provider value={{ user, setUser, isLoading, error }}>{children}</UserContext.Provider>;
}
