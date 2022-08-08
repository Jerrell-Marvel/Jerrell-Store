import { useState, useEffect } from "react";
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
  const [error, setError] = useState({ success: true });
  const [sendRequest, setSendRequest] = useState(false);

  useEffect(() => {
    console.log("use post called");

    if (sendRequest) {
      const getData = async () => {
        setLoading(true);
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
      setError({ success: true });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sendRequest]);

  return [ApiResponse, loading, error, sendRequest, setSendRequest];
}
