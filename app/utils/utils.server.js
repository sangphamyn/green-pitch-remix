import cloudinary from "cloudinary";
import { writeAsyncIterableToWritable } from "@remix-run/node";

cloudinary.v2.config({
  cloud_name: "db0shgxfi",
  api_key: "349221191953124",
  api_secret: "bsg_K6KnHdaFSqMA8sjqHG-paY8",
});

async function uploadImage(data) {
  const uploadPromise = new Promise(async (resolve, reject) => {
    const uploadStream = cloudinary.v2.uploader.upload_stream(
      { folder: "remixImages" },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(result);
      }
    );
    await writeAsyncIterableToWritable(data, uploadStream);
  });
  return uploadPromise;
}

export { uploadImage };
