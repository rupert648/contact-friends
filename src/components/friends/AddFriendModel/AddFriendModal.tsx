import type { Dispatch, SetStateAction } from "react";
import React from "react";
import AddFriendForm from "./AddFriendForm";

interface AddFriendModalProps {
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

const AddFriendModal = ({ setShowModal }: AddFriendModalProps) => {
  return (
    <>
      <div className="fixed inset-0 z-50 flex w-auto items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
        <div className="relative my-6 mx-auto w-10/12 max-w-3xl md:w-1/2">
          {/*content*/}
          <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5">
              <h3 className="text-3xl font-semibold">Add New Friend</h3>
              <button
                className="float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black opacity-5 outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span className="block h-6 w-6 bg-transparent text-2xl text-black opacity-5 outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative flex-auto p-6">
              <AddFriendForm setShowModal={setShowModal} />
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
    </>
  );
};

export default AddFriendModal;
