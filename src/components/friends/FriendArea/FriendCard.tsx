import { type Friend } from "@prisma/client";
import type { Dispatch, SetStateAction } from "react";
import React from "react";

import { TrashIcon, MailIcon, PhoneIcon } from "../../icons";

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
  const { name, phoneNumber, email, lastContacted } = friend;

  return (
    <div className={`w-full p-4 shadow-md lg:max-w-lg `}>
      <div className="space-y-2">
        <div className="relative flex items-center justify-between bg-white">
          <h3 className="text-2xl font-semibold">{name}</h3>
          <button
            onClick={() => {
              setToDelete(friend);
              setShowDeleteModal(true);
            }}
          >
            <TrashIcon />
          </button>
        </div>
        <ul className="text-xs text-gray-600">
          <li className="mb-3">
            <MailIcon />
            <span className="font-bold">Email: </span>
            {email ? email : "no email"}
          </li>
          <li className="mb-3">
            <PhoneIcon />
            <span className="font-bold">Phone Number: </span>
            {phoneNumber ? phoneNumber : "no phone number"}
          </li>
          <li className="mb-3">
            <span className="font-bold">Last Contacted: </span>
            {lastContacted?.toDateString()}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FriendCard;
