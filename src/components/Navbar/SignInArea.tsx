import React from "react";
import { signOut } from "next-auth/react";

const SignInArea: React.FC = () => {
  return (
    <a
      className="hidden rounded-xl bg-gray-50 py-2 px-6 text-sm font-bold text-gray-900 transition duration-200 hover:bg-gray-100  lg:ml-auto lg:mr-3 lg:inline-block"
      href="#"
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      Sign Out
    </a>
  );
};

export default SignInArea;
