type PaginationPropsType = {
  pageCount: number;
  onClick: (value: number) => void;
  activePage: number;
};
export default function Pagination({ pageCount, onClick, activePage }: PaginationPropsType) {
  const onClickHandler = (page: number) => {
    return onClick(page);
  };
  return (
    <>
      <div className="flex justify-center">
        <ul className="flex w-fit items-center justify-center divide-x-2 border-primary">
          <li
            className="px-6 py-3"
            onClick={() => {
              if (activePage - 1 >= 1) {
                onClickHandler(activePage - 1);
              }
            }}
          >
            prev
          </li>
          {[...Array(pageCount)].map((e, index) => {
            return (
              <li
                onClick={() => {
                  onClickHandler(index + 1);
                }}
                key={index}
                className={`border-t-2 border-b-2 px-6 py-3 ${index + 1 === activePage ? "border-primary bg-primary text-white" : ""}`}
              >
                {index + 1}
              </li>
            );
          })}
          <li
            className="px-6 py-3"
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
