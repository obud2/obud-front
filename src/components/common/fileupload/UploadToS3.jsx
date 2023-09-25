import { S3_BUCKET } from 'src/constants';
import AWS from 'aws-sdk';

const REGION = 'ap-northeast-2';

AWS.config.update({
  accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
});

const myBucket = new AWS.S3({ params: { Bucket: S3_BUCKET }, region: REGION });

export const GetObjectUrl = (key) => {
  const signedUrlExpireSeconds = 60 * 60;
  const url = myBucket.getSignedUrl('getObject', {
    Bucket: S3_BUCKET,
    Key: key,
    Expires: signedUrlExpireSeconds,
  });
  return url;
};

const UploadToS3 = (file, folder, id, callback) => {
  return new Promise((resolve) => {
    const orgFileName = file.name;

    const key = `${folder}/${id}_${file.name}`;
    const params = { ACL: 'public-read', Body: file, Bucket: S3_BUCKET, Key: key };

    myBucket
      .putObject(params)
      .on('httpUploadProgress', (evt) => {
        if (callback) callback(Math.round((evt.loaded / evt.total) * 100));
      })
      .send((err) => {
        if (err) {
          resolve({});
        } else {
          resolve({
            key,
            name: orgFileName,
            url: `https://s3.${REGION}.amazonaws.com/${S3_BUCKET}/${key}`,
          });
        }
      });
  });
};

export default UploadToS3;
