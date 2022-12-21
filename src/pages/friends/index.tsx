import { useState } from "react";
import type NextAuthPage from "../../types/NextAuthPage";

import AddFriendModal from "../../components/friends/AddFriendModel/AddFriendModal";
import FriendArea from "../../components/friends/FriendArea";

const FriendsPage: NextAuthPage = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-4">
      <button
        className="mx-10 w-64 rounded-md border-2 border-orange-500 py-2 px-4 font-bold text-orange-800 hover:bg-orange-100"
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
