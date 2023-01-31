import { router } from "../trpc";
import { authRouter } from "./auth";
import { friendsRouter } from "./friends";
import { imagesRouter } from "./image";

export const appRouter = router({
  auth: authRouter,
  friends: friendsRouter,
  images: imagesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
