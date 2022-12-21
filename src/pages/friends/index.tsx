import { useState } from "react";
import type NextAuthPage from "../../types/NextAuthPage";
import { trpc } from "../../utils/trpc";

import AddFriendModal from "../../components/friends/AddFriendModel/AddFriendModal";
import FriendArea from "../../components/friends/FriendArea";

const FriendsPage: NextAuthPage = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-4">
      <button
        className="mx-10 rounded-full bg-orange-500 py-2 px-4 font-bold text-white hover:bg-orange-700"
        onClick={() => setShowModal(true)}
      >
        Add new Friend 🥹
      </button>
      {showModal && <AddFriendModal setShowModal={setShowModal} />}
      <FriendArea />
    </div>
  );
};

FriendsPage.requireAuth = true;
export default FriendsPage;
