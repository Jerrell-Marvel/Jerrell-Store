type PaginationPropsType = {
  pageCount: number;
  onClick: (value: number) => void;
  activePage: number;
};
export default function Pagination({ pageCount, onClick, activePage }: PaginationPropsType) {
  const onClickHandler = (page: number) => {
    return onClick(page);
  };

  if (pageCount < 1) {
    return null;
  }
  return (
    <>
      <div className="flex justify-center">
        <ul className="flex w-fit items-center justify-center border-primary">
          <li
            className="px-2 py-1 md:px-6 md:py-3"
            onClick={() => {
              if (activePage - 1 >= 1) {
                onClickHandler(activePage - 1);
              }
            }}
          >
            prev
          </li>
          <li className="flex flex-wrap divide-x-2 border-x-2">
            {[...Array(pageCount)].map((e, index) => {
              return (
                <div
                  onClick={() => {
                    onClickHandler(index + 1);
                  }}
                  key={index}
                  className={`flex h-8 w-8 cursor-pointer items-center justify-center border-t-2 border-b-2 md:h-12 md:w-12 ${index + 1 === activePage ? "border-primary bg-primary text-white" : ""}`}
                >
                  {index + 1}
                </div>
              );
            })}
          </li>

          <li
            className="px-2 py-1 md:px-6 md:py-3"
            onClick={() => {
              if (activePage + 1 <= pageCount) {
                onClickHandler(activePage + 1);
              }
            }}
          >
            next
          </li>
        </ul>
      </div>
    </>
  );
}
