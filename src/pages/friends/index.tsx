import { useState } from "react";
import type NextAuthPage from "../../types/NextAuthPage";

import AddFriendModal from "../../components/friends/AddFriendModel/AddFriendModal";
import FriendArea from "../../components/friends/FriendArea";
import Button from "../../components/shared/Button";

export type sortMethods = "name" | "lastContacted" | undefined;

const FriendsPage: NextAuthPage = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <div className="flex">
        <div className="flex-auto border-4 border-red-500">
          <Button onClick={() => setShowModal(true)}>Add new Friend</Button>
        </div>
        <FriendArea />
        <div className="flex-1 border-4 border-red-500">
          <p>something</p>
        </div>
      </div>
      {showModal && <AddFriendModal setShowModal={setShowModal} />}
    </>
  );
};

FriendsPage.requireAuth = true;
export default FriendsPage;
