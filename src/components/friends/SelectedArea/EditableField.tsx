import React, { useState } from "react";
import { trpc } from "../../../utils/trpc";
import { CheckCircle, TrashIcon } from "../../icons";

interface EditableTextFieldProps {
  children: JSX.Element | JSX.Element[];
  startValue: string | undefined;
  fieldName: string;
  friendId: string;
}

const EditableTextField = ({
  children,
  startValue,
  friendId,
  fieldName,
}: EditableTextFieldProps) => {
  const [isEditing, setIsEditing] = useState<boolean>();
  const [currentValue, setCurrentValue] = useState<string | undefined>(
    startValue
  );

  const utils = trpc.useContext();

  const { mutate } = trpc.friends.updateFriendTextField.useMutation({
    onSuccess() {
      // invalidate query
      utils.friends.getFriend.invalidate({ id: friendId });
      setIsEditing(false);
    },
  });

  const handleUpdateField = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const toSend: any = {
      id: friendId,
    };
    toSend[fieldName] = currentValue;
    mutate(toSend);
  };

  return (
    <div
      className="flex cursor-text items-center space-x-2 rounded-md px-1 hover:bg-orange-100"
      onClick={() => {
        if (isEditing) return;

        setIsEditing(true);
      }}
    >
      {isEditing ? (
        <>
          <input
            className="w-4/5 border-2 border-orange-500"
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
          ></input>
          <button onClick={() => handleUpdateField()}>
            <CheckCircle className="hover:bg-green h-3 w-3 text-green-500 hover:text-green-800" />
          </button>
          <button onClick={() => setIsEditing(false)}>
            <TrashIcon className="text-red h-3 w-3 text-red-500 hover:text-red-800" />
          </button>
        </>
      ) : (
        children
      )}
    </div>
  );
};

export default EditableTextField;
