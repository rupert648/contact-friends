import type { Dispatch, SetStateAction } from "react";
import React from "react";

import { trpc } from "../../../utils/trpc";

interface DeleteFriendModelProps {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  toDeleteId: string | null;
}

const DeleteFriendModel = ({
  setShowModal,
  toDeleteId,
}: DeleteFriendModelProps) => {
  const utils = trpc.useContext();
  const mutation = trpc.friends.deleteFriend.useMutation({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSuccess(_input) {
      utils.friends.getAll.invalidate();
      setShowModal(false);
    },
  });

  const handleDelete = async () => {
    if (!toDeleteId) return;
    await mutation.mutate({ id: toDeleteId });

    setShowModal(false);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
        <div className="relative my-6 mx-auto w-auto max-w-3xl">
          {/*content*/}
          <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5">
              <h3 className="text-3xl font-semibold">
                Are you sure you want to delete this friend?
              </h3>
              <button
                className="float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black opacity-5 outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span className="block h-6 w-6 bg-transparent text-2xl text-black opacity-5 outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/* buttons */}
            <div className="flex items-center justify-end rounded-b border-t border-solid border-slate-200 p-6">
              <button
                className="background-transparent text-grey-500 mr-1 mb-1 px-6 py-2 text-sm font-bold uppercase outline-none transition-all duration-150 ease-linear focus:outline-none"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="mr-1 mb-1 rounded bg-red-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-red-600"
                type="button"
                onClick={() => handleDelete()}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
    </>
  );
};

export default DeleteFriendModel;
