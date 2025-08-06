import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials:
    process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY
      ? {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
        }
      : undefined,
});

export async function uploadToS3(
  fileBuffer: Buffer,
  bucketName: string,
  key: string,
  contentType: string
) {
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: fileBuffer,
    ContentType: contentType,
  });

  await s3.send(command);

  return `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
}
