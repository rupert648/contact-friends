import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "../../icons";

interface MyDropDownProps {
  options: string[];
  selectedOption: string | null;
  setSelectedOption: Dispatch<SetStateAction<string | null>>;
}

const MyDropdown = ({
  options,
  selectedOption,
  setSelectedOption,
}: MyDropDownProps) => {
  const [isOpen, setOpen] = useState(false);

  const toggleDropdown = () => setOpen(!isOpen);

  return (
    <div className="mt-1 rounded-lg text-sm">
      <div
        className="focus:shadow-outline mb-1 w-full cursor-pointer rounded border py-1 px-1 text-sm text-gray-700 shadow focus:outline-none"
        onClick={toggleDropdown}
      >
        {selectedOption ? (
          selectedOption
        ) : (
          <span className="text-gray-400">SortBy</span>
        )}
        <i className={`fa fa-chevron-right icon ${isOpen && "open"}`}></i>
        {isOpen ? (
          <ChevronDown className="float-right inline-block h-3 w-3" />
        ) : (
          <ChevronRight className="float-right inline-block h-3 w-3" />
        )}
      </div>
      {isOpen && (
        <div className="absolute block w-full rounded-lg border-t-4 border-orange-500 bg-white ">
          {options.map((item) => (
            <div
              className="rounded-lg p-1 hover:cursor-pointer hover:bg-orange-200"
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              onClick={(_) => {
                setSelectedOption(item);
                setOpen(false);
              }}
              key={item}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyDropdown;
