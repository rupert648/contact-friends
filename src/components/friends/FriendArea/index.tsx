import type { Dispatch, SetStateAction } from "react";
import React, { useState } from "react";

import type { RouterOutputs } from "../../../utils/trpc";
import { trpc } from "../../../utils/trpc";
import DeleteFriendModel from "./DeleteFriendModel";
import FriendCard from "./FriendCard";
import type { sortMethods } from "../../../pages/friends";

interface FriendAreaProps {
  sortMethod?: sortMethods;
  setSelectedFriend: Dispatch<SetStateAction<string | null>>;
}

// grabs the type of the limited friend result returned from
// friends.getAll.useQuery
// allows us to change the query without affecting this type
export type FriendLimitedType = Exclude<
  RouterOutputs["friends"]["getAll"],
  null
>["Friend"][0];

const FriendArea = ({ setSelectedFriend }: FriendAreaProps) => {
  const [showDeleteFriendModal, setShowDeleteFriendModal] =
    useState<boolean>(false);
  const [toDelete, setToDelete] = useState<string | null>(null);
  const { data, isLoading, error } = trpc.friends.getAll.useQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error</p>;
  }

  const sortByLastContacted = (
    frienda: FriendLimitedType,
    friendb: FriendLimitedType
  ) => {
    const atime = frienda.lastContacted.getTime();
    const btime = friendb.lastContacted.getTime();
    if (atime < btime) {
      return -1;
    }
    if (atime > btime) {
      return 1;
    }
    return 0;
  };

  const friendsSorted = data?.Friend.sort(sortByLastContacted);

  const createFriendCard = (friend: FriendLimitedType) => {
    return (
      <FriendCard
        key={friend.id}
        friend={friend}
        setShowDeleteModal={setShowDeleteFriendModal}
        setToDelete={setToDelete}
        setSelectedFriend={setSelectedFriend}
      />
    );
  };

  const monthDiff = (d1: Date, d2: Date) => {
    let months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  };

  const gtSixMonths = friendsSorted
    ?.filter((friend) => {
      const monthsDiff = monthDiff(friend.lastContacted, new Date());
      return monthsDiff >= 6;
    })
    .map(createFriendCard);

  const gtOneMonth = friendsSorted
    ?.filter((friend) => {
      const monthsDiff = monthDiff(friend.lastContacted, new Date());
      return monthsDiff >= 1 && monthsDiff < 6;
    })
    .map(createFriendCard);

  const ltOneMonth = friendsSorted
    ?.filter((friend) => {
      const monthsDiff = monthDiff(friend.lastContacted, new Date());
      return monthsDiff < 1;
    })
    .map(createFriendCard);

  return (
    <div className="w-full border border-gray-400">
      <div className={`w-full border border-gray-400 bg-gray-100 p-2`}>
        <h1 className="text-sm font-thin tracking-wider text-gray-400 hover:text-gray-500">
          {">"} 6 Months
        </h1>
      </div>
      <div>
        {gtSixMonths?.length !== 0 ? (
          gtSixMonths
        ) : (
          <div className="w-full border border-gray-400 p-2">
            <p className="text-md font-semibold">
              No Friends before six months
            </p>
          </div>
        )}
      </div>
      <div className={`w-full border border-gray-400 bg-gray-100 p-2`}>
        <h1 className="text-sm font-thin tracking-wider text-gray-400 hover:text-gray-500">
          {">"} 1 Months
        </h1>
      </div>
      <div>
        {gtOneMonth?.length !== 0 ? (
          gtOneMonth
        ) : (
          <div className="w-full border border-gray-400 p-2">
            <p className="text-md font-semibold">
              No Friends before one months
            </p>
          </div>
        )}
      </div>
      <div className={`w-full border border-gray-400 bg-gray-100 p-2`}>
        <h1 className="text-sm font-thin tracking-wider text-gray-400 hover:text-gray-500">
          {"<="} 1 Months
        </h1>
      </div>
      <div>
        {ltOneMonth?.length !== 0 ? (
          ltOneMonth
        ) : (
          <div className="w-full border border-gray-400 p-2">
            <p className="text-md font-semibold">
              No Friends before one months
            </p>
          </div>
        )}
      </div>
      {showDeleteFriendModal && (
        <DeleteFriendModel
          setShowModal={setShowDeleteFriendModal}
          toDeleteId={toDelete}
        />
      )}
    </div>
  );
};

export default FriendArea;
