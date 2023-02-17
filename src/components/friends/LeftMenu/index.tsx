import type { Dispatch, SetStateAction } from "react";
import React from "react";
import { Friend } from "@prisma/client";
import { trpc } from "../../../utils/trpc";

import { SearchBar } from "../FriendArea/SearchBar";
import { Spinner } from "../../icons";

interface LeftMenuProps {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  searchValue: string;
  setSearchvalue: Dispatch<SetStateAction<string>>;
}

const LeftMenu = ({
  setShowModal,
  searchValue,
  setSearchvalue,
}: LeftMenuProps) => {
  const { data, isLoading } = trpc.friends.getTags.useQuery();
  return (
    <div className="min-h-max w-64 rounded-lg border-2 border-gray-400 border-l-orange-500 bg-white p-2 shadow-lg drop-shadow-xl">
      <button
        className="text-sm text-gray-400 hover:text-gray-500"
        onClick={() => setShowModal(true)}
      >
        Add new friend
      </button>
      <hr className="py-2"></hr>
      <SearchBar searchValue={searchValue} setSearchValue={setSearchvalue} />
      {isLoading ? (
        <Spinner />
      ) : (
        <ul>
          {data?.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LeftMenu;
