import React from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {sessionData && (
        <Link
          href={"/test"}
          className="rounded-full bg-orange-500 py-2 px-4 font-bold text-white hover:bg-orange-700"
        >
          Proceed to home page
        </Link>
      )}
      <button
        className="rounded-full bg-orange-500 py-2 px-4 font-bold text-white hover:bg-orange-700"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};

export default AuthShowcase;
