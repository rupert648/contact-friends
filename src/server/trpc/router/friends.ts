import { z } from "zod";

import { router, protectedProcedure } from "../trpc";

const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

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
  addFriend: protectedProcedure
    .input(
      z.object({
        name: z.string({ required_error: "Name is Required" }),
        phoneNumber: z
          .string()
          .regex(phoneRegex, { message: "Not a valid Phone Number" })
          .nullish()
          .optional(),
        email: z
          .string()
          .email({ message: "Not a valid Phone Number" })
          .nullish()
          .optional(),
        lastContacted: z
          .date()
          .max(new Date(), {
            message: "Can't have last contacted someone after today!",
          })
          .nullish()
          .optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      console.log("HERE");
      const friend = await ctx.prisma.friend.create({
        data: {
          name: input.name,
          email: input.email,
          phoneNumber: input.phoneNumber,
          userId: ctx.session.user.id,
          lastContacted: input.lastContacted,
        },
      });
      return friend;
    }),
});
