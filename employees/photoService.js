// Used to check if currently running file is this file.
import { fileURLToPath } from "url";
import { readdirSync, readFileSync, writeFileSync } from "fs";

import {
    CreateBucketCommand,
    PutBucketPolicyCommand,
    ListObjectsCommand,
    DeleteBucketCommand,
    DeleteObjectsCommand,
  } from "@aws-sdk/client-s3";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
const clientConfig = {
    region: "us-east-1",
}
const client = new S3Client(clientConfig);

const BUCKET_NAME = "d5b85820-0ffb-4d7d-8120-5a2221a4a617"

export async function createBucket(bucketName) {
    const createBucketCommand = new CreateBucketCommand({
      Bucket: bucketName,
    });
  
    return client.send(createBucketCommand);
}

export const putPhoto = async () =>  {
    const input = {
        Bucket: BUCKET_NAME,
        Key: "photo.jpg",
        Body: "yeehaw!", 
    }
    const command = new PutObjectCommand(input)
    try {
        const response = await client.send(command)
        console.log(response)
    } catch (err) {
        console.log(import.meta.url, err)
    }
}


export function deleteBucket(bucketName) {
    const deleteBucketCommand = new DeleteBucketCommand({
        Bucket: bucketName,
    });

    return client.send(deleteBucketCommand);
}

export async function emptyBucket(bucketName) {
  const listObjectsCommand = new ListObjectsCommand({ Bucket: bucketName });
  const listObjectsResult = await client.send(listObjectsCommand);
  const objects = listObjectsResult.Contents;
  const objectIdentifiers = objects.map((o) => ({ Key: o.Key }));
  const deleteObjectsCommand = new DeleteObjectsCommand({
    Bucket: bucketName,
    Delete: { Objects: objectIdentifiers },
  });

  return client.send(deleteObjectsCommand);
}

// createBucket(BUCKET_NAME)
// putPhoto() 