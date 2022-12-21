import { type Friend } from "@prisma/client";
import React from "react";

interface FriendCardProps {
  friend: Friend;
}

const MailIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="mr-1 inline h-4 w-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
    />
  </svg>
);

const PhoneIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="mr-1 inline h-4 w-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
    />
  </svg>
);

const FriendCard = ({
  friend: { name, phoneNumber, email, lastContacted },
}: FriendCardProps) => {
  const getColor = () => {
    const msSinceLastContacted = Date.now() - lastContacted.getTime();
    const daysSinceLastContacted = Math.floor(
      msSinceLastContacted / (1000 * 64 * 60 * 24)
    );
    console.log(daysSinceLastContacted);
    if (daysSinceLastContacted === 0) return undefined;
    const colourVal = 1 - 1 / daysSinceLastContacted;

    console.log(colourVal);
    return colourVal * 0.5;
  };

  return (
    <div
      className={`w-full p-4 shadow-md lg:max-w-lg `}
      style={{ border: `5px solid rgba(255, 0, 0, ${getColor()})` }}
    >
      <div className="space-y-2">
        <h3 className="text-2xl font-semibold">{name}</h3>
        <ul className="text-xs text-gray-600">
          <li className="mb-3">
            <MailIcon />
            <span className="font-bold">Email: </span>
            {email ? email : "no email"}
          </li>
          <li className="mb-3">
            <PhoneIcon />
            <span className="font-bold">Phone Number: </span>
            {phoneNumber ? phoneNumber : "no phone number"}
          </li>
          <li className="mb-3">
            <span className="font-bold">Last Contacted: </span>
            {lastContacted?.toDateString()}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FriendCard;
