import { useState, useEffect } from "react";

export type useFetchParameters = {
  url: string;
  category?: string;
  id?: string;
  title: string;
};

export type ApiResponse = {
  data: { id: number; title: string; url: string; imageUrl: string; newsSite: string; summary: string; publishedAt: string; updatedAt: string; featured: boolean; launches: []; events: [] }[];
  loading: boolean;
};
export function useFetch({ url, category = "", id = "", title }: useFetchParameters) {
  const [ApiResponse, setApiResponse] = useState<ApiResponse | undefined>(undefined);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`${url}${category}${id}`);
        const data: [] = await response.json();
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
