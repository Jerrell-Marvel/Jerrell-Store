import { useEffect, useState } from "react";

export default function Test() {
  const [count, setCount] = useState(0); //initial value of this
  const str = "hi";
  useEffect(() => {
    setCount((count) => count + 1); //increment this Hook
  }, []); //no dependency array.

  useEffect(() => {
    if (str) {
      console.log("str is true");
    }
    return () => {
      console.log("clean up");
    };
  }, [count]);
  return (
    <div className="App">
      <p> value of count: {count} </p>
      <div
        onClick={() => {
          setCount(count + 1);
        }}
      >
        CLICK
      </div>
    </div>
  );
}
