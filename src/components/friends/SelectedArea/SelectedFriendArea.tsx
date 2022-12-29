import { useState, useEffect } from "react";
import { trpc } from "../../../utils/trpc";
import { Clock, MailIcon, Person, PhoneIcon, Spinner } from "../../icons";
import TagSelectedBox from "../../shared/TagSelectedBox";

interface SelectedFriendAreaProps {
  friendId: string;
}

const SelectedFriendArea = ({ friendId }: SelectedFriendAreaProps) => {
  const [showAddNotesArea, setShowAddNotesArea] = useState<boolean>(false);
  const [notesValue, setNotesValue] = useState<string>("");

  useEffect(() => {
    // each time friendId is changed
    // reset the state
    setNotesValue("");
    setShowAddNotesArea(false);
  }, [friendId]);

  const utils = trpc.useContext();
  const { data, isLoading, error } = trpc.friends.getFriend.useQuery(
    {
      id: friendId,
    },
    {
      onSettled(data) {
        // set notes so that when they're edited
        // don't have to retype all notes
        if (data?.notes) setNotesValue(data.notes);
      },
    }
  );
  const { mutate } = trpc.friends.updateFriendNotes.useMutation({
    onSuccess() {
      // invalidate the query to re-fetch friend with updates
      utils.friends.getFriend.invalidate({ id: friendId });
      setShowAddNotesArea(false);
    },
  });

  if (error) {
    return <p>an error occurred</p>;
  }

  if (isLoading) {
    return (
      <div className="flex h-80 items-center justify-center">
        <Spinner />
      </div>
    );
  }

  let tagsArray: string[] | null = null;
  if (data.tags) {
    tagsArray = JSON.parse(data.tags);
  }

  return (
    <div className="min-h-max w-full rounded-lg border-2 border-gray-400 border-l-orange-500 bg-white p-2 shadow-lg drop-shadow-xl">
      <div className="grid grid-cols-1 divide-y p-2">
        <div className="my-2">
          <Person className="m-auto my-4 h-10 w-10" />
          <p className="text-xs font-thin">name</p>
          <h1 className="text-xl font-normal">{data.name}</h1>
        </div>
        <div className="py-2">
          <h3 className="pb-2 text-sm font-normal">Details</h3>
          <table className="border-spacing-x-4">
            <tbody className="text-xs">
              <tr>
                <td className="w-32 font-thin">Last Contacted</td>
                <td>
                  <div className="flex items-center space-x-2">
                    <Clock /> <p>{data.lastContacted.toDateString()}</p>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="font-thin">Email</td>
                <td>
                  <div className="flex items-center space-x-2">
                    <MailIcon className="h-3 w-3" />{" "}
                    <p>
                      {data.email ? (
                        data.email
                      ) : (
                        <span className="font-thin">no email</span>
                      )}
                    </p>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="font-thin">Phone</td>
                <td>
                  <div className="flex items-center space-x-2">
                    <PhoneIcon className="h-3 w-3" />
                    <p>
                      {data.phoneNumber ? (
                        data.phoneNumber
                      ) : (
                        <span className="font-thin">no phone</span>
                      )}
                    </p>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="font-thin">Tags</td>
                <td className="flex">
                  {tagsArray ? (
                    tagsArray.map((tag) => (
                      <TagSelectedBox key={tag} tag={tag} />
                    ))
                  ) : (
                    <span className="font-thin">no tags</span>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h3 className="pb-2 text-sm font-normal">Notes </h3>
          {!showAddNotesArea ? (
            <div className="">
              <p className="text-xs font-light">{data.notes}</p>

              <button
                onClick={() => {
                  setShowAddNotesArea(true);
                  if (data.notes) setNotesValue(data.notes);
                }}
                className="text-xs font-thin hover:font-extralight"
              >
                {!data.notes ? "add notes" : "edit notes"}
              </button>
            </div>
          ) : (
            <div>
              <textarea
                id="message"
                rows={4}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-xs text-gray-900 focus:border-orange-500 focus:ring-orange-500 dark:border-gray-600 "
                placeholder="Write your notes here..."
                onChange={(e) => setNotesValue(e.target.value)}
                value={notesValue}
              ></textarea>
              <button
                onClick={async () => {
                  if (!notesValue) return;

                  await mutate({ id: friendId, notes: notesValue });
                }}
                className="m-1 rounded-lg border border-gray-300 py-0.5 px-1 text-xs font-thin hover:bg-gray-100"
              >
                submit
              </button>
              <button
                className="m-1 rounded-lg border border-red-300 py-0.5 px-1 text-xs font-thin hover:bg-red-100"
                onClick={() => {
                  if (data.notes) setNotesValue(data.notes);
                  setShowAddNotesArea(false);
                }}
              >
                cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectedFriendArea;
