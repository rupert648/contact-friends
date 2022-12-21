import { SessionProvider } from "next-auth/react";

import { trpc } from "../utils/trpc";
import AuthGuard from "../components/AuthGuard";
import type CustomAppProps from "../types/CustomAppProps";

import "../styles/globals.css";
import NavBar from "../components/Navbar/index";

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: CustomAppProps) {
  return (
    <SessionProvider session={session}>
      {Component.requireAuth ? (
        <AuthGuard>
          <NavBar />
          <Component {...pageProps} />
        </AuthGuard>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  );
}

export default trpc.withTRPC(MyApp);
