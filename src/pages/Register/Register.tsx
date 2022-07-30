import { useEffect, useState } from "react";
import usePost from "../../customHooks/usePost";

type userType = {
  username: string;
  email: string;
  password: string;
};

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [response, loading, error, sendRequest, setSendRequest] = usePost<userType>({
    url: "http://localhost:5000/api/v1/auth/register",
    body: {
      username,
      email,
      password,
    },
  });

  useEffect(() => {
    if (typeof error !== "undefined" && error.code !== "ERR_NETWORK") {
      if (error?.response.data.name === "ValidationError") {
        setErrorMessage("Invalid email format");
      }
      if (error?.response.data.name === "MongoServerError") {
        setErrorMessage("Email is already registered");
      }
    }

    if (typeof error !== "undefined" && error.code === "ERR_NETWORK") {
      setErrorMessage("Something went wrong please try again later");
    }

    if (typeof response !== "undefined") {
      setIsSuccess(true);
    }
  }, [response, loading, error, sendRequest, setSendRequest]);

  const handleSubmit = () => {
    setSendRequest(true);
  };

  return (
    <div className="bg-slate-200 pt-28 pb-8">
      <form action="" className="mx-auto w-full rounded-lg bg-white p-8 shadow-xl md:w-[576px]">
        <div className="flex flex-col gap-6 text-center">
          <h2 className="text-4xl font-semibold">Register to Jerrell Store</h2>
          <input
            type="text"
            name="username"
            placeholder="username"
            className="rounded-lg border-2 p-3"
            value={username}
            required
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            type="text"
            name="email"
            placeholder="email"
            className="rounded-lg border-2 p-3"
            value={email}
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            name="password"
            className="rounded-lg border-2 p-3"
            placeholder="password"
            value={password}
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button
            className="w-full border-2 border-black bg-primary py-4 uppercase text-white transition-colors duration-300"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            Register
          </button>
          <p>{errorMessage}</p>
        </div>
      </form>
    </div>
  );
}
