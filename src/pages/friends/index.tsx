import { useState } from "react";
import type NextAuthPage from "../../types/NextAuthPage";

import AddFriendModal from "../../components/friends/AddFriendModel/AddFriendModal";
import FriendArea from "../../components/friends/FriendArea";
import SelectedArea from "../../components/friends/SelectedArea";
import LeftMenu from "../../components/friends/LeftMenu";

export type sortMethods = "name" | "lastContacted" | undefined;

const FriendsPage: NextAuthPage = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedFriend, setSelectedFriend] = useState<string | null>(null);

  return (
    <>
      <div className="flex">
        <div className="mr-10 ml-4 mt-10 flex-auto">
          <LeftMenu setShowModal={setShowModal} />
        </div>
        <FriendArea setSelectedFriend={setSelectedFriend} />
        <div className="ml-10 mr-4 mt-10 flex-1">
          <SelectedArea selectedFriend={selectedFriend} />
        </div>
      </div>
      {showModal && <AddFriendModal setShowModal={setShowModal} />}
    </>
  );
};

FriendsPage.requireAuth = true;
export default FriendsPage;
