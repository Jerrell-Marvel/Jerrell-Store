import { useFetch } from "./customHooks/useFetch2";
type UserApiResponseType = {
  username: string;
  cartCount: number;
};

export default function TestComponent() {
  // const { data, isLoading, error, isError } = useFetch<UserApiResponseType>({
  //   url: "/api/v1/auth/profile",
  //   queryKey: ["profile2"],
  // });
  return <div></div>;
}
