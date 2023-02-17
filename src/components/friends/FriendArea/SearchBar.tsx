import type { Dispatch, SetStateAction } from "react";

interface SearchBarProps {
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
}

export const SearchBar = ({ searchValue, setSearchValue }: SearchBarProps) => {
  return (
    <>
      <input
        className="focus:shadow-outline mb-1 w-full appearance-none rounded border py-1 px-1 text-sm leading-tight text-gray-700 shadow focus:outline-none"
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
        placeholder="Filter Friends..."
      ></input>
    </>
  );
};
