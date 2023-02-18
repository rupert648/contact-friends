import type { Dispatch, SetStateAction } from "react";
import React from "react";
import { trpc } from "../../../utils/trpc";

import { SearchBar } from "../FriendArea/SearchBar";
import { Spinner } from "../../icons";
import { getColor } from "../../shared/TagSelectedBox";
import type { ACTIONS } from "../../../pages/friends";

interface LeftMenuProps {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  searchValue: string;
  setSearchvalue: Dispatch<SetStateAction<string>>;
  tagsDispatcher: Dispatch<ACTIONS>;
}

const LeftMenu = ({
  setShowModal,
  searchValue,
  setSearchvalue,
  tagsDispatcher,
}: LeftMenuProps) => {
  const { data, isLoading } = trpc.friends.getTags.useQuery();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    const { value, checked } = target;
    if (checked) {
      tagsDispatcher({ type: "ADD", payload: value });
    } else {
      tagsDispatcher({ type: "REMOVE", payload: value });
    }
  };

  return (
    <div className="min-h-max w-64 rounded-lg border-2 border-gray-400 border-l-orange-500 bg-white p-2 shadow-lg drop-shadow-xl">
      <button
        className="pb-2 text-sm text-gray-400 hover:text-gray-500"
        onClick={() => setShowModal(true)}
      >
        + Add new friend
      </button>
      <hr className="py-2"></hr>
      <SearchBar searchValue={searchValue} setSearchValue={setSearchvalue} />
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <h1 className="py-2 pl-1 text-sm text-gray-600 ">Select Tags</h1>
          <ul className="mb-2 pl-1">
            {data?.map((tag) => (
              <li key={tag}>
                <input
                  type="checkbox"
                  id={tag}
                  value={tag}
                  onChange={handleChange}
                />
                <span
                  className="font-extrabold"
                  style={{ color: getColor(tag) }}
                >
                  {" "}
                  •
                </span>
                <span className="pl-1 text-sm font-light">{tag}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default LeftMenu;
