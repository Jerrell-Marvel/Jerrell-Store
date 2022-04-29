import { useState, useEffect } from "react";

export type useFetchParameters = {
  url: string;
  category?: string;
  id?: string;
  title?: string;
};
export type ApiResponse<T> = {
  data: T;
  loading: boolean;
};

export function useFetch<T>({
  url,
  category = "",
  id = "",
  title,
}: useFetchParameters): [ApiResponse<T> | undefined, boolean] {
  const [ApiResponse, setApiResponse] = useState<ApiResponse<T> | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`${url}${category}${id}`);

        const data: T = await response.json();
        setApiResponse({
          data: data,
          loading: false,
        });
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, [url, category, id]);
  return [ApiResponse, loading];
}
