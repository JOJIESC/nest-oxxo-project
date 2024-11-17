import { Injectable } from "@nestjs/common";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

@Injectable()
export class AwsService {
  private s3 = new S3Client({
    region: "us-east-2",
    credentials: {
      accessKeyId: process.env.accesskey_bucket,
      secretAccessKey: process.env.secretkey_bucket,
    },
  });

  async uploadFile(file: Express.Multer.File) {
    const key = file.originalname;
    const bucket = "nest-oxxo-project";
    const url = `https://nest-oxxo-project.s3.us-east-2.amazonaws.com/${key}`;
    // https://nest-oxxo-project.s3.us-east-2.amazonaws.com/wallhaven-858lz1.png
    const commmand = new PutObjectCommand({
      Key: key,
      Body: file.buffer,
      Bucket: bucket,
    });
    const response = await this.s3.send(commmand);
    console.log(response);
    return url;
  }
}
