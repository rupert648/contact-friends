import { trpc } from "../../../utils/trpc";
import { Clock, MailIcon, Person, PhoneIcon, Spinner } from "../../icons";
import TagSelectedBox from "../../shared/TagSelectedBox";

interface SelectedFriendAreaProps {
  friendId: string;
}

const SelectedFriendArea = ({ friendId }: SelectedFriendAreaProps) => {
  const { data, isLoading, error } = trpc.friends.getFriend.useQuery({
    id: friendId,
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
                  tagsArray.map((tag) => <TagSelectedBox key={tag} tag={tag} />)
                ) : (
                  <span className="font-thin">no tags</span>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex">
        <p>{data.notes}</p>
      </div>
    </div>
  );
};

export default SelectedFriendArea;
