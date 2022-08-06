import { useState } from "react";
import axios, { AxiosRequestHeaders } from "axios";

type UseApiProps = {
  url: string;
  body: object;
  headers?: AxiosRequestHeaders;
  method: "post" | "put" | "delete";
};

export default function useApi<T>({ url, body, headers, method }: UseApiProps): [T | undefined, boolean, any, (itemId?: string) => void] {
  const [ApiResponse, setApiResponse] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ success: true });

  const getData = async (itemId?: string) => {
    console.log("use api called");
    setLoading(true);
    setApiResponse(undefined);
    setError({ success: true });
    try {
      let response;
      if (method === "delete") {
        response = await axios.delete(`${url}/${itemId}`, {
          headers,
          data: body,
        });
      } else {
        response = await axios[method](url, body, {
          headers,
        });
      }

      const data: T = response.data;

      setApiResponse(data);
    } catch (err: any) {
      console.log(err);
      setApiResponse(undefined);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return [ApiResponse, loading, error, getData];
}
