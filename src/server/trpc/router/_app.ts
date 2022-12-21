import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { friendsRouter } from "./friends";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  friends: friendsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
