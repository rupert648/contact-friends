import AWS from "aws-sdk";

import { env } from "../../../env/server.mjs";

const s3 = new AWS.S3({
  accessKeyId: env.MY_AWS_ACCESS_KEY_ID,
  secretAccessKey: env.MY_AWS_SECRET_ACCESS_KEY,
});

export const uploadImageBase64 = async (
  userId: string,
  friendId: string,
  imageBase64: string
): Promise<string> => {
  // create buffer from image
  const buf = Buffer.from(
    imageBase64.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );
  const key = `${userId}/${friendId}.jpg`;
  const params = {
    Key: key,
    Body: buf,
    ContentEncoding: "base64",
    ContentType: "image/jpeg",
    Bucket: env.AWS_BUCKET_NAME,
    ACL: "public-read",
  };

  try {
    await s3.putObject(params).promise();
    const url = `https://${env.AWS_BUCKET_NAME}.s3.eu-west-2.amazonaws.com/${key}`;
    return url;
  } catch (error) {
    console.log(error);
    throw new Error("Error uploading file");
  }
};
