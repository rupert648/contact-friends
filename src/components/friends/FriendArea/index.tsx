import React from "react";

import { trpc } from "../../../utils/trpc";
import FriendCard from "./FriendCard";

const FriendArea = () => {
  const { data, isLoading, error } = trpc.friends.getAll.useQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error</p>;
  }

  const friends = data?.Friend.map((friend) => {
    return <FriendCard key={friend.id} friend={friend} />;
  });
  return (
    <div className="grid gap-2 md:grid-cols-4">
      {friends?.length !== 0 ? friends : <p>No Friends :(</p>}
    </div>
  );
};

export default FriendArea;
