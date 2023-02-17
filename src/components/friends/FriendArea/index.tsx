import type { Dispatch, SetStateAction } from "react";
import React, { useState } from "react";
import Fuse from "fuse.js";

import type { RouterOutputs } from "../../../utils/trpc";
import { trpc } from "../../../utils/trpc";
import DeleteFriendModel from "./DeleteFriendModel";
import FriendCard from "./FriendCard";
import type { sortMethods } from "../../../pages/friends";
import { SearchBar } from "./SearchBar";

interface FriendAreaProps {
  sortMethod?: sortMethods;
  setSelectedFriend: Dispatch<SetStateAction<string | null>>;
  setOpenRightPanel: Dispatch<SetStateAction<boolean>>;
}

// grabs the type of the limited friend result returned from
// friends.getAll.useQuery
// allows us to change the query without affecting this type
export type FriendLimitedType = Exclude<
  RouterOutputs["friends"]["getAll"],
  null
>["Friend"][0];

const fuseOptions: Fuse.IFuseOptions<FriendLimitedType> = {
  includeScore: false,
  keys: ["name", "email"],
};

const FriendArea = ({
  setSelectedFriend,
  setOpenRightPanel,
}: FriendAreaProps) => {
  const [showDeleteFriendModal, setShowDeleteFriendModal] =
    useState<boolean>(false);
  const [toDelete, setToDelete] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const { data, isLoading, error } = trpc.friends.getAll.useQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error</p>;
  }

  const sortByLastContacted = (
    frienda: FriendLimitedType,
    friendb: FriendLimitedType
  ) => {
    const atime = frienda.lastContacted.getTime();
    const btime = friendb.lastContacted.getTime();
    if (atime < btime) {
      return -1;
    }
    if (atime > btime) {
      return 1;
    }
    return 0;
  };

  let friendsSorted = data?.Friend.sort(sortByLastContacted);

  if (searchValue && friendsSorted) {
    // perform fuse search
    const fuse = new Fuse(friendsSorted, fuseOptions);
    friendsSorted = fuse.search(searchValue).map((result) => result.item);
  }

  const createFriendCard = (friend: FriendLimitedType) => {
    return (
      <FriendCard
        key={friend.id}
        friend={friend}
        setShowDeleteModal={setShowDeleteFriendModal}
        setToDelete={setToDelete}
        setSelectedFriend={setSelectedFriend}
        setOpenRightPanel={setOpenRightPanel}
      />
    );
  };

  return (
    <div className="mr-10 w-full p-4">
      <h1 className="text-lg text-gray-400 hover:text-gray-500">All Friends</h1>
      <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
      <hr className="mb-4 "></hr>
      {friendsSorted?.map(createFriendCard)}
      {showDeleteFriendModal && (
        <DeleteFriendModel
          setShowModal={setShowDeleteFriendModal}
          toDeleteId={toDelete}
        />
      )}
    </div>
  );
};

export default FriendArea;
