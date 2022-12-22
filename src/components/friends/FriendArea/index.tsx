import type { Friend } from "@prisma/client";
import React, { useState } from "react";

import { trpc } from "../../../utils/trpc";
import DeleteFriendModel from "./DeleteFriendModel";
import FriendCard from "./FriendCard";
import type { sortMethods } from "../../../pages/friends";

interface FriendAreaProps {
  sortMethod: sortMethods;
}

const FriendArea = ({ sortMethod }: FriendAreaProps) => {
  const [showDeleteFriendModal, setShowDeleteFriendModal] =
    useState<boolean>(false);
  const [toDelete, setToDelete] = useState<Friend | null>(null);
  const { data, isLoading, error } = trpc.friends.getAll.useQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error</p>;
  }

  const sortByName = (frienda: Friend, friendb: Friend) => {
    if (frienda.name < friendb.name) {
      return -1;
    }
    if (frienda.name > friendb.name) {
      return 1;
    }
    return 0;
  };

  const sortByLastContacted = (frienda: Friend, friendb: Friend) => {
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

  const friendsSorted = sortMethod
    ? data?.Friend.sort((frienda, friendb) => {
        switch (sortMethod) {
          case "name":
            return sortByName(frienda, friendb);
          case "lastContacted":
            return sortByLastContacted(frienda, friendb);
          default:
            return 0;
        }
      })
    : data?.Friend;

  const friends = friendsSorted?.map((friend) => {
    return (
      <FriendCard
        key={friend.id}
        friend={friend}
        setShowDeleteModal={setShowDeleteFriendModal}
        setToDelete={setToDelete}
      />
    );
  });

  return (
    <>
      <div className="grid gap-2 md:grid-cols-4">
        {friends?.length !== 0 ? friends : <p>No Friends :(</p>}
      </div>
      {showDeleteFriendModal && (
        <DeleteFriendModel
          setShowModal={setShowDeleteFriendModal}
          toDelete={toDelete}
        />
      )}
    </>
  );
};

export default FriendArea;
