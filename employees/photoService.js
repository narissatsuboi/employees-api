import {
  CreateBucketCommand,
  ListObjectsCommand,
  DeleteBucketCommand,
  DeleteObjectsCommand
} from '@aws-sdk/client-s3'

import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'

// instantiate S3 client
const clientConfig = {
  region: 'us-east-1'
}
const s3client = new S3Client(clientConfig)

/**
 * Launch new bucket. This is a one-time operation.
 */
export async function createBucket () {
  const createBucketCommand = new CreateBucketCommand({
    Bucket: process.env.BUCKET_NAME,
    CreateBucketConfiguration: {
      LocationConstraint: 'us-east-1'
    }
  })

  return s3client.send(createBucketCommand)
}

/**
 * Empty all objects from bucket. This is a one-time operation.
 * @param {*} bucketName
 */
export async function emptyBucket (bucketName) {
  const listObjectsCommand = new ListObjectsCommand({ Bucket: bucketName })
  const listObjectsResult = await s3client.send(listObjectsCommand)
  const objects = listObjectsResult.Contents
  const objectIdentifiers = objects.map(o => ({ Key: o.Key }))
  const deleteObjectsCommand = new DeleteObjectsCommand({
    Bucket: bucketName,
    Delete: { Objects: objectIdentifiers }
  })

  return s3client.send(deleteObjectsCommand)
}

/**
 * Delete bucket. This is a one-time operation.
 * @param {*} bucketName
 */
export function deleteBucket (bucketName) {
  const deleteBucketCommand = new DeleteBucketCommand({
    Bucket: bucketName
  })
  return s3client.send(deleteBucketCommand)
}

/**
 * Upload new image to bucket. Overwrites existing image with same key.
 * @param {*} key Image key.
 * @param {*} fileBuffer Buffer of image file.
 */
export const uploadImageObject = async (key, fileBuffer) => {
  const input = {
    Bucket: process.env.BUCKET_NAME,
    Key: key,
    Body: fileBuffer,
    ContentType: 'image/jpeg'
  }

  const command = new PutObjectCommand(input)
  try {
    const response = await s3client.send(command)
    console.log(response)
  } catch (err) {
    console.log(import.meta.url, err)
  }
}
