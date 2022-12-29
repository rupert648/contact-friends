import type { Dispatch, SetStateAction } from "react";
import React, { useState } from "react";

import type { RouterOutputs } from "../../../utils/trpc";
import { trpc } from "../../../utils/trpc";
import DeleteFriendModel from "./DeleteFriendModel";
import FriendCard from "./FriendCard";
import type { sortMethods } from "../../../pages/friends";

interface FriendAreaProps {
  sortMethod?: sortMethods;
  setSelectedFriend: Dispatch<SetStateAction<string | null>>;
}

// grabs the type of the limited friend result returned from
// friends.getAll.useQuery
// allows us to change the query without affecting this type
export type FriendLimitedType = Exclude<
  RouterOutputs["friends"]["getAll"],
  null
>["Friend"][0];

const FriendArea = ({ setSelectedFriend }: FriendAreaProps) => {
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

  const friendsSorted = data?.Friend.sort(sortByLastContacted);

  const createFriendCard = (friend: FriendLimitedType) => {
    return (
      <FriendCard
        key={friend.id}
        friend={friend}
        setShowDeleteModal={setShowDeleteFriendModal}
        setToDelete={setToDelete}
        setSelectedFriend={setSelectedFriend}
      />
    );
  };

  return (
    <div className="w-full p-4">
      <h1 className="text-lg">All Friends</h1>
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
