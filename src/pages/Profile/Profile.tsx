import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../customHooks/useFetch2";

type UserType = {
  username: string;
  cartCount: number;
};
export default function Profile() {
  const [user, setUser] = useState<UserType | null>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading, error, isError } = useFetch<UserType>({
    url: "/api/v1/auth/profile",
    queryKey: ["profile"],
  });

  // useEffect(() => {
  //   const getUser = async () => {
  //     // await queryClient.invalidateQueries<UserType>(["profile"]);
  //     // if (!userData) {
  //     //   console.log("not login yet");
  //     // } else {
  //     //   // setUser(userData);
  //     // }
  //     // let userData = queryClient.getQueryData<UserType>(["profile"]);

  //     // if (!userData) {
  //     //   await queryClient.prefetchQuery<UserType>(["profile"]);

  //     //   const userData = queryClient.getQueryData<UserType>(["profile"]);
  //     //   console.log(userData);
  //     // } else {
  //     //   // setUser(userData);
  //     // }

  //     // await queryClient.refetchQueries<UserType>(["profile"]);

  //     let userData = queryClient.getQueryData<UserType>(["profile"]);
  //     console.log(userData);
  //     if (!userData) {
  //       await queryClient.refetchQueries<UserType>(["profile"]);
  //       userData = queryClient.getQueryData<UserType>(["profile"]);
  //       // navigate("/login");
  //     } else {
  //       setUser(userData);
  //     }
  //   };

  //   getUser();
  // }, []);
  return (
    <div className="pt-28 pb-8">
      <div className="mx-auto flex w-full flex-col items-center rounded-lg bg-white p-8 shadow-xl md:w-[576px]">
        <div className="h-20 w-20 rounded-full bg-slate-200"></div>

        <h1 className="my-4 text-3xl font-medium">{data?.username}</h1>
      </div>
    </div>
  );
}
