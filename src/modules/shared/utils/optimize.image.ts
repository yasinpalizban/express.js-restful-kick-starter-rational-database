import Jimp from 'jimp';

/**
 * Resize + optimize images.
 *
 * @param path
 * @param width
 * @param height
 * @param quality
 */
export async function optimizeImage(path: string, width: number, height: number , quality: number): Promise<void> {


  const image = await Jimp.read(path);
  await image.resize(width, height); // resize
  await image.quality(quality); // set JPEG quality
  // await image.greyscale(); // set greyscale
  await image.write(path); //

  // await Promise.all(
  //   images.map(async imgPath => {
  //     const image = await Jimp.read(imgPath);
  //     await image.resize(width, height);
  //     await image.quality(quality);
  //     await image.writeAsync(imgPath);
  //   })
  // );
}
