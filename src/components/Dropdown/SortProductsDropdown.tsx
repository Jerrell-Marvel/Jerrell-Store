import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
type SortProductsDropdownProps = {
  onChange: (value: string) => void;
};

enum SelectValue {
  newest,
  highest,
  lowest,
}

export default function SortProductsDropdown({ onChange }: SortProductsDropdownProps) {
  const [searchParams] = useSearchParams();
  const selectRef = useRef<HTMLSelectElement>(null!);

  useEffect(() => {
    const sortParam = searchParams.get("sort") || "newest";

    // @ts-ignore
    selectRef.current.selectedIndex = SelectValue[sortParam];
  });

  return (
    <select
      className="rounded-sm p-2"
      ref={selectRef}
      onChange={() => {
        const value = selectRef.current.options[selectRef.current.selectedIndex].value;
        onChange(value);
      }}
    >
      <option value="newest">Newest</option>
      <option value="highest">Highest</option>
      <option value="lowest">Lowest</option>
    </select>
  );
}
