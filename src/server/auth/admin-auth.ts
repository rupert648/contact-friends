import { type IncomingHttpHeaders } from "http";
import { env } from "../../env/server.mjs";

export const isAdmin = (headers: IncomingHttpHeaders) => {
  const bearerValue = getBearerValue(headers);
  if (!bearerValue) return false;

  return bearerValue === env.ADMIN_PASSWORD;
};

const getBearerValue = (headers: IncomingHttpHeaders) => {
  const { authorization } = headers;
  if (!authorization) return undefined;

  const [type, ...v] = authorization.split(" ");
  const value = v.join(" ");

  if (type?.toUpperCase() != "BEARER") return undefined;

  return value;
};
