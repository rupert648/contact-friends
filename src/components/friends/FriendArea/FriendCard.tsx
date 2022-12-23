import type { Dispatch, SetStateAction } from "react";
import React from "react";

import TagSelectedBox from "../../shared/TagSelectedBox";
import { TrashIcon, MailIcon, Clock, Person } from "../../icons";
import type { FriendLimitedType } from ".";

interface FriendCardProps {
  friend: FriendLimitedType;
  setShowDeleteModal: Dispatch<SetStateAction<boolean>>;
  setToDelete: Dispatch<SetStateAction<string | null>>;
  setSelectedFriend: Dispatch<SetStateAction<string | null>>;
}

const FriendCard = ({
  friend,
  setShowDeleteModal,
  setToDelete,
  setSelectedFriend,
}: FriendCardProps) => {
  const { name, lastContacted, tags } = friend;

  let tagsArray: string[] | null = null;
  if (tags) {
    tagsArray = JSON.parse(tags);
  }

  return (
    <div
      onClick={() => setSelectedFriend(friend.id)}
      className={`w-full cursor-pointer border-y border-gray-400 p-2 hover:bg-orange-100`}
    >
      <div className="relative flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Person className="h-4 w-4" />
          <p className="text-md font-semibold">{name}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Clock />
          <p className="text-xs font-light">{lastContacted?.toDateString()}</p>
          <button>
            <MailIcon className="h-6 w-6 text-green-500" />
          </button>
          <button
            onClick={() => {
              setToDelete(friend.id);
              setShowDeleteModal(true);
            }}
          >
            <TrashIcon className="h-6 w-6 text-red-500" />
          </button>
        </div>
      </div>
      <div className="flex">
        {tagsArray?.map((tag) => (
          <TagSelectedBox key={tag} tag={tag} />
        ))}
      </div>
    </div>
  );
};

export default FriendCard;
