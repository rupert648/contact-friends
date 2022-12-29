import React from "react";

import SelectedFriendArea from "./SelectedFriendArea";

interface SelectedAreaProps {
  selectedFriend: string | null;
}

const SelectedArea = ({ selectedFriend }: SelectedAreaProps) => {
  if (!selectedFriend) {
    return <div className="w-full"></div>;
  }

  return (
    <div className="w-full">
      <SelectedFriendArea friendId={selectedFriend} />
    </div>
  );
};

export default SelectedArea;
