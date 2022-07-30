import { useEffect, useState } from "react";

export default function Test() {
  const [count, setCount] = useState(0); //initial value of this
  useEffect(() => {
    setCount((count) => count + 1); //increment this Hook
  }, []); //no dependency array.
  return (
    <div className="App">
      <p> value of count: {count} </p>
    </div>
  );
}
