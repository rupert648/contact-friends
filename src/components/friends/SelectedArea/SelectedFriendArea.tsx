import { useState, useEffect } from "react";
import Image from "next/image";

import { trpc } from "../../../utils/trpc";
import {
  Clock,
  MailIcon,
  Person,
  PhoneIcon,
  Spinner,
  CheckCircle,
} from "../../icons";
import TagSelectedBox from "../../shared/TagSelectedBox";
import EditableTextField from "./EditableField";

interface SelectedFriendAreaProps {
  friendId: string;
}

const SelectedFriendArea = ({ friendId }: SelectedFriendAreaProps) => {
  const [showAddNotesArea, setShowAddNotesArea] = useState<boolean>(false);
  const [notesValue, setNotesValue] = useState<string>("");
  const [file, setFile] = useState<any>(null);

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
  const { mutate: updateFriendNotes } =
    trpc.friends.updateFriendNotes.useMutation({
      onSuccess() {
        // invalidate the query to re-fetch friend with updates
        utils.friends.getFriend.invalidate({ id: friendId });
        setShowAddNotesArea(false);
      },
    });

  const { mutate: setSeenToday } = trpc.friends.setSeenToday.useMutation({
    onSuccess() {
      utils.friends.getFriend.invalidate({ id: friendId });
    },
  });

  const { mutate: uploadImage } = trpc.images.upload.useMutation();

  // explicit any used as files are annoying
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const toBase64 = (file: any): Promise<string | ArrayBuffer | null> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const uploadNewImage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file || !data) return;

    // encode the image as base64 (so can be sent alongside JSON)
    const base64 = await toBase64(file);
    if (typeof base64 != "string") return;

    await uploadImage({ id: data?.id, imageBase64: base64 });

    // invalidate to re-get the friend with the new url
    utils.friends.getFriend.invalidate({ id: friendId });
  };

  const onFileChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFile(e.currentTarget.files?.[0]);
  };

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
    <>
      <div className="grid grid-cols-1 divide-y p-2">
        <div className="my-2">
          <form onSubmit={uploadNewImage}>
            <input onChange={onFileChange} type="file"></input>
            <button type="submit">submit</button>
          </form>

          {data?.imageUrl ? (
            <Image
              src={data.imageUrl}
              width={100}
              height={100}
              className="m-auto my-4 "
              alt="Picture of the friend"
              style={{ borderRadius: "100%" }}
            />
          ) : (
            <Person className="m-auto my-4 h-20 w-20" />
          )}

          <p className="text-xs font-thin">name</p>
          <EditableTextField
            startValue={data.name}
            fieldName="name"
            friendId={data.id}
          >
            <h1 className="text-4xl font-normal">{data.name}</h1>
          </EditableTextField>
        </div>
        <div className="py-2">
          <div className="flex items-center">
            <h3 className="pb-2 pr-4 text-lg font-normal">Details</h3>
            <button
              className="pb-2 text-sm font-normal"
              onClick={async () => await setSeenToday({ id: friendId })}
              title="Set to seen today."
            >
              <CheckCircle className="h-6 w-6 rounded-full bg-green-400 text-white hover:bg-green-600" />
            </button>
          </div>
          <table className="border-spacing-x-4">
            <tbody className="text-md">
              <tr>
                <td className="w-32 font-thin">Last Contacted</td>
                <td>
                  <div className="flex cursor-text items-center space-x-2 rounded-md px-1 hover:bg-orange-100">
                    <Clock />
                    <p>{data.lastContacted.toDateString()}</p>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="font-thin">Email</td>
                <td>
                  <EditableTextField
                    startValue={data.email ? data.email : ""}
                    fieldName="email"
                    friendId={data.id}
                  >
                    <MailIcon className="h-3 w-3" />
                    <p>
                      {data.email ? (
                        data.email
                      ) : (
                        <span className="font-thin">no email</span>
                      )}
                    </p>
                  </EditableTextField>
                </td>
              </tr>
              <tr>
                <td className="font-thin">Phone</td>
                <td>
                  <EditableTextField
                    startValue={data.phoneNumber ? data.phoneNumber : ""}
                    fieldName="phoneNumber"
                    friendId={data.id}
                  >
                    <PhoneIcon className="h-3 w-3" />
                    <p>
                      {data.phoneNumber ? (
                        data.phoneNumber
                      ) : (
                        <span className="font-thin">no phone</span>
                      )}
                    </p>
                  </EditableTextField>
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
          <h3 className="pb-2 text-lg font-normal">Notes </h3>
          {!showAddNotesArea ? (
            <div className="">
              <p className="text-md font-light">{data.notes}</p>

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

                  await updateFriendNotes({ id: friendId, notes: notesValue });
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
    </>
  );
};

export default SelectedFriendArea;
