import { type Friend } from "@prisma/client";
import type { Dispatch, SetStateAction } from "react";
import React from "react";

import { TrashIcon, MailIcon, PhoneIcon, Clock, Person } from "../../icons";

interface FriendCardProps {
  friend: Friend;
  setShowDeleteModal: Dispatch<SetStateAction<boolean>>;
  setToDelete: Dispatch<SetStateAction<Friend | null>>;
}

const FriendCard = ({
  friend,
  setShowDeleteModal,
  setToDelete,
}: FriendCardProps) => {
  const { name, lastContacted } = friend;

  return (
    <div className={`w-full border-y border-gray-400 p-2 `}>
      <div className="relative flex items-center justify-between bg-white">
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
              setToDelete(friend);
              setShowDeleteModal(true);
            }}
          >
            <TrashIcon className="h-6 w-6 text-red-500" />
          </button>
        </div>{" "}
      </div>
    </div>
  );
};

export default FriendCard;
