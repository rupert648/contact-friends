import type { Dispatch, SetStateAction } from "react";
import React from "react";
import Image from "next/image";

import TagSelectedBox from "../../shared/TagSelectedBox";
import { TrashIcon, MailIcon, Clock, Person } from "../../icons";
import type { FriendLimitedType } from ".";

interface FriendCardProps {
  friend: FriendLimitedType;
  setShowDeleteModal: Dispatch<SetStateAction<boolean>>;
  setToDelete: Dispatch<SetStateAction<string | null>>;
  setSelectedFriend: Dispatch<SetStateAction<string | null>>;
  setOpenRightPanel: Dispatch<SetStateAction<boolean>>;
}

const FriendCard = ({
  friend,
  setShowDeleteModal,
  setToDelete,
  setSelectedFriend,
  setOpenRightPanel,
}: FriendCardProps) => {
  const { name, lastContacted, tags, email } = friend;

  let tagsArray: string[] | null = null;
  if (tags) {
    tagsArray = JSON.parse(tags);
  }

  return (
    <div
      onClick={() => {
        setSelectedFriend(friend.id);
        setOpenRightPanel(true);
      }}
      className="mb-3 w-full cursor-pointer rounded-lg border-2 border-gray-400 border-l-orange-500 bg-white p-2 shadow-lg drop-shadow-xl hover:bg-orange-100"
    >
      <div className="grid grid-cols-12">
        <div className="col-span-1 flex items-center justify-center">
          {friend.imageUrl ? (
            <Image
              src={friend.imageUrl}
              width={40}
              height={40}
              alt="Picture of the friend"
              style={{ borderRadius: "100%" }}
            />
          ) : (
            <Person className="h-10 w-10" />
          )}
        </div>
        <div className="col-span-11">
          <div className="relative flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <p className="text-md font-semibold">{name}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Clock />
              <p className="text-xs font-light">
                {lastContacted?.toDateString()}
              </p>
              {email && (
                <button
                  onClick={() => {
                    const href = `mailto:${email}`;
                    window.location.href = href;
                  }}
                >
                  <MailIcon className="h-6 w-6 text-green-500" />
                </button>
              )}
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
            {tagsArray ? (
              tagsArray?.map((tag) => <TagSelectedBox key={tag} tag={tag} />)
            ) : (
              <p className="text-left text-xs font-light">no tags</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendCard;
