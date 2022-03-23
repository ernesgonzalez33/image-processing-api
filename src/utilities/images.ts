import sharp from 'sharp';
import { promises as fs } from 'fs';

const resizeImage = async (
  imageName: string,
  width: number,
  height: number
) => {
  try {
    await fs.mkdir(process.cwd() + '/thumb', { recursive: true });
  } catch (e) {
    console.error(e);
  }

  try {
    const inputPath = process.cwd() + '/full/' + imageName + '.jpg';
    const outputPath =
      process.cwd() +
      '/thumb/' +
      imageName +
      '_thumb_' +
      width +
      '_' +
      height +
      '.jpg';
    try {
      await fs.stat(inputPath);
    } catch (error) {
      return Promise.reject('There is no image with that name');
    }
    await sharp(inputPath).resize(width, height).toFile(outputPath);
  } catch (error) {
    console.error(error);
  }
};

export default resizeImage;
