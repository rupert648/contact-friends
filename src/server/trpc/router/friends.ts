import { router, protectedProcedure } from "../trpc";

export const friendsRouter = router({
  getAll: protectedProcedure.query(({ ctx }) => {
    const { user } = ctx.session;
    return ctx.prisma.user.findUnique({
      where: {
        id: user.id,
      },
      include: {
        Friend: true,
      },
    });
  }),
});
