
import axios, { AxiosRequestHeaders } from "axios";
import { useQuery, UseQueryOptions } from "react-query";

export type useFetchParameters<T> = {
  url: string;
  headers?: AxiosRequestHeaders;
  pageNumber?: number;
  queryKey: any[];
  options?: UseQueryOptions<T, any>;
};
export type ApiResponse<T> = {
  data: T;
};

export function useFetch<T>({ url, headers = {}, pageNumber, queryKey, options }: useFetchParameters<T>) {
  // const [hasMore, setHasMore] = useState(true);

  return useQuery<T, any>(
    queryKey,
    async () => {
      const response = await axios.get(url, { headers });
      const data: T = response.data;

      return data;
    },
    { ...options, retry: false, refetchOnWindowFocus: false }
  );

  // useEffect(() => {
  //   const getData = async () => {
  //     setInitialLoading(true);
  //     setError({ success: true });
  //     // setHasMore(false);
  //     console.log("use fetch called");
  //     try {
  //       const response = await axios.get(url, { headers });

  //       const data: T = response.data;
  //       //@ts-ignore
  //       // console.log(data.products);

  //       // if (typeof ApiResponse !== "undefined") {
  //       //   // @ts-ignore
  //       //   setApiResponse({ success: true, products: [...ApiResponse.products, data.products] });
  //       // }

  //       setApiResponse(data);

  //       setInitialLoading(false);
  //     } catch (error: any) {
  //       setError(error);
  //       console.log(error);
  //     }
  //   };
  //   getData();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [url, pageNumber]);
  // return [ApiResponse, initialLoading, error];
}
