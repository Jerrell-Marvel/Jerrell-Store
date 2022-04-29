import { ReactNode } from "react";
type ButtonProps = {
  children: ReactNode;
};
function Button({ children }: ButtonProps) {
  return (
    <button className="w-fit rounded-md border-2 border-black bg-primary py-2 px-6 text-white transition duration-200 ease-in-out hover:bg-white hover:text-primary">
      {children}
    </button>
  );
}

export default Button;
