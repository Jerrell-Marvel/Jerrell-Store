import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { useFetch } from "../customHooks/useFetch";

const UserContext = createContext<UserContextValue>({} as UserContextValue);

export const useUserContext = () => {
  return useContext(UserContext);
};

type UserApiResponseType = {
  username: string;
  cartCount: number;
};

type UserContextValue = {
  user: UserApiResponseType | undefined;
  setUser: React.Dispatch<React.SetStateAction<UserApiResponseType | undefined>>;
  loading: boolean;
  error: any;
};

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserApiResponseType | undefined>(undefined);

  const [response, loading, error] = useFetch<UserApiResponseType>({
    url: "/api/v1/auth/profile",
  });

  useEffect(() => {
    if (typeof response !== "undefined") {
      setUser(response);
    }
  }, [response]);

  return <UserContext.Provider value={{ user, setUser, loading, error }}>{children}</UserContext.Provider>;
}
