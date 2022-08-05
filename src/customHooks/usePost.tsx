import { useState, useEffect, useRef } from "react";
import axios, { AxiosRequestHeaders } from "axios";

type usePostProps = {
  url: string;
  body: object;
  headers?: AxiosRequestHeaders;
  method: "post" | "put" | "delete";
};

export default function usePost<T>({ url, body, headers, method }: usePostProps): [T | undefined, boolean, any, boolean, React.Dispatch<React.SetStateAction<boolean>>] {
  const [ApiResponse, setApiResponse] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any | undefined>(undefined);
  const [sendRequest, setSendRequest] = useState(false);

  useEffect(() => {
    console.log("use post called");

    if (sendRequest) {
      const getData = async () => {
        try {
          let response;
          if (method === "delete") {
            response = await axios.delete(url, {
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
          setLoading(false);
          setSendRequest(false);
          setError(undefined);
        } catch (err: any) {
          console.log(err);
          setApiResponse(undefined);
          setSendRequest(false);
          setLoading(false);
          setError(err);
        }
      };
      getData();
      setLoading(true);
    } else {
      setApiResponse(undefined);
      setSendRequest(false);
      setLoading(false);
      setError(undefined);
    }
  }, [sendRequest]);

  return [ApiResponse, loading, error, sendRequest, setSendRequest];
}
