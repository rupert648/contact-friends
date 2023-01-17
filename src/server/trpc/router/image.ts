import { z } from "zod";

import { router, protectedProcedure } from "../trpc";
import { uploadImageBase64 } from "../../aws/s3";

export const imagesRouter = router({
  upload: protectedProcedure
    .input(
      z.object({
        id: z.string({ required_error: "FriendID is required." }),
        imageBase64: z.string({ required_error: "Need an imageBase64 string" }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // upload image to s3

      const url = await uploadImageBase64(
        ctx.session.user.id,
        input.id,
        input.imageBase64
      );
      // update user url in table
      const result = ctx.prisma.friend.update({
        where: {
          id: input.id,
        },
        data: {
          imageUrl: url,
        },
      });

      return result;
    }),
});
