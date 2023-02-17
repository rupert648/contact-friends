import { type NextApiRequest, type NextApiResponse } from "next";

import { isAdmin } from "../../../server/auth/admin-auth";
import { sendEmails } from "../../../server/email/email";

const email = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!isAdmin(req.headers)) {
    return res.status(401).json({ message: "not authorized" });
  }

  await sendEmails();

  res.json({ message: "successfully sent emails" });
};

export default email;
