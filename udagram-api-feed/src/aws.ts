import AWS = require('aws-sdk');
import { config } from './config/config';

// Configure AWS
AWS.config.update({
  region: config.aws_region,
  credentials: new AWS.EnvironmentCredentials('AWS')
});

export const s3 = new AWS.S3({
  signatureVersion: 'v4',
  params: {Bucket: config.aws_media_bucket},
  sslEnabled: false, // disable SSL verification
});

// Generates an AWS signed URL for retrieving objects
export function getGetSignedUrl( key: string ): string {
  const signedUrlExpireSeconds = 60 * 5;
  console.log(`Generating signed URL for key: ${key}`);
  return s3.getSignedUrl('getObject', {
    Bucket: config.aws_media_bucket,
    Key: key,
    Expires: signedUrlExpireSeconds,
  });
}

// Generates an AWS signed URL for uploading objects
export function getPutSignedUrl( key: string ): string {
  const signedUrlExpireSeconds = 60 * 5;

  return s3.getSignedUrl('putObject', {
    Bucket: config.aws_media_bucket,
    Key: key,
    Expires: signedUrlExpireSeconds,
  });
}
