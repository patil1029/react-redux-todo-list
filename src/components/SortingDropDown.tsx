import { Dispatch, SetStateAction } from "react";

interface SortingDropdownProps {
  sorting: string,
  setSorting: Dispatch<SetStateAction<string>>
} 

const SortingDropdown:React.FC<SortingDropdownProps> = ({ sorting, setSorting }) => {
  return (
    <select
      className="sorting-dropdown"
      value={sorting}
      onChange={(e) => setSorting(e.target.value)}
    >
      <option value="date desc">date desc</option>
      <option value="date asc">date asc</option>
    </select>
  );
};

export default SortingDropdown;
