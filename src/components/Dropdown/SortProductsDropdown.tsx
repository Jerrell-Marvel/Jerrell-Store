import { useRef } from "react";
type SortProductsDropdownProps = {
  onChange: (value: string) => void;
};

export default function SortProductsDropdown({ onChange }: SortProductsDropdownProps) {
  const selectRef = useRef<HTMLSelectElement>(null!);
  return (
    <select
      className="rounded-sm p-2"
      ref={selectRef}
      onChange={(e) => {
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
