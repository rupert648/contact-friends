import { useState } from "react";
import type NextAuthPage from "../../types/NextAuthPage";

import AddFriendModal from "../../components/friends/AddFriendModel/AddFriendModal";
import FriendArea from "../../components/friends/FriendArea";
import Button from "../../components/shared/Button";
import SelectedArea from "../../components/friends/SelectedArea";

export type sortMethods = "name" | "lastContacted" | undefined;

const FriendsPage: NextAuthPage = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedFriend, setSelectedFriend] = useState<string | null>(null);

  return (
    <>
      <div className="flex">
        <div className="w-64 flex-auto border-4 border-gray-100">
          <Button onClick={() => setShowModal(true)}>Add new Friend</Button>
        </div>
        <FriendArea setSelectedFriend={setSelectedFriend} />
        <div className="border-grey-100 flex-1 border-4">
          <SelectedArea selectedFriend={selectedFriend} />
        </div>
      </div>
      {showModal && <AddFriendModal setShowModal={setShowModal} />}
    </>
  );
};

FriendsPage.requireAuth = true;
export default FriendsPage;
