import React from "react";
import { useSession } from "next-auth/react";

const AuthGuard = ({ children }: { children: JSX.Element[] | JSX.Element }) => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    // TODO: redirrect here
    return <p>Access Denied</p>;
  }

  if (session?.user) {
    return <>{children}</>;
  }

  return null;
};

export default AuthGuard;
