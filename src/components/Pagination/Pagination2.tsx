import { useState } from "react";
export default function Pagination2() {
  const [totalPage, setTotalPage] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [sibling, setSibling] = useState(0);

  const [arr, setArr] = useState<any[]>([1, 2, 3, 4, 5, "..."]);

  //   return (
  //     <>
  //       <span className="block pt-28">{currentPage}</span>
  //       <div className="flex flex-wrap">
  //         {/* <div
  //           className="flex items-center justify-center border-2 p-3 text-xl"
  //           onClick={() => {
  //             setCurrentPage(1);
  //           }}
  //         >
  //           {currentPage - 1}
  //         </div> */}

  //         {currentPage >= 4 ? <div className="flex items-center justify-center border-2 p-3 text-xl">...</div> : ""}

  //         {[...Array(currentPage >= 4 && currentPage <= 96 ? 3 : 5)].map((e, index) => {
  //           return (
  //             <div>
  //               <div
  //                 className={`flex items-center justify-center border-2 p-3 text-xl ${currentPage + index === currentPage ? "bg-slate-200" : ""}`}
  //                 onClick={(e) => {
  //                   setCurrentPage(currentPage + index);
  //                   console.log(index);
  //                 }}
  //               >
  //                 {currentPage + index}
  //               </div>
  //             </div>
  //           );
  //         })}

  //         {currentPage <= 96 ? <div className="flex items-center justify-center border-2 p-3 text-xl">...</div> : ""}

  //         <div
  //           className="flex items-center justify-center border-2 p-3 text-xl"
  //           onClick={() => {
  //             setCurrentPage(100);
  //           }}
  //         >
  //           {100}
  //         </div>
  //       </div>

  //       <span
  //         onClick={() => {
  //           setCurrentPage(currentPage + 1);
  //         }}
  //       >
  //         Increment
  //       </span>
  //       <span
  //         onClick={() => {
  //           setCurrentPage(currentPage - 1);
  //         }}
  //       >
  //         Decrement
  //       </span>
  //     </>
  //   );

  return (
    <>
      <div className="flex pt-24">{currentPage}</div>
      <div className="flex pt-2">
        {currentPage >= 4 ? (
          <div
            className="flex items-center justify-center border-2 p-3 text-xl"
            onClick={() => {
              setCurrentPage(1);
              setArr([1, 2, 3, 4, 5, "..."]);
            }}
          >
            1
          </div>
        ) : (
          ""
        )}
        {arr.map((e, index) => {
          return (
            <div
              className={`flex items-center justify-center border-2 p-3 text-xl ${arr[index] === currentPage ? "bg-slate-200" : ""}`}
              onClick={() => {
                setCurrentPage(e);

                if (e >= 4 && e <= 26) {
                  setArr(["...", e - 1, e, e + 1, "..."]);
                }

                if (e > 26) {
                  setArr(["...", 26, 27, 28, 29, 30]);
                }

                // if (e < 4) {
                //   setArr([2, 3, 4, 5, "..."]);
                // }

                // if (e >= 26) {
                //   setArr(["..."]);
                // }
              }}
            >
              {e}
            </div>
          );
        })}

        {currentPage <= 26 ? (
          <div
            className="flex items-center justify-center border-2 p-3 text-xl"
            onClick={() => {
              setCurrentPage(30);
              setArr(["...", 26, 27, 28, 29, 30]);
            }}
          >
            30
          </div>
        ) : (
          ""
        )}
      </div>

      <span
        onClick={() => {
          setCurrentPage(currentPage + 1);
          console.log(currentPage);
          if (currentPage >= 4 && currentPage <= 26) {
            setArr(["...", currentPage - 1, currentPage, currentPage + 1, "..."]);
          }

          if (currentPage > 26) {
            setArr(["...", 26, 27, 28, 29, 30]);
          }
        }}
      >
        Increment
      </span>
      <span
        onClick={() => {
          setCurrentPage(currentPage - 1);
        }}
      >
        Decrement
      </span>
    </>
  );
}
