import React from "react";
import Image from "next/image";
import Link from "next/link";

import Separator from "./Separator";
import logo from "../../../public/logo.png";
import SignInArea from "./SignInArea";
import { useRouter } from "next/router";

const pages: string[] = ["Home", "Friends", "Calendar"];

const NavBar: React.FC = () => {
  const router = useRouter();
  const currentRoute = router.asPath;

  const menuOps: JSX.Element[] = pages.map((page, index) => {
    let className: string;
    if (currentRoute.startsWith(`/${page.toLowerCase()}`)) {
      className = "text-sm text-orange-400 hover:text-orange-500 font-bold";
    } else {
      className = "text-sm text-gray-400 hover:text-gray-500";
    }

    return (
      <React.Fragment key={index}>
        <li>
          <Link className={className} href={`/${page.toLowerCase()}`}>
            {page}
          </Link>
        </li>
        {index !== pages.length - 1 && <Separator />}
      </React.Fragment>
    );
  });

  return (
    <nav className="relative flex items-center justify-between bg-white px-4 py-4">
      <div className="lg:hidden">
        <button className="navbar-burger flex items-center p-3 text-blue-600">
          <svg
            className="block h-4 w-4 fill-current"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Mobile menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
          </svg>
        </button>
      </div>
      <ul className="absolute top-1/2 left-1/2 hidden -translate-y-1/2 -translate-x-1/2 transform lg:mx-auto lg:flex lg:w-auto lg:items-center lg:space-x-6">
        {menuOps}
      </ul>
      <SignInArea />
    </nav>
  );
};

export default NavBar;
