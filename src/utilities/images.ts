import sharp from 'sharp';

const resizeImage = async (
  imageName: string,
  width: number,
  height: number
) => {
  try {
    const inputPath = process.cwd() + '/full/' + imageName + '.jpg';
    const outputPath = process.cwd() + '/thumb/' + imageName + '_thumb.jpg';
    await sharp(inputPath).resize(width, height).toFile(outputPath);
  } catch (error) {
    console.error(error);
  }
};

export default resizeImage;
