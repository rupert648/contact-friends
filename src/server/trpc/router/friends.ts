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
      select: {
        id: true,
        Friend: {
          select: {
            id: true,
            name: true,
            lastContacted: true,
            email: true,
            tags: true,
            imageUrl: true,
          },
        },
      },
    });
  }),
  getFriend: protectedProcedure
    .input(
      z.object({
        id: z
          .string({ required_error: "Friend ID is required." })
          .cuid("Not a valid cuid."),
      })
    )
    .query(({ input, ctx }) => {
      return ctx.prisma.friend.findUniqueOrThrow({
        where: {
          id: input.id,
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
          .optional(),
        tags: z.string().array().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const friend = await ctx.prisma.friend.create({
        data: {
          name: input.name,
          email: input.email,
          phoneNumber: input.phoneNumber,
          userId: ctx.session.user.id,
          lastContacted: input.lastContacted,
          tags: JSON.stringify(input.tags),
        },
      });
      return friend;
    }),

  deleteFriend: protectedProcedure
    .input(
      z.object({
        id: z.string({ required_error: "Friend ID is required" }).cuid(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const result = await ctx.prisma.friend.delete({
        where: {
          id: input.id,
        },
      });
      return result;
    }),

  updateFriendNotes: protectedProcedure
    .input(
      z.object({
        id: z.string({ required_error: "Friend ID is required" }).cuid(),
        notes: z.string({ required_error: "Notes are required" }),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const result = await ctx.prisma.friend.update({
        where: {
          id: input.id,
        },
        data: {
          notes: input.notes,
        },
      });
      return result;
    }),

  updateFriendTextField: protectedProcedure
    .input(
      z.object({
        id: z.string({ required_error: "Friend ID is required" }).cuid(),
        name: z.string().min(4, "Minimum 4 characters name").optional(),
        phoneNumber: z
          .string()
          .regex(phoneRegex, { message: "Not a valid Phone Number" })
          .optional(),
        email: z
          .string()
          .email({ message: "Not a valid Phone Number" })
          .optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const result = await ctx.prisma.friend.update({
        where: {
          id: input.id,
        },
        data: {
          ...input,
        },
      });
      return result;
    }),

  setSeenToday: protectedProcedure
    .input(
      z.object({
        id: z.string({ required_error: "Friend ID is required" }).cuid(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const nowDate = new Date();
      const result = await ctx.prisma.friend.update({
        where: {
          id: input.id,
        },
        data: {
          lastContacted: nowDate,
        },
      });
      return result;
    }),
});
