import { Link } from "react-router-dom";

type NotFoundProps = {
  message: string;
  statusCode: number;
  statusText: string;
};

function NotFound({ message, statusCode, statusText }: NotFoundProps) {
  return (
    <div className="flex h-screen flex-col items-center justify-center pt-20 text-center">
      <h2 className="text-2xl font-medium md:text-4xl">{message}</h2>
      <div className="mt-6 text-xl md:text-3xl">
        <p>
          {statusCode} | {statusText}
        </p>
      </div>
      <Link to="/" className="mt-6 w-fit border-2 border-black bg-primary py-4 px-8 uppercase text-white transition-colors duration-300">
        Back to Home Page
      </Link>
    </div>
  );
}

export default NotFound;
