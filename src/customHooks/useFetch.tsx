import { useState, useEffect } from "react";

type ApiResponseData = {
  id: number;
  title: string;
  url: string;
  imageUrl: string;
  newsSite: string;
  summary: string;
  publishedAt: string;
  updatedAt: string;
  featured: boolean;
  launches: [];
  events: [];
};
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

type cobaCoba = {
  name: string;
  age: number;
};

export function useFetch<T>({ url, category = "", id = "", title }: useFetchParameters): ApiResponse<T> | undefined {
  const [ApiResponse, setApiResponse] = useState<ApiResponse<T> | undefined>(undefined);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`${url}${category}${id}`);

        const data: T = await response.json();
        setApiResponse({
          data: data,
          loading: false,
        });
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, [url, category, id]);
  return ApiResponse;
}
