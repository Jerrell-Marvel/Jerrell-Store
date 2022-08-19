import { useState, useEffect } from "react";
import axios, { AxiosRequestHeaders } from "axios";

export type useFetchParameters = {
  url: string;
  headers?: AxiosRequestHeaders;
  pageNumber?: number;
};
export type ApiResponse<T> = {
  data: T;
};

export function useFetch<T>({ url, headers, pageNumber }: useFetchParameters): [T | undefined, boolean, any] {
  const [ApiResponse, setApiResponse] = useState<T | undefined>(undefined);
  const [initialLoading, setInitialLoading] = useState(false);
  const [error, setError] = useState({ success: true });
  // const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setInitialLoading(true);
      setError({ success: true });
      // setHasMore(false);
      console.log("use fetch called");
      try {
        const response = await axios.get(url, { headers });

        const data: T = response.data;
        //@ts-ignore
        // console.log(data.products);

        // if (typeof ApiResponse !== "undefined") {
        //   // @ts-ignore
        //   setApiResponse({ success: true, products: [...ApiResponse.products, data.products] });
        // }

        setApiResponse(data);

        setInitialLoading(false);
      } catch (error: any) {
        setError(error);
        console.log(error);
      }
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, pageNumber]);
  return [ApiResponse, initialLoading, error];
}
