import { useState, useEffect } from "react";
import axios from "axios";

export type useFetchParameters = {
  url: string;
};
export type ApiResponse<T> = {
  data: T;
};

export function useFetch<T>({ url }: useFetchParameters): [T | undefined, boolean, any] {
  const [ApiResponse, setApiResponse] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({ success: true });

  useEffect(() => {
    const getData = async () => {
      console.log("called");
      try {
        const response = await axios.get(url);

        const data: T = response.data;

        setApiResponse(data);
        setLoading(false);
      } catch (error: any) {
        setError(error);
        console.log(error);
      }
    };
    getData();
  }, [url]);
  return [ApiResponse, loading, error];
}
