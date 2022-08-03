import { useState, useEffect, useRef } from "react";
import axios, { AxiosRequestHeaders } from "axios";

type usePostProps = {
  url: string;
  body: object;
  headers?: AxiosRequestHeaders;
};

export default function usePost<T>({ url, body, headers }: usePostProps): [T | undefined, boolean, any, boolean, React.Dispatch<React.SetStateAction<boolean>>] {
  const [ApiResponse, setApiResponse] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any | undefined>(undefined);
  const [sendRequest, setSendRequest] = useState(false);

  useEffect(() => {
    const getData = async () => {
      console.log("called");
      try {
        const response = await axios.post(url, body, { headers });
        console.log("called");

        const data: T = response.data;
        console.log(data);
        setApiResponse(data);
        setLoading(false);
        setSendRequest(false);
      } catch (err: any) {
        console.log(err);
        setError(err);
        setSendRequest(false);
        setLoading(false);
      }
    };
    if (sendRequest) {
      getData();
      setLoading(true);
    }
  }, [sendRequest]);

  return [ApiResponse, loading, error, sendRequest, setSendRequest];
}
