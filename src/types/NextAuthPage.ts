import type { NextPage } from "next"

type NextAuthPage = NextPage & { requireAuth: boolean}
export default NextAuthPage