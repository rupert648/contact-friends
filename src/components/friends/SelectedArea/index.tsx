import React from "react";

import SelectedFriendArea from "./SelectedFriendArea";

interface SelectedAreaProps {
  selectedFriend: string | null;
}

const SelectedArea = ({ selectedFriend }: SelectedAreaProps) => {
  if (!selectedFriend) {
    return <div className="w-80"></div>;
  }

  return (
    <div className="w-80">
      <SelectedFriendArea friendId={selectedFriend} />
    </div>
  );
};

export default SelectedArea;
