import type { Friend, User } from "@prisma/client";
import { prisma } from "../db/client";
import SgMail, { type MailDataRequired } from "@sendgrid/mail";

import { env } from "../../env/server.mjs";

SgMail.setApiKey(env.SENDGRID_API_KEY);

interface ReturnData {
  count: number;
}

export const sendEmails = async (): Promise<{
  error?: { message: string };
  data?: ReturnData;
}> => {
  const users = await prisma.user.findMany();

  // TODO: O(nm) rn, which sucks, figure out a way of making this more efficient
  // or parallelising it somehow
  // e.g. ping each user + friends to lambda function

  users.map((user) => sendEmailForUser(user));

  return {};
};

const sendEmailForUser = async ({ id, email }: User) => {
  if (!email) return;

  console.log(`Sending email for user: <${email}>`);

  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  const userFriends = await prisma.friend.findMany({
    where: {
      userId: id,
      lastContacted: {
        lt: oneMonthAgo,
      },
    },
  });

  const html = buildMessage(userFriends);

  const msg: MailDataRequired = {
    to: email,
    from: "rupertcarr@hotmail.co.uk",
    subject: "Daily Friends Reminder",
    html: html,
  };

  try {
    await SgMail.send(msg);
  } catch (err) {
    console.log(err);
    console.error("AHHHHH");
  }
};

const buildMessage = (friends: Friend[]): string => {
  let msg = "<p>These Friends haven't heard from you in over a month</p><ul>";

  friends.forEach((friend) => {
    const friendMsg = `<li><strong>${friend.name}:</strong> ${friend.email}, ${friend.phoneNumber}</li>\n`;

    msg += friendMsg;
  });

  msg += "</ul>";

  return msg;
};
