import express from 'express';
import resizeImage from '../../utilities/images';
import { promises as fs } from 'fs';

const images = express.Router();

images.get('/', async (req, res) => {
  const filename = req.query.filename;
  const width: number = parseInt(req.query.width as string);
  const height: number = parseInt(req.query.height as string);

  if (isNaN(width) || isNaN(height)) {
    res.statusMessage = 'Width and Height should be numbers';
    res.status(400).end();
  } else if (width < 0 || height < 0) {
    res.statusMessage = 'Width and Height should be integers';
    res.status(400).end();
  } else if (
    filename !== undefined &&
    width !== undefined &&
    height !== undefined
  ) {
    const file =
      process.cwd() +
      '/thumb/' +
      filename +
      '_thumb_' +
      width +
      '_' +
      height +
      '.jpg';

    try {
      await fs.stat(file);
      await res.sendFile(file);
      console.log('Image accessed!');
    } catch (error) {
      try {
        await resizeImage(
          filename as string,
          width as number,
          height as number
        );
        console.log('Image resized!');
        await res.sendFile(file);
      } catch (e) {
        console.error(e);
      }
    }
  }
});

export default images;
