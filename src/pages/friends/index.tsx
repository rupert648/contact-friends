import { useState } from "react";
import type NextAuthPage from "../../types/NextAuthPage";
import { trpc } from "../../utils/trpc";

import AddFriendModal from "../../components/friends/AddFriendModal";

const FriendsPage: NextAuthPage = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { data, isLoading, error } = trpc.friends.getAll.useQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error</p>;
  }

  const friends = data?.Friend.map((friend) => {
    return <p key={friend.id}>{friend.name}</p>;
  });

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <button
        className="rounded-full bg-orange-500 py-2 px-4 font-bold text-white hover:bg-orange-700"
        onClick={() => setShowModal(true)}
      >
        big ass button
      </button>
      {showModal && <AddFriendModal setShowModal={setShowModal} />}
      <div>{friends?.length !== 0 ? friends : <p>No Friends :(</p>}</div>
    </div>
  );
};

FriendsPage.requireAuth = true;
export default FriendsPage;
