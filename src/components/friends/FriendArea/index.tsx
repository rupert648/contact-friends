import type { Dispatch, SetStateAction } from "react";
import React, { useState } from "react";
import Fuse from "fuse.js";

import type { RouterOutputs } from "../../../utils/trpc";
import { trpc } from "../../../utils/trpc";
import DeleteFriendModel from "./DeleteFriendModel";
import FriendCard from "./FriendCard";
import type { sortMethods } from "../../../pages/friends";

interface FriendAreaProps {
  sortMethod?: sortMethods;
  setSelectedFriend: Dispatch<SetStateAction<string | null>>;
  setOpenRightPanel: Dispatch<SetStateAction<boolean>>;
  searchValue: string;
  filterByTags: string[];
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
  searchValue,
  filterByTags,
}: FriendAreaProps) => {
  const [showDeleteFriendModal, setShowDeleteFriendModal] =
    useState<boolean>(false);
  const [toDelete, setToDelete] = useState<string | null>(null);
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

  if (filterByTags.length > 0) {
    friendsSorted = friendsSorted?.filter((friend) => {
      return filterByTags.find((tag) => {
        const { tags } = friend;
        // tags are stored as stringified arrays so can be stored
        // in SQL DB - could atomise but not worth for short arrays
        const tagsArr = tags
          ?.replace("[", "")
          .replace("]", "")
          .replaceAll('"', "")
          .trim()
          .split(",");
        if (tagsArr?.includes(tag)) return true;
      });
    });
  }

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
      <hr className="mb-4 "></hr>
      {friendsSorted && friendsSorted?.length > 0 ? (
        friendsSorted?.map(createFriendCard)
      ) : (
        <p className="font-extralight">no friends mate</p>
      )}
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
