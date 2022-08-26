import { useState } from "react";
import axios, { AxiosRequestHeaders } from "axios";
import { useMutation } from "react-query";

type UseApiProps = {
  url: string;
  headers?: AxiosRequestHeaders;
  method: "post" | "put" | "delete" | "patch";
};

export default function useApi2<T>({ url, headers, method }: UseApiProps) {
  return useMutation(async (itemId?: string, body?: object) => {
    console.log("this fn is called inside use mutation");
    let response;
    if (method === "delete") {
      response = await axios[method](`${url}/${itemId}`, {
        headers,
        data: body,
      });
    } else if (method === "patch") {
      response = await axios[method](`${url}/${itemId}`, body, {
        headers,
      });
    } else {
      response = await axios[method](url, body, {
        headers,
      });
    }

    const data: T = response.data;
    return data;
  });
}

// export default function useApi2<T>({ url, headers, method, queryKey }: UseApiProps): {
//     return null
//   const [ApiResponse, setApiResponse] = useState<T | undefined>(undefined);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState({ success: true });
//   const getData = async (itemId?: string, body?: object) => {
//     console.log("use api called");
//     setLoading(true);
//     setApiResponse(undefined);
//     setError({ success: true });
//     try {
//       let response;
//       if (method === "delete") {
//         response = await axios[method](`${url}/${itemId}`, {
//           headers,
//           data: body,
//         });
//       } else if (method === "patch") {
//         response = await axios[method](`${url}/${itemId}`, body, {
//           headers,
//         });
//       } else {
//         response = await axios[method](url, body, {
//           headers,
//         });
//       }
//       const data: T = response.data;
//       setApiResponse(data);
//     } catch (err: any) {
//       console.log(err);
//       setApiResponse(undefined);
//       setError(err);
//     } finally {
//       setLoading(false);
//     }
//   };
//   return [ApiResponse, loading, error, getData];
// };
