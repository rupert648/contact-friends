import { Friend } from "@prisma/client";
import React, { useState } from "react";

import { trpc } from "../../../utils/trpc";
import DeleteFriendModel from "./DeleteFriendModel";
import FriendCard from "./FriendCard";

const FriendArea = () => {
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

  const friends = data?.Friend.map((friend) => {
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
