import type { Dispatch, SetStateAction } from "react";
import React from "react";
import Button from "../../shared/Button";

interface LeftMenuProps {
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

const LeftMenu = ({ setShowModal }: LeftMenuProps) => {
  return (
    <div className="min-h-max w-64 rounded-lg border-2 border-gray-400 border-l-orange-500 p-2 shadow-lg drop-shadow-xl">
      <Button onClick={() => setShowModal(true)}>Add new Friend</Button>
    </div>
  );
};

export default LeftMenu;
