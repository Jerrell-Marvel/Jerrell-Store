import { useState, useEffect } from "react";

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
      try {
        const response = await fetch(`${url}`);

        if (!response.ok) {
          throw await response.json();
        }

        const data: T = await response.json();

        setApiResponse(data);
        setLoading(false);
      } catch (error: any) {
        setError(error);
      }
    };

    getData();
  }, [url]);
  return [ApiResponse, loading, error];
}
