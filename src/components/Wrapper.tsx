import { ReactChild, ReactNode } from "react";
import { useQueryClient } from "react-query";
import { useFetch } from "../customHooks/useFetch2";
export type UserApiResponseType = {
  username: string;
  cartCount: number;
};

export default function Wrapper({ children }: { children: ReactNode }) {
  const { data, isLoading, error, isError } = useFetch<UserApiResponseType>({
    url: "/api/v1/auth/profile",
    queryKey: ["profile"],
  });
  return <div>{children}</div>;
}
