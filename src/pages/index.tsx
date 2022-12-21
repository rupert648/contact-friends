import { type NextPage } from "next";
import Image from "next/image";

import AuthArea from "../components/Home/AuthArea";
import logo from "../../public/logo.png";

const Home: NextPage = () => {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <Image src={logo} alt={"Our Logo"} className="width-auto my-5" />
        <AuthArea />
      </main>
    </>
  );
};

export default Home;
