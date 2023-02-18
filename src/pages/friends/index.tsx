import { useState, useReducer } from "react";

import type NextAuthPage from "../../types/NextAuthPage";
import FriendArea from "../../components/friends/FriendArea";
import SelectedArea from "../../components/friends/SelectedArea";
import LeftMenu from "../../components/friends/LeftMenu";
import RightSlideIn from "../../components/shared/RightSlideIn";
import AddFriendForm from "../../components/friends/AddFriendModel/AddFriendForm";

export type sortMethods = "name" | "lastContacted" | undefined;

export type ACTIONS = { type: "ADD" | "REMOVE" | "CLEAR"; payload: string };

const tagsReducer = (prevTags: string[], action: ACTIONS) => {
  let array;
  switch (action.type) {
    case "ADD":
      array = [...prevTags];
      array.push(action.payload);
      return array;
    case "REMOVE":
      array = prevTags.filter((item) => item !== action.payload);
      return array;
    case "CLEAR":
      return (prevTags = []);
    default:
      return [];
  }
};

const FriendsPage: NextAuthPage = () => {
  const [openRightPanel, setOpenRightPanel] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedFriend, setSelectedFriend] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");

  const [filterByTags, dispatcher] = useReducer(tagsReducer, []);

  return (
    <>
      <div className="flex">
        <div className="mr-10 ml-4 mt-10 flex-auto">
          <LeftMenu
            setShowModal={setShowModal}
            searchValue={searchValue}
            setSearchvalue={setSearchValue}
            tagsDispatcher={dispatcher}
          />
        </div>
        <FriendArea
          setSelectedFriend={setSelectedFriend}
          setOpenRightPanel={setOpenRightPanel}
          searchValue={searchValue}
          filterByTags={filterByTags}
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
