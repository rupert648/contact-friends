import { useState } from "react";

import type NextAuthPage from "../../types/NextAuthPage";
import FriendArea from "../../components/friends/FriendArea";
import SelectedArea from "../../components/friends/SelectedArea";
import LeftMenu from "../../components/friends/LeftMenu";
import RightSlideIn from "../../components/shared/RightSlideIn";
import AddFriendForm from "../../components/friends/AddFriendModel/AddFriendForm";

export type sortMethods = "name" | "lastContacted" | undefined;

const FriendsPage: NextAuthPage = () => {
  const [openRightPanel, setOpenRightPanel] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedFriend, setSelectedFriend] = useState<string | null>(null);

  return (
    <>
      <div className="flex">
        <div className="mr-10 ml-4 mt-10 flex-auto">
          <LeftMenu setShowModal={setShowModal} />
        </div>
        <FriendArea
          setSelectedFriend={setSelectedFriend}
          setOpenRightPanel={setOpenRightPanel}
        />
      </div>
      <RightSlideIn openRightPanel={showModal} setOpenRightPanel={setShowModal}>
        <AddFriendForm setShowModal={setShowModal} />
      </RightSlideIn>
      <RightSlideIn
        openRightPanel={openRightPanel}
        setOpenRightPanel={setOpenRightPanel}
      >
        <SelectedArea selectedFriend={selectedFriend} />
      </RightSlideIn>
    </>
  );
};

FriendsPage.requireAuth = true;
export default FriendsPage;
