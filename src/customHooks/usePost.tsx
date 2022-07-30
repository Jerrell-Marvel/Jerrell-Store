import { useState, useEffect } from "react";
import axios, { AxiosRequestHeaders } from "axios";

type usePostProps = {
  url: string;
  body: object;
  headers?: AxiosRequestHeaders;
};

export default function usePost<T>({ url, body, headers }: usePostProps): [T | undefined, boolean, any, boolean, React.Dispatch<React.SetStateAction<boolean>>] {
  const [ApiResponse, setApiResponse] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any | undefined>(undefined);
  const [sendRequest, setSendRequest] = useState(false);

  useEffect(() => {
    if (sendRequest) {
      const getData = async () => {
        try {
          const response: T = await axios.post(url, body, { headers });
          console.log(response);
          setApiResponse(response);
          setLoading(false);
          setSendRequest(false);
        } catch (err: any) {
          console.log(err);
          setError(err);
          setSendRequest(false);
          setLoading(false);
        }
      };
      getData();
    }
  }, [url, headers, body]);

  return [ApiResponse, loading, error, sendRequest, setSendRequest];
}
