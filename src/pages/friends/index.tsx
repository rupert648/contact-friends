import { useState } from "react";
import type NextAuthPage from "../../types/NextAuthPage";

import AddFriendModal from "../../components/friends/AddFriendModel/AddFriendModal";
import FriendArea from "../../components/friends/FriendArea";
import Dropdown from "../../components/shared/Dropdown";
import Button from "../../components/shared/Button";

export type sortMethods = "name" | "lastContacted" | undefined;

const FriendsPage: NextAuthPage = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [sortMethod, setSortMethod] = useState<sortMethods>(undefined);

  const sortDropdownOptions: { optionName: string; value: sortMethods }[] = [
    { optionName: "name", value: "name" },
    { optionName: "lastContacted", value: "lastContacted" },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="inline-block">
        <Button onClick={() => setShowModal(true)}>Add new Friend</Button>
        <Dropdown
          options={sortDropdownOptions}
          setActive={setSortMethod}
          active={sortMethod as string}
          placeholder="Sort By"
        />
      </div>
      {showModal && <AddFriendModal setShowModal={setShowModal} />}
      <FriendArea sortMethod={sortMethod} />
    </div>
  );
};

FriendsPage.requireAuth = true;
export default FriendsPage;
